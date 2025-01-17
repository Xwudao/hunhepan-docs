---
outline: deep
---

# 混合盘规则文档（v2）

## 说明

目前混合盘PC端已完全重写，使用了新的规则引擎，规则编写方式也有所改变，本文档是新版规则编写指引。

## 语法

目前js引擎基于 goja: <https://github.com/dop251/goja>

该引擎支持所有的ES5语法，以及部分ES6语法，具体支持的语法可以参考 goja 的文档。

实际使用过程中，常用的es6语法都是支持的，比如箭头函数、let、const等。

并且，基于打包工具，可以把node自带的一些模块自动polyfill

## 网络

在本次重构中，网络请求的方式有所改变，支持类似原生的 `fetch` 语法；

1. 在低层的请求逻辑中，程序会自动处理Cookies，当有`Set-Cookie`时，会自动保存到本地，当有`Cookie`时，会自动添加到请求头中。
2. 程序低层会模拟Chrome的一些请求头，这在过一些反爬虫的网站时会有帮助。另一方面，这也代表，除非特殊情况，不需要自己设置`User-Agent`等请求头。

```js
const resp = await fetch("https://www.baidu.com")
const html = await resp.text()
```

### 获取 301 跳转地址

```js
hun.events.onSearch = async (ctx) => {
  const resp = await fetch('https://baidu.com', {
    redirect: 'manual',
  });
  const loc = resp.headers.get('Location');
  console.log('🚀 ~ hun.events.onSearch= ~ loc:', loc);
};
```

::: details output
🚀 ~ hun.events.onSearch= ~ loc: <https://www.baidu.com/>
:::

### 发送POST请求

```js
hun.events.onSearch = async (ctx) => {
  const resp = await fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      key: 'value',
    }),
  });

  const data = await resp.json();
  console.log('🚀 ~ hun.events.onSearch= ~ data:', JSON.stringify(data));
};
```

::: details output

```text
🚀 ~ hun.events.onSearch= ~ data: {
  "args": {},
  "data": "{\"key\":\"value\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Content-Length": "15",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "Pragma": "no-cache",
    "Sec-Ch-Ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"macOS\"",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-Amzn-Trace-Id": "Root=1-6789e924-60da31350ac884da2bf0409e"
  },
  "json": {
    "key": "value"
  },
  "origin": "1.1.1.1",
  "url": "https://httpbin.org/post"
}
```

:::

:::warning {details}
细心的你可以注意到了在打印`data`时，使用是`JSON.stringify(data)`，这是因为`data`是一个对象，直接打印会显示`[object Object]`，所以需要转换为字符串。
:::

### GET请求带参数

下面想说明一个技巧：

在js中，处理一个对象是比较方便易用的，但是在网络请求中，我们通常需要把对象转换为字符串，这时候可以使用`URLSearchParams`对象。

```js
hun.events.onSearch = async (ctx) => {
  const querys = {
    action: 'search',
    q: ctx.query,
    page: ctx.page,
  };

  const query = new URLSearchParams(querys).toString();
  console.log('🚀 ~ hun.events.onSearch= ~ query:', query);

  const resp = await fetch(`https://httpbin.org/get?${query}`);

  const data = await resp.json();
  console.log(
    '🚀 ~ hun.events.onSearch= ~ data:',
    JSON.stringify(data, null, 2)
  );
};

```

::: details output

```text
🚀 ~ hun.events.onSearch= ~ query: action=search&q=3434&page=1

🚀 ~ hun.events.onSearch= ~ data: 
{
  "args": {
    "action": "search",
    "page": "1",
    "q": "3434"
  },
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Host": "httpbin.org",
    "Pragma": "no-cache",
    "Sec-Ch-Ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"macOS\"",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-Amzn-Trace-Id": "Root=1-6789eb02-3be80a1a455cd7e146700f3f"
  },
  "origin": "1.1.1.1",
  "url": "https://httpbin.org/get?action=search&q=3434&page=1"
}
```

:::

## 缓存

程序会在运行环境中，注入一个名为`store`的全局变量，这个变量是一个简单的键值对存储，可以用来存储一些临时数据。

```js
store.set('key', 'value', 10); // 10s后过期
store.get('key');
```

## 全局自带的变量

在程序运行时，会注入一些常用的库，且已做好了polyfill，可以直接使用。

### 加密/解密

全局变量：`CryptoJS`

关于CryptoJS的使用，可以参考官方文档：<https://cryptojs.gitbook.io/docs/>

下面举几个例子：

```js
hun.events.onSearch = async (ctx) => {
  const skey = '1234567890123456';
  let key = CryptoJS.enc.Latin1.parse(skey);
  let iv = CryptoJS.enc.Latin1.parse(skey);
  let encrypted = CryptoJS.AES.encrypt('hello world', key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  const res = encrypted.toString();
  console.log('🚀 ~ hun.events.onSearch= ~ res:', res);
  // 🚀 ~ hun.events.onSearch= ~ res: w6IbxUAapGDFaE0r9KXUBA==
};
```

base64编码：

```js
const b64decode = (str: string): string => {
  // use cryptojs
  return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(str));
};

const b64encode = (str: string): string => {
  // use cryptojs
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
};

const md5 = (str: string): string => {
  return CryptoJS.MD5(str).toString();
};

```

::: warning
这也是想表达的，由于程序已经自带了CryptoJS，所以像md5,base64等常用的加密方式，可以基于CryptoJS来实现。不必再引入其他库。而增加规则文件的大小及影响性能。
:::

### html解析

全局变量：`cheerio`

cheerio是一个类似jQuery的库，可以用来解析html文档，非常强大！

文档：<https://cheerio.js.org/docs/intro>

```js
hun.events.onSearch = async (ctx) => {
  const testHtml = `

<html>
<body>
    <div class="container">
        <h1>Test Page</h1>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
    </div>
    <div class="footer">
        <p>Footer text</p>
        <a href="https://example.com">Link</a>
    </div>
</body>
</html>

    `;

  const $ = cheerio.load(testHtml);
  const footerText = $('.footer p').text();
  console.log('🚀 ~ hun.events.onSearch= ~ footerText:', footerText);

  const href = $('.footer a').attr('href');
  console.log('🚀 ~ hun.events.onSearch= ~ href:', href);
};
```

::: details output

```text
🚀 ~ hun.events.onSearch= ~ footerText: Footer text

🚀 ~ hun.events.onSearch= ~ href: https://example.com
```

:::
