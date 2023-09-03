---
outline: deep
---

# cookies

软件默认是会为每个规则开启 Cookies 支持的；

你可以在 JS 作用域内使用`cookies`全局变量，它提供了一些操作 Cookies 相关的方法；

## API

```js
hasNamedCookie(name string) bool
getNamedCookie(name string) string
setNamedCookie(name, value string)
setStringCookie(cookie string)
```

## 用法

```js
cookies.setStringCookie('a=b&c=d')
```


