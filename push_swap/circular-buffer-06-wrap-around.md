---
title: 06. % size が必要になる理由
---
# 06. なぜ % size が必要なのか

## 問題

今の `push()` はこう。

```c
void    push(t_queue *q, char value)
{
    q->data[q->tail] = value;
    q->tail++;
}
```

サイズ5の配列で、`tail = 4` のときに `push()` するとどうなるか。

## 実験

次の状態を作る。

```text
size = 5
tail = 4
```

ここで `push(&q, 'E')` する。

## 観察

`E` は index 4 に入る。

その後、

```text
tail = 5
```

になる。

でも配列の index はこれだけ。

```text
0 1 2 3 4
```

`data[5]` は存在しない。

## 考察

問題は、`tail` が配列外に出ること。

だから、最後まで行ったら0に戻す必要がある。

## まず分かりやすい実装

```c
void    push(t_queue *q, char value)
{
    q->data[q->tail] = value;
    q->tail++;
    if (q->tail == q->size)
        q->tail = 0;
}
```

## ここで間違えやすいこと

```c
if (q->tail == q->size - 1)
    q->tail = 0;
```

これは違う。

理由は、`tail++` した後に判定しているから。

`size = 5` で `tail = 4` の場合、

`tail++` 後は `5`

だから判定はこれ。

```c
if (q->tail == q->size)
```

## % を使った書き方

上の処理は、次の1行で書ける。

```c
q->tail = (q->tail + 1) % q->size;
```

## 確認

```text
size = 5

(0 + 1) % 5 = 1
(1 + 1) % 5 = 2
(2 + 1) % 5 = 3
(3 + 1) % 5 = 4
(4 + 1) % 5 = 0
```

つまり、

```text
0 → 1 → 2 → 3 → 4 → 0
```

になる。

## pop 側も同じ

`head` も配列外に出るので、同じ考え方を使う。

```c
q->head = (q->head + 1) % q->size;
```

## 今回学んだこと

- `% size` は配列外に行かないために使う
- `0 → 1 → 2 → 3 → 4 → 0` と循環させる
- `tail++` の前か後かで判定条件が変わる
