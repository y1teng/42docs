# 4つの必須アルゴリズム

プログラムには **4つのソート戦略** を全部実装する必要がある。実行時にフラグで切り替えられるようにする。

## 1. Simple — O(n²)

**フラグ:** `--simple`

以下のどれか1つ以上を実装：

- Insertion sort の変形
- Selection sort の変形
- Bubble sort の変形
- 最小/最大値を繰り返し取り出す方法

### イメージ（selection sort風）

```
毎回 a の最小値を b に push → 全部 b に移したら a に戻す
```

小さいデータや「ほぼ整列済み」のデータには有効。大きなデータには向かない。

## 2. Medium — O(n√n)

**フラグ:** `--medium`

以下のどれか1つ以上を実装：

- **Chunk分割**（√n 個のチャンクに分けて処理）
- ブロック分割によるパーティション
- バケットソートの変形（√n 個のバケット）
- 値域ベースの分割

### チャンク法のイメージ

```
n=100 なら √100 = 10 チャンク
各チャンクの値域に属する要素を順に b へ pb
b の先頭から順に a へ pa（その際 rb/rra で順番調整）
```

## 3. Complex — O(n log n)

**フラグ:** `--complex`

以下のどれか1つ以上を実装：

- **Radix sort**（LSD or MSD）
- Merge sort の2スタック版
- Quick sort のスタックパーティション版
- Heap sort の変形
- Binary indexed tree を使ったアプローチ

### Radix sort のイメージ

```
数値をビット列として見る
各ビット位置（下位から）で b/a へ振り分けを繰り返す
ビット数分（≒ log n）のパスで完了 → O(n log n)
```

## 4. Adaptive — カスタム戦略（デフォルト）

**フラグ:** `--adaptive`（フラグ未指定時のデフォルト）

**[disorder](./disorder)** の値を見て、上の3つの中から適切な戦略を自動選択する。

```
disorder < 0.2    →  Simple  O(n²)
0.2 ≤ d < 0.5    →  Medium  O(n√n)
d ≥ 0.5          →  Complex O(n log n)
```

threshold の根拠と、各 regime で使った手法の説明を README に書く必要がある。

## パフォーマンス基準

評価ではランダムな数列を実際に渡して操作数を数える。

### 100個の乱数

| 操作数 | 評価 |
|-------|------|
| < 2000 | 合格（最低ライン） |
| < 1500 | Good |
| < 700 | Excellent |

### 500個の乱数

| 操作数 | 評価 |
|-------|------|
| < 12000 | 合格（最低ライン） |
| < 8000 | Good |
| < 5500 | Excellent |

## プログラムの使い方まとめ

```bash
# デフォルト（adaptive）
./push_swap 2 1 3 6 5 8

# 戦略を明示指定
./push_swap --simple   5 4 3 2 1
./push_swap --medium   5 4 3 2 1
./push_swap --complex  5 4 3 2 1
./push_swap --adaptive 5 4 3 2 1

# ベンチマークモード（stderr に統計、stdout に操作列）
./push_swap --bench --adaptive 5 4 3 2 1

# 操作数を数える
ARG="4 67 3 87 23"; ./push_swap --adaptive $ARG | wc -l

# checker で検証（ボーナス）
ARG="4 67 3 87 23"; ./push_swap --complex $ARG | ./checker_linux $ARG
```

## ボーナス: checker プログラム

`checker` は push_swap の出力が正しいかを検証するプログラム。

```
./checker 3 2 1 0
rra
pb
sa
pa
↵ (Ctrl+D)
OK    ← ソートされていれば OK、されていなければ KO
```

- ソート済み & b が空 → `OK`
- それ以外 → `KO`
- エラー（非整数、重複など）→ `Error`
