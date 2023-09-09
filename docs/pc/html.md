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



## 实例

一般而言，我们要通过解析html来获得我们想要的数据，其实3步就可能了：

- 1. 通过`html.parse`解析html
- 2. 通过css选择器，选择我们想要的元素**们**，注意这个**们**
- 3. 遍历这些元素们，获取我们想要的数据，获得每一个元素的属性，或者文本内容，这就是我们搜索的每一个结果


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="rows">
      <div class="row">
        <a href="https://example.com">
          <div class="title">123</div>
          <div class="desc">3456</div>
        </a>
      </div>
      <div class="row">
        <a href="https://example.com">
          <div class="title">123</div>
          <div class="desc">3456</div>
        </a>
      </div>
      <div class="row">
        <a href="https://example.com">
          <div class="title">123</div>
          <div class="desc">3456</div>
        </a>
      </div>
      <div class="row">
        <a href="https://example.com">
          <div class="title">123</div>
          <div class="desc">3456</div>
        </a>
      </div>
    </div>
  </body>
</html>

```


对于上面的文本，我可以通过如下代码来解析：

```js
var doc = html.parse(htmlStr); // htmlStr是上面的文本，这是第1步

var items = doc.find('.row'); // 这是第2步，通过css选择器，选择我们想要的元素们

items.each(function(i, item) { // 这是第3步，遍历这些元素，获取我们想要的数据
    var title = item.find('.title').text();
    var desc = item.find('.desc').text();
    var aEl  = item.find('a');
    var href = aEl.attrOr('href','');
    console.log(title, desc, href);

    // ... add to rtnList
});

```

总的来说，就是这3步，就可以解析html，获取我们想要的数据了。

稍微难点的步骤可能就是：如何通过css选择器，获得我们想要的**元素们**