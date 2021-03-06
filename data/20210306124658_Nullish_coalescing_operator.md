JavaScript での||と??の使い分け。

## ||

左側が falsy な値の場合、右側の値となる。

```
const address = user?.address ?? "none"
```

注意点として、user.address が空文字の場合でも falsy な値なので"none"となってしまう。

## ??

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
??を使うと、左側が null または undefined の場合のみ、右側の値となる。
