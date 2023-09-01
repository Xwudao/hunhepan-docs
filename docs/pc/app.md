---
outline: deep
---

# app

`app`模块提供了一些和软件本身相关的功能，比如匹配软件的版本

## API

```js
versionGreetThan(version string) bool 
```


## 用法

```js
var res = app.versionGreetThan('1.0.0')
log.log(res) // false or true
```




