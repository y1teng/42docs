---
title: 03. init_queue を作る
---
# 03. init_queue を作る

## 問題

まず構造体を用意する。

```c
typedef struct s_queue
{
    char    *data;
    int     size;
    int     head;
    int     tail;
}   t_queue;
```

次の関数を書く。

```c
void    init_queue(t_queue *q, char *buffer, int size);
```

## 機能

`q` を使える状態に初期化する。

## 条件

呼び出し後、こうなっていること。

```c
q.data == buffer;
q.size == size;
q.head == 0;
q.tail == 0;
```

## 実験コード

```c
#include <stdio.h>

typedef struct s_queue
{
    char    *data;
    int     size;
    int     head;
    int     tail;
}   t_queue;

void    init_queue(t_queue *q, char *buffer, int size)
{
    /* ここを書く */
}

int main(void)
{
    int     size = 5;
    char    buffer[5];
    t_queue q;

    init_queue(&q, buffer, size);

    printf("q.data = %p\n", (void *)q.data);
    printf("buffer = %p\n", (void *)buffer);
    printf("q.size = %d\n", q.size);
    printf("q.head = %d\n", q.head);
    printf("q.tail = %d\n", q.tail);
    return (0);
}
```

## 観察

`q.data` と `buffer` のアドレスが同じなら成功。

```text
q.data = 0x...
buffer = 0x...
q.size = 5
q.head = 0
q.tail = 0
```

## よくある間違い

### 間違い1

```c
q->data = q;
```

`data` に入れるのは `buffer`。

```c
q->data = buffer;
```

### 間違い2

```c
q.size = size;
```

`q` はポインタなので `->` を使う。

```c
q->size = size;
```

## 解説

`.` は構造体そのものに使う。

```c
q.head = 0;
```

`->` は構造体へのポインタに使う。

```c
q->head = 0;
```

## 今回学んだこと

- 初期化関数は初期化だけする
- `q` がポインタなら `->`
- `q.data` と `buffer` が同じアドレスなら、配列を正しく指している
