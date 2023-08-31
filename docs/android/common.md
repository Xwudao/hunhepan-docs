---
outline: deep
---

# 通用全局变量

## 搜索js环境内


- keyword 用户搜索的关键词
- page 用户请求的页码
- baseUrl 在配置步骤配置的base_url
- encode 编码
- net 网络访问
- cache 缓存
- log 打印日志


## 详情解析环境内

- searchData 搜索规则中的SearchData
- baseUrl 在配置步骤配置的base_url
- encode 编码
- net 网络访问
- cache 缓存
- log 打印日志


## log

```js
log.log(msg:String)
```

## cookies

@since 0.8.7

cookies 管理，这里提供了一些方法供规则使用

```js
fun hasNamedCookie(name: String): Boolean
fun getNamedCookie(name: String): String
fun setNamedCookie(name: String, value: String)
fun setStringCookie(cookie: String)
```

## number

@since v0.8.6

由于rhino的缺陷，在对象中使用int,会被看做float，比如：

这将导致一些网站，不能正常识别参数，所以提供额外的方法来辅助转换

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