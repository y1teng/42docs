---
title: コードの説明
description: main.c から op_*.c までの実装をファイル単位で読む
---
# コードの説明

現時点の実装（Simple戦略のみ、`checker` で `OK` 確認済み）を、ファイル単位で追う。関数ごとの詳しいシグネチャや呼び出し関係は [Doxygen 関数リファレンス](/push_swap/doxygen/index.html) も参照。

## 全体の流れ

```
main()
 ├─ parse_flags()       argvの先頭から --xxx フラグを読み進める
 ├─ parse_atoi_array()  残りの引数を整数配列に変換
 ├─ parse_has_overlap() 重複チェック
 ├─ t_stack a, b を組み立てる
 └─ sort_simple(&a, &b)
     ├─ (aが空になるまで) sort_find_min_index → op_ra を steps回 → op_pb
     └─ (bが空になるまで) op_pa
```

各 `op_xx` 関数は、状態を変更した最後に必ず `print_op(OP_XX)` を呼び、操作名を1行 stdout に出す。これが `./push_swap ... | ./checker_linux ...` で検証できる出力そのもの。

## データ構造：`t_stack`（`push_swap.h`）

```c
typedef struct s_stack
{
	int	*data;
	int	capacity;
	int	size;
	int	head;
}	t_stack;
```

- `data` : 確保済みの配列（固定長）
- `capacity` : 配列の長さ。ソート開始時の要素数で固定、以降変わらない
- `size` : 現在の有効要素数。push/popのたびに増減する
- `head` : 「今どこが先頭(top)か」を指すインデックス。動くのはここだけで、`data`自体は動かさない

有効な要素は `data[(head + i) % capacity]`（`i = 0 ... size-1`）で読む。`size < capacity` のとき、有効範囲の外側にある `data` の中身は、以前使われていた古い値（ゴミ）のまま残る。これが今回何度もハマった元凶になっている。仕組みそのものの背景は [循環型配列 教材](./circular-buffer-00-index) で実験しながら追える。

## `main.c` — 入力のパースと初期化

```c
int	main(int argc, char **argv)
{
	int			arr[100];
	int			size;
	t_options	opt;
	t_stack		a;
	t_stack		b;

	if (argc < 2)
		return (0);
	parse_flags(argc, argv, &opt);
	size = argc - opt.num_start;
	...
	a.data = arr;      a.capacity = size; a.size = size; a.head = 0;
	b.data = buffer_b; b.capacity = size; b.size = 0;    b.head = 0;
	sort_simple(&a, &b);
	return (0);
}
```

- `parse_flags` は `argv[1]` 以降を先頭から見て、`--` で始まる間はフラグ（`--simple` / `--bench` 等）として読み進め、`--` で始まらない引数が出た位置を `opt.num_start` に記録する。フラグは連続して複数個出現しうる想定。
- 整数変換は `parse_int` が担当する。符号・桁あふれ（`INT_MAX`/`INT_MIN` 超え）・非数字文字を全部ここで弾き、失敗したら `Error` を出して終了する。
- `parse_has_overlap` は総当たりで重複値をチェックする（O(n²)。今回のスコープでは許容）。
- `a` と `b` はどちらも `capacity = size`（入力個数）ぶん確保される。`b` は最初 `size = 0` の空スタックで、`a` からの `pb` でしか値が入らない。

現状 `opt.strategy` はパースされるだけで、実際の分岐には未使用（常に `sort_simple` が呼ばれる）。Medium/Complex実装後に、ここを戦略ごとの関数へ振り分ける予定。

## `sort_simple.c` — Simple戦略（選択ソート方式）

```c
void	sort_simple(t_stack *a, t_stack *b)
{
	origin_size = a->size;
	i = 0;
	while (i < origin_size)
	{
		steps = sort_find_min_index(a);
		while (steps)
		{
			op_ra(a);
			steps--;
		}
		op_pb(b, a);
		i++;
	}
	i = 0;
	while (i < origin_size)
	{
		op_pa(a, b);
		i++;
	}
}
```

2フェーズ構成になっている。

1. **a → b**：`a` の中の最小値を探し（`sort_find_min_index`）、見つかった位置ぶんだけ `ra` を繰り返して最小値を先頭(top)まで回転させ、`pb` で `b` に送る。これを `a` が空になるまで繰り返す。結果として `b` には昇順で値が積まれていく。
2. **b → a**：`b` に積んだ値を、先頭から順に `a` へ `pa` で戻す。

`sort_find_min_index` は `head` 自体を書き換えず、`(head + count) % capacity` で仮想的に読むだけで最小値の「歩数」を数える（読み取りでうっかり `head` を進めてしまうのが最初のバグだった）。ループ条件には `a->size` ではなく `origin_size`（固定値）を使う点も注意：`a->size` はループ中に減っていくため、終了条件にそのまま使うと早期終了する。

操作数の最小化はこの版のスコープ外。「小さい入力で正しく動く」ことを優先した実装になっている。

## `op_r.c` / `op_rr.c` — rotate 系（`ra` / `rb` / `rr` / `rra` / `rrb` / `rrr`）

```c
void	op_rotate(t_stack *n)      // ra / rb の実体
{
	int new_pos;

	new_pos = (n->head + n->size) % n->capacity;
	n->data[new_pos] = n->data[n->head];
	n->head = (n->head + 1) % n->capacity;
}
```

先頭の値を「これから有効範囲に入ってくるマス」（`head + size` の位置）へコピーしてから `head` を進める。この「コピーしてから `head` を進める」順番が、部分状態（`size < capacity`）でゴミを混入させないための修正の核心。

```c
void	op_reverse_rotate(t_stack *n)   // rra / rrb の実体
{
	int new_pos;

	n->head = (n->head - 1 + n->capacity) % n->capacity;
	new_pos = (n->head + n->size) % n->capacity;
	n->data[new_pos] = n->data[n->head];
}
```

こちらは `op_rotate` と対になる操作のはずだが、`size == capacity`（スタックが満杯）のときしか正しく動かないことが検証で分かっている（[index の「実装して気づいたこと」](./index#実装して気づいたこと)参照）。部分状態では、コピー元・コピー先の向きが逆になっており、末尾の値ではなく無効なマスの値を先頭に読み込んでしまう。**未修正**。

`rr` / `rrr` はそれぞれ `ra`+`rb` / `rra`+`rrb` を1操作にまとめたもの。a と b を同時に動かしたいときに使う。

## `op_p.c` — push 系（`pa` / `pb`）

```c
void	op_push(t_stack *dst, t_stack *src)
{
	int	tmp;

	if (!src->size)
		return ;
	tmp = src->data[src->head];
	dst->head = (dst->head - 1 + dst->capacity) % dst->capacity;
	src->head = (src->head + 1) % src->capacity;
	dst->data[dst->head] = tmp;
	dst->size++;
	src->size--;
}
```

`src` の先頭を読み、`dst->head` を1つ手前に動かしてそこへ書き込む。新しく増えるマス（`dst` 側）には必ず値を書いてから `size++` しているため、`op_rotate` で起きたようなゴミ混入は原理的に起きない。`src` が空なら何もしない（仕様通り）。

## `op_s.c` — swap 系（`sa` / `sb` / `ss`）

```c
void	op_swap(t_stack *n)
{
	first = n->head;
	second = (n->head + 1) % n->capacity;
	tmp = n->data[first];
	n->data[first] = n->data[second];
	n->data[second] = tmp;
}
```

先頭2要素（`head` と `head+1`）を直接入れ替えるだけ。`head` は動かないので rotate系のような「はみ出し」問題はそもそも存在しない。要素が1個以下のときは呼び出し側で何もしない想定（このプロジェクトでは `sort_simple` からは呼ばれていない）。

## `print.c` — 操作名の標準出力

```c
void	print_op(t_op op)
{
	static const char *const names[] = {
		[OP_SA] = "sa", [OP_SB] = "sb", [OP_SS] = "ss",
		[OP_PA] = "pa", [OP_PB] = "pb",
		[OP_RA] = "ra", [OP_RB] = "rb", [OP_RR] = "rr",
		[OP_RRA] = "rra", [OP_RRB] = "rrb", [OP_RRR] = "rrr"
	};
	ft_printf("%s\n", names[op]);
}
```

`enum` の値をそのまま配列の添字として使い、対応する文字列を引く「指示子付き配列初期化（`[OP_SA] = "sa"`）」のパターン。各 `op_xx` 関数の末尾に1行 `print_op(OP_XX)` を足すだけで、操作列の標準出力に対応できる。

## 現状の制約・既知の課題

- `arr[100]` / `buffer_b[100]` のように配列サイズが固定（100個まで）。可変長対応は未実装。
- `opt.strategy` は読み取るだけで、実際の戦略分岐にはまだ使われていない（常にSimple版が動く）。
- `op_reverse_rotate` に上記のゴミ混入バグが残っている（`rra`/`rrb`/`rrr`は部分状態で信用できない）。
- Medium（O(n√n)）・Complex（O(n log n)）・Adaptive は未実装。詳細は [4つの必須アルゴリズム](./algorithms) を参照。
