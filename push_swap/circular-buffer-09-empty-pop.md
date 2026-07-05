---
title: 09. 空なのに pop できる問題
---
# 09. 空なのに pop できる問題

## 問題

今の `pop()` はこう。

```c
char    pop(t_queue *q)
{
    char    value;

    value = q->data[q->head];
    q->head = (q->head + 1) % q->size;
    return (value);
}
```

この関数は、空かどうかを確認していない。

## 実験

`main()` をこうする。

```c
int main(void)
{
    int     size = 5;
    char    buffer[5];
    t_queue q;
    int     i;

    init_queue(&q, buffer, size);

    i = 0;
    while (i < 4)
    {
        push(&q, 'a' + i);
        i++;
    }

    i = 0;
    while (i < 6)
    {
        printf("pop = %c, head = %d, tail = %d\n", pop(&q), q.head, q.tail);
        i++;
    }
    return (0);
}
```

## 観察

例えば、こういう出力になる。

```text
pop = a, head = 1, tail = 4
pop = b, head = 2, tail = 4
pop = c, head = 3, tail = 4
pop = d, head = 4, tail = 4
pop = ?, head = 0, tail = 4
pop = a, head = 1, tail = 4
```

4回取り出した時点で、

```text
head = 4
tail = 4
```

になる。

これは空。

でも、次の `pop()` が実行されてしまう。

## 考察

問題は、

```text
head が4だから
```

ではない。

問題は、

```text
head == tail
```

で空なのに、`pop()` が動いてしまうこと。

## 重要

`head = 4` 自体は悪くない。

例えば、

```text
head = 4
tail = 1
```

なら、index 4 に有効なデータがある可能性がある。

問題は `head == tail`。

## is_empty

空判定はこう。

```c
int is_empty(t_queue *q)
{
    return (q->head == q->tail);
}
```

## 今回学んだこと

- `head == tail` は空
- 空なのに `pop()` するとゴミや古いデータを返す
- `head` の値そのものではなく、`head` と `tail` の関係を見る
