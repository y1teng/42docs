---
title: 循環型配列 教材
---
# 循環型配列

この教材は、循環型配列を「答えを読む」のではなく、実験して壊しながら理解するためのもの。

## 目的

- `head` と `tail` の意味を理解する
- `push()` と `pop()` を自分で実装する
- なぜ `% size` が必要なのかを理解する
- なぜ1マス空ける方式があるのかを理解する
- 空なのに `pop()` できてしまう問題を観察する
- push_swap に戻るために、循環型配列の考え方を整理する

## 学習の進め方

この教材では、先に答えを読まない。

基本の流れはこれ。

1. 問題を読む
2. コードを書く
3. 実行する
4. 壊れる
5. 現象を見る
6. なぜ必要なのか考える
7. 必要になった知識だけ読む

## 目次

1. [キューとは何か](./circular-buffer-01-queue)
2. [head と tail](./circular-buffer-02-head-tail)
3. [init_queue を作る](./circular-buffer-03-init-queue)
4. [push を作る](./circular-buffer-04-push)
5. [pop を作る](./circular-buffer-05-pop)
6. [% size が必要になる理由](./circular-buffer-06-wrap-around)
7. [なぜ1マス空けるのか](./circular-buffer-07-one-slot-empty)
8. [is_full を作る](./circular-buffer-08-is-full)
9. [空なのに pop できる問題](./circular-buffer-09-empty-pop)
10. [pop の返り値をどうするか](./circular-buffer-10-pop-design)
11. [push_swap との関係](./circular-buffer-11-push-swap)
12. [実験用コード](./circular-buffer-12-debug-code)
