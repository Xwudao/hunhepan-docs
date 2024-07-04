---
outline: deep
---

# ReMan Spider

## 介绍

同样，我们提供 windows / linux 端的爬虫程序，建议是使用 windows 端（目的是使用自己的电脑去爬取资源），因为使用服务器 24 小时爬取，会被目标网站封 IP

但是使用自己宽带的话，过段时间 IP 就变了，所以，建议使用 windows 端爬取，然后上传到服务器上，这样就不会被封 IP 了

## 原理

得益于 混合盘 平台，基于规则，我们可以使用非常多的网站去爬取资源，然后上传到我们的服务器上，这样就可以实现资源的快速更新了

爬虫流程：

1. 从 混合盘 平台获取规则列表
2. 从自己网站拉取热搜词列表
3. 遍历热搜词列表，对于每个热搜词，遍历规则列表，爬取资源
4. 每次爬取到的资源，先获取到详细信息，然后上传到服务器上

至此，1 次爬取流程结束，然后等待下一次爬取流程

目前，爬取流程是每隔 1 分钟执行一次，暂时不可修改

::: warning 注意
爬虫程序是通过获取网站热搜词进行爬取的，所以，如果你的网站没有热搜词（即刚起步时，网站没有人使用，导致没有热搜词时），那么爬虫程序将不会爬取到任何资源

解决办法可以是：自行进行一些搜索，以此来生成热搜词，然后爬虫程序就可以爬取到资源了

2024-03-09 更新：添加了 flarum 论坛模式(--mode 3)，可以爬取 flarum 论坛资源，这样就不需要热搜词了
:::

## 使用

**注意：爬虫程序需要使用 cmd (terminal) 执行，不可直接双击**

```sh
 ./rm_spider_windows_amd64_v0.0.4.exe -h
ReMan 配套的爬虫工具

Usage:
   [flags]

Flags:
      --api string     ReMan 网站地址，如：https://www.reman.com
      --code string    ReMan 授权码
  -h, --help           help for this command
  -m, --mode int       模式：1: 全站热搜词用作爬虫；2: 今日关键词; 3: flarum 论坛模式 (default 1)
      --token string   ReMan 网站 token 请在后台设置中生成
```

即：

```sh
rm_spider_windows_amd64_v0.0.4.exe --api https://reman.xwd.pw --token xxxxxxxx --code 授权码 --mode 1
```

## 更新

**2024-07-04 更新**

- 添加了模式 5，可以拉取混合盘用户分享的资源（**限时免费**）

**2024-07-03 更新**

- 添加了模式 4，可以爬取通用站点资源，需要在 config.json 中配置 common_site 字段

**2024-03-09 更新**

- 添加了 `--mode` 参数，用于指定爬取 flarum 论坛模式
  需要配置 config.json 里面的 `flarum` 字段

## 模式 3 说明

**flarum 论坛模式，是指爬取 flarum 论坛资源。**

你需要在 config.json 中配置 flarum 字段，如：

```json
{
  "flarum": [
    "https://yunpan1.cc/",
    "https://kkxz.vip/",
    "https://yyurl.cc/",
    "https://www.xiaohuanle.com/",
    "https://bbs.alipansou.com/"
  ],
  "flarum_page": 3
}
```

将网址添加到 flarum 字段中，然后指定 flarum_page 字段，即可爬取 flarum 论坛资源

flarum_page 字段是指爬取的页数，即每个网站爬取多少页资源。

> 上述，我们配置了 5 个网站，每个网站爬取 3 页资源，你可以自行找一些类似的网站网址填入

命令参考：

```bat
rm_spider_windows_amd64_v0.0.4.exe --api https://example.com --token 后台生成的token --code 授权码 --mode 3
```

## 模式 4 说明

> 模式 4 预计在 v0.1.6 版本发布

**通用站点模式，你可以填入一些网站的列表页的地址（例如文章列表页地址），然后系统爬取详情页地址，匹配出详情页的网盘资源链接。**

同样，需要在 config.json 中配置 common_site 字段，如：

```json
{
  "common_site": ["http://bbs.alypw.cn/"]
}
```

命令参考：

```bat
rm_spider_windows_amd64_v0.0.4.exe --api https://example.com --token 后台生成的token --code 授权码 --mode 4
```

## 模式 5 说明

> 预计在 v0.1.7 版本发布

> 该模式限时免费开放，后续可能会收费

模式 5 是从混合盘拉取用户今日[分享的链接](https://hunhepan.com/submit)，然后爬取资源，最后入库；

命令参考：

```bat
rm_spider_windows_amd64_v0.0.4.exe --api https://example.com --token 后台生成的token --code 授权码 --mode 5
```

## 其它

爬虫程序支持定制化开发，如果你有特殊的需求，可以联系我们；

费用另议，一般是 500 元起步，根据需求而定
