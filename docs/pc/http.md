---
outline: deep
---

# http

alias:

- net

网络请求，你可以使用 `http` 模块来发起网络请求。

它目前支持如下方法：

```js
http.ajax(url， config)
http.getLoc(url， config)
http.submitForm(url， config)
```

以上每个方法，都必须传入 2 个参数：

- url: String
- config: Config

`Config`如下：

```js
{
   method: 'GET',
   headers: {
    'content-type': 'application/json',
   },
   timeout: 10000, // 10s
   data: Object,
}
```

## 简单使用

一个最简单的请求网页内容的代码如下：

```js
var configs = {}
var url = 'https://baidu.com'

var resp = http.ajax(url, configs)
```

这代表：使用'GET'的方法去访问百度首页，且不传递特殊的headers、Cookies

## 获取302跳转的值

```js
var loc = http.getLoc(url, config)
```
如上，就可以获取到302、301等重写向的值


## 提交表单（form-data）

```js
var url = 'https://somesite.com'
var config = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded', // <- 注意，需要设置content-type
  },
  data: {
    a: 'b'
  },
}
var resp = net.submitForm(url, config)
```

## 注意

- 请在header中设置相应的content-type，比如要将json作为body传递，则需要设置application/json
- 最好在header中添加一个user-agent，不然就是默认的ua，这很容易被源站屏蔽