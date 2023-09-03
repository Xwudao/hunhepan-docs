---
outline: deep
---


# html

`html`模块是为了解析html结构，这里的实现是基于golang中的：`goquery`库

## API

提供如下方法：
```js
parse(html string) *goquery.Document
```


## 用法


`html.parse`返回的是`*goquery.Document`

之后的用法请参考：[goquery](https://github.com/PuerkitoBio/goquery#examples)

**注意**: 无论你是调用`goquery`的什么方法，在js内，方法的首字母都是小写的，如：`parse`，而不是`Parse`