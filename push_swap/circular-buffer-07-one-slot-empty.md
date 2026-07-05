---
title: 07. なぜ1マス空けるのか
---
# 07. なぜ1マス空けるのか

## 問題

サイズ5の配列を考える。

```text
index: 0 1 2 3 4
data : _ _ _ _ _

head = 0
tail = 0
```

ここで順に `push()` する。

## 実験

### push(A)

```text
A _ _ _ _

head = 0
tail = 1
```

### push(B)

```text
A B _ _ _

head = 0
tail = 2
```

### push(C)

```text
A B C _ _

head = 0
tail = 3
```

### push(D)

```text
A B C D _

head = 0
tail = 4
```

ここで、あと1マス空いている。

### さらに push(E) すると？

```text
A B C D E

head = 0
tail = 0
```

## 観察

この状態は、

```text
head = 0
tail = 0
```

初期状態と同じ。

初期状態も、

```text
head = 0
tail = 0
```

だった。

## 考察

`head == tail` だけを見ると、

- 空
- 満杯

を区別できない。

## 解説

だから、1マス空ける方式を使う。

サイズ5でも、実際に入れられるのは4個まで。

```text
A B C D _

head = 0
tail = 4
```

この状態を満杯とみなす。

## なぜこれで区別できるか

空はこれ。

```text
head == tail
```

満杯はこれ。

```text
tail の次が head
```

つまり、

```text
(tail + 1) % size == head
```

## 今回学んだこと

- 1マス空けるのは、`head == tail` を空専用にするため
- サイズ5なら最大4個まで入れる
- 満杯は「tailの次がhead」の状態
