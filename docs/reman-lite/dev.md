---
outline: deep
---


# 前端模板文件修改

## 结构

目前ReMan-lite目录结构如下：

```txt
├── config.yml
├── current.log -> logs/current.log
├── go-hunheso
├── logs
└── web
    ├── front
    ├── public
    └── static
```

其中`web`目录是前端模板文件目录，`front`目录是前端模板文件目录，`public`目录是前端静态文件目录，`static`目录是前端静态文件目录。

```txt
└> tree  -L 2 web/
web/
├── front
│   ├── layouts
│   │   ├── header.nav.tpl
│   │   ├── meta.header.tpl
│   │   ├── page.aside.tpl
│   │   ├── page.footer.tpl
│   │   └── page.header.tpl
│   └── pages
│       ├── doc.tpl
│       ├── index.tpl
│       ├── item_tg.tpl
│       ├── search.tpl
│       ├── search_tg.tpl
│       ├── submit.tpl
│       ├── tg_item.tpl
│       ├── tg_list.tpl
│       └── tg_search.tpl
├── public
│   ├── logo.svg
│   ├── robots.txt
│   ├── search_words.xml
│   ├── sitemap.xml
│   └── sitemaps
└── static
    ├── app.css
    ├── ban_robot.txt
    ├── icons
    ├── lib-app.js
    ├── logo.svg
    ├── main.css
    ├── main.js
    └── utils.css
```

所以你需要修改的就是`web/front`目录下的文件。其中语法需要你了解`Go`的`html/template`模板语法。<https://pkg.go.dev/text/template>

`layout`是公用的模板文件，`pages`是页面模板文件。

## 修改说明

因为，`ReMan-lite`更新时，可能也会更新前端模板文件，这就可能与你修改的冲突，所以这点风险需要你自己考虑。

另外，由于ReMan-lite基于服务器IP认证，所以你需要开发的话，可能得在服务器上直接开发，步骤如下：

- 修改配置文件`config.yml`，将`app.mode`修改为`debug`，这样可以热加载模板文件。（修改config.yml后，需要重启程序）
- 修改前端模板文件，保存后，刷新页面即可看到效果。


