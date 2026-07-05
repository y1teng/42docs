---
title: 04. push を作る
---
# 04. push を作る

## 問題

次の関数を書く。

```c
void    push(t_queue *q, char value);
```

## 機能

キューの末尾に `value` を1つ追加する。

## 前提

- `q` は初期化済み
- 空きは十分にある
- まだ循環処理は考えない
- まだ満杯判定は考えない

## 実験コード

```c
void    push(t_queue *q, char value)
{
    /* ここを書く */
}
```

`main()` に追加する。

```c
push(&q, 'c');

printf("%c\n", q.data[0]);
printf("head = %d\n", q.head);
printf("tail = %d\n", q.tail);
```

## 観察

期待する結果。

```text
c
head = 0
tail = 1
```

## 考察

`push()` がすることは2つ。

1. `tail` の位置に書く
2. `tail` を次へ進める

## 解説

最初はこれでよい。

```c
void    push(t_queue *q, char value)
{
    q->data[q->tail] = value;
    q->tail++;
}
```

## 今回学んだこと

- `tail` は次に書く場所
- `push()` 後は `tail` を進める
- まだ配列の最後までは考えない
