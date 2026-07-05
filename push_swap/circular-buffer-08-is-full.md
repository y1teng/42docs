---
title: 08. is_full を作る
---
# 08. is_full を作る

## 問題

次の関数を書く。

```c
int is_full(t_queue *q);
```

## 機能

キューが満杯なら `1`、満杯でなければ `0` を返す。

## 条件

1マス空ける方式。

満杯とは、

```text
tail の次の位置が head
```

である。

## 実装

```c
int is_full(t_queue *q)
{
    return ((q->tail + 1) % q->size == q->head);
}
```

## 実験

```text
size = 5
head = 0
tail = 4
```

計算する。

```text
(tail + 1) % size
= (4 + 1) % 5
= 0
```

これは `head` と同じ。

なので満杯。

## よくある疑問

初期状態も `head = 0`, `tail = 0` だから満杯になるのでは？

ならない。

`is_full()` は `tail == head` を見ていない。

見ているのは、

```text
tail の次 == head
```

である。

初期状態では、

```text
(0 + 1) % 5 = 1
1 == 0 ? false
```

なので満杯ではない。

## push に組み込む

今の `push()` は、満杯でも書いてしまう。

```c
void    push(t_queue *q, char value)
{
    q->data[q->tail] = value;
    q->tail = (q->tail + 1) % q->size;
}
```

これを修正する。

```c
void    push(t_queue *q, char value)
{
    if (is_full(q))
        return ;
    q->data[q->tail] = value;
    q->tail = (q->tail + 1) % q->size;
}
```

## 間違えやすい実装

```c
void    push(t_queue *q, char value)
{
    if (!is_full(q))
        q->data[q->tail] = value;
    q->tail = (q->tail + 1) % q->size;
}
```

これだと満杯でも `tail` だけ進む。

状態が壊れる。

満杯なら即 `return` する。

## 今回学んだこと

- `is_full()` は「次にpushしたらheadに追いつくか」を見ている
- 満杯なら `push()` は何もしない
- 書かないだけでなく、`tail` も進めてはいけない
