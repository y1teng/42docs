---
title: 02. head と tail
---
# 02. head と tail

## 問題

サイズ5の配列を使う。

```text
index: 0 1 2 3 4
data : _ _ _ _ _

head = 0
tail = 0
```

ここで `push(A)` する。

どうなるか考える。

## 実験

手で書く。

```text
index: 0 1 2 3 4
data : A _ _ _ _

head = ?
tail = ?
```

## 観察

`A` は index 0 に入る。

次に入れる場所は index 1。

```text
head = 0
tail = 1
```

## 考察

ここで重要なのは、`tail` は「最後に入っている場所」ではないこと。

`tail` は、

```text
次に書き込む場所
```

である。

## よくある間違い

`tail` を「最後のデータの場所」だと思うと混乱する。

正しくはこう。

```text
head : 次に pop する場所
tail : 次に push する場所
```

## 今回学んだこと

- `head` は次に取り出す場所
- `tail` は次に書き込む場所
- `tail` は最後のデータの場所ではない
