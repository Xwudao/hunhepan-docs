---
outline: deep
---

# cache

你可以在JS作用域内使用`cache`全局变量，它提供了一些缓存相关的方法；

```js
put(key string, value interface{})
get(key string) interface{}
remove(key string)
putExpire(key string, value interface{}, expire int)
```


其中，`putExpire`的`expire`参数是一个整数，表示缓存的有效时间，单位是秒；

