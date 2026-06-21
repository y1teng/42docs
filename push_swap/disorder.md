# disorder（乱雑さの指標）

## disorder とは

`disorder` は **0〜1の数値**で、スタック a がどれだけ「ソートされていないか」を表す。

- `disorder = 0.0` → 完全にソート済み
- `disorder = 1.0` → 最悪の逆順（完全な降順）
- その間 → 部分的に乱れている

## 計算方法

スタック内のすべての「ペア (i, j)（i < j）」を調べ、`a[i] > a[j]` になっているペア（= 転倒）を数える。

```
function compute_disorder(stack a):
    mistakes = 0
    total_pairs = 0
    for i from 0 to size(a)-1:
        for j from i+1 to size(a)-1:
            total_pairs += 1
            if a[i] > a[j]:
                mistakes += 1
    return mistakes / total_pairs
```

**disorder = 転倒数 / 全ペア数**

### 例

```
a: [3, 1, 2]
ペア (3,1) → 3>1 なのでmistake
ペア (3,2) → 3>2 なのでmistake
ペア (1,2) → 1<2 なのでOK

disorder = 2/3 ≈ 0.67  →「かなり乱れている」
```

## 重要なルール

> **disorder は操作を始める前に測定する。** 一度でも操作を行ったあとでは測定してはいけない。

## adaptive アルゴリズムでの使い方

測定した disorder に応じて、使うアルゴリズムを切り替える：

| disorder 範囲 | 使うアルゴリズム | 計算量 |
|--------------|----------------|--------|
| < 0.2 | Simple | O(n²) |
| 0.2 ≤ d < 0.5 | Medium | O(n√n) |
| ≥ 0.5 | Complex | O(n log n) |

直感的には「ほぼ整列済みなら軽いアルゴリズムで十分、バラバラなら高性能なものを使う」という考え方。

## --bench モードでの出力

`./push_swap --bench <numbers>` を実行すると、**stderr** に以下を出力する：

```
[bench] disorder:  49.93%
[bench] strategy:  Adaptive / O(n√n)
[bench] total_ops: 7997
[bench] sa: 0  sb: 0  ss: 0  pa: 500  pb: 500
[bench] ra: 4840  rb: 1098  rr: 0  rra: 0  rrb: 1059  rrr: 0
```

操作の列自体は引き続き stdout に出力される。
