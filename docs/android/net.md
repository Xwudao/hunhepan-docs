---
outline: deep
---

# 网络 net

alias: `http` @since v0.9.3

对于网络访问，请使用net全局关键字

它目前支持如下方法：

```js
net.ajax(url， config)
net.getLoc(url， config)
net.submitForm(url， config)
```

以上每个方法，都必须传入2个参数：

- url: String
- config: Config

`Config`如下：

```js
{
   method: 'GET',
   headers: {
    a: 'b',
   },
    cookies: {
    'name': 'value',
    },
   timeout: 10000, // 10s
   data: String/Object,
}
```

## 最简单的访问网页

一个最简单的请求网页内容的代码如下：

```js
var configs = {}
var url = 'https://baidu.com'

var resp = net.ajax(url, configs)
```

这代表：使用`GET`的方法去访问百度首页，且不传递特殊的headers、Cookies

## 获取302跳转的值

```js
var loc = net.getLoc(url, config)
```

如上，就可以获取到302、301等重写向的值

## 提交表单（form-data）

since v0.5.6 (0.5.6以前的实现有问题)

```js
var url = 'https://somesite.com'
var config = {
  method: 'POST',
  headers: {},
  data: {
    a: 'b'
  },
}
var resp = net.submitForm(url, config)
```

使用config.data定义要post传递的内容；

**注意：**

1. config.data 必须是 object类型，不能为'a=b&c=d'
2. 请在header中设置相应的content-type，比如要将json作为body传递，则需要设置application/json
3. 最好在header中添加一个user-agent，不然就是默认的ua，这很容易被源站屏蔽



**目前存在的问题**

由于rhino的缺陷，在对象中使用int,会被看做float，比如：

```js
var data= {
  page: 1,
  size: 12
}
```

在APP执行这段代码时，会被看做 :

```js
var data= {
  page: 1.0,
  size: 12.0
}
```

解决办法，使用`number`全局变量

```js
fun toInt(str: String): Int
fun toLong(str: String): Long
fun toFloat(str: String): Float 
fun toDouble(str: String): Double 
```


## http全局变量

@sincev0.9.3

对于http，同样支持如下方法：

```js
net.ajax(url， config)
net.getLoc(url， config)
net.submitForm(url， config)
```

和`net`不同之处在于，http的底层实现是使用okhttp4，而net是使用ktor-client，

经过长时间的使用，发现的ktor-client的一些bug，目前上游没有解决，所以在v0.9.3及之后的版本中，提供新的http全局变量以供使用。