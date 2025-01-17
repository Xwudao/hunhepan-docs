---
outline: deep
---

# 规则开发指南

## 开发环境

1. nodejs
2. 混合盘软件

在nodejs官网，下载安装nodejs，安装完成后，终端运行：`node -v`，如果有输出版本号，说明安装成功。

<https://nodejs.org/zh-cn>

## 界面介绍

![混合盘软件](/images/guide/image.png)

按照上述界面，打开“开发模式”，这在左边菜单会出来“开发”选项，点击进入页面。

## 规则编写

首先克隆准备的模板：

```bash
git clone https://github.com/hunhepan/hunhepan-rule-template.git
cd hunhepan-rule-template
```

然后安装依赖：

```bash
npm install
```

### 总览

一个规则需要两个文件：

- rule.js
- rule.json

这两个是同名的文件，比如 `rule.js` 和 `rule.json`。

js文件主要用于逻辑处理，json文件主要用于配置。

简单起见，创建新的规则时，只需要创建一个.js文件后，在终端运行：

```bash
npm run build
```

会自动创建同名json文件。

### js文件

js文件主要响应事件：

```js
hun.events.onSearch = async (ctx) => {};
hun.events.onInfo = async (ctx) => {};
hun.events.onTab = async (ctx) => {};
hun.events.onList = async (ctx) => {};
```

其中，

- onInfo：解析详情时触发
- onSearch / onList 搜索页或列表页时触发，这两个事件最少存在一个。
- onTab：依赖于onList，可选，用于列表页的分类选择。

:::details 详细说明

```js
// 搜索处理
hun.events.onSearch = async (ctx) => {
  const {page, query} = ctx; // 从上下文中获取信息
  const {field1,field2} = ctx.filters; // 从过滤器中获取配置信息
  const {field3,field4} = ctx.settings; // 从设置中获取配置信息

  // 返回的内容
  ctx.res = [
    {
      title: '测试文件1',
      url: 'https://example.com/file1',
      info: '文件描述信息',
      image: 'https://example.com/thumb1.jpg',
      tags: ['标签1', '标签2'],
      payloads: {
        xx: 'yy', // 注意，这里的payloads将会注入到onInfo事件的ctx.payloads中，你可以在onInfo事件中使用
      },
    },
  ];
};

// 列表处理
hun.events.onList = async (ctx) => {
  const { page } = ctx; // 从上下文中获取信息
  ctx.res = [
    {
      //参考上面的`hun.events.onSearch`事件处理器
    },
  ];
};

// 规则信息：获取资源的详细信息
hun.events.onInfo = async (ctx) => {
    const { field1, filed2 } = ctx.payloads; // 从上下文中获取信息
  ctx.res = [
    // 返回数组
    {
      title: '',
      url: '',
    },
  ];
};

// 分类标签：onList下面的分类标签，可选
hun.events.onTab = async (ctx) => {
 const {field1,field2} = ctx.settings; // 从设置中获取配置信息
  ctx.res = [
    {
      label: '分类1',
      value: 'category1',
      payloads: {
        xx: 'yy', // 注意，这里的payloads将会注入到onList事件的ctx.payloads中，你可以在onList事件中使用
      },
    },
  ];
};
```

:::

### json文件

json文件主要用来告诉软件一些元信息，配置信息等；

:::details 点击展开详情

```json
{
  "name": "规则名称",
  "url": "网站地址",
  "version": "v0.0.1",
  "weight": 1,
  "search_filters": [
    {
      "field": "type",
      "default": "all",
      "label": "分类",
      "type": "select",
      "options": [
        {
          "value": "all",
          "label": "全部"
        },
        {
          "value": "video",
          "label": "视频"
        }
      ]
    }
  ],
  "list_filters": [],
  "settings": [
    {
      "field": "base_url",
      "default": "https://example.com",
      "label": "网站地址",
      "type": "text"
    }
  ],
  "group": "分组名称"
}
```

:::

json 配置说明：

:::details 点击展开配置说明

- `name`: 规则名称
- `url`: 网站基础地址
- `version`: 版本号
- `weight`: 权重(排序用)
- `search_filters`: 搜索过滤器配置
  - `field`: 过滤字段名 (即可以解构 `ctx.filters` 中的字段)
  - `default`: 默认值
  - `helper_text`: 帮助文本，展示在过滤器下方，可使用[url=链接]链接[/url]格式添加链接
  - `label`: 显示标签
  - `type`: 控件类型(select/text/textarea)
  - `options`: select 类型的选项列表
- `list_filters`: 列表过滤器配置(格式同 search_filters)
- `settings`: 设置项配置(格式同 filters)
- `group`: 规则分组

这些配置可以在事件处理器中通过 `ctx.settings` 和 `ctx.filters` 获取。

:::

## 快速开始

在src目录下创建一个新的js文件，比如 `rule.js`，然后在终端运行：

```bash
npm run build
```

会自动创建同名json文件。

![创建js文件](/images/guide/image-1.png)

将下面的内容写进 `rule.js` 文件：

```js
hun.events.onSearch = async (ctx) => { };
hun.events.onInfo = async (ctx) => { };
hun.events.onTab = async (ctx) => { };
hun.events.onList = async (ctx) => { };
```

然后终端运行：`npm run build -w`，这样就可以实时编译js文件。

打开混合盘软件，点击左边菜单的“开发”选项，然后点击“打开”，选择刚刚构建出来的**dist/目录下**的js文件，
点击：“加载”，然后就可以看到规则的效果了。

![打开编译的js文件](/images/guide/image-2.png)

![加载js文件](/images/guide/image-3.png)

---

修改 src 下的 rule.js 文件：

> 此时终端依然在监听模式下：`npm run build -w`

```js
hun.events.onSearch = async (ctx) => {
  const { page, query } = ctx;
  console.log('🚀 ~ hun.events.onSearch= ~ query:', query);
  console.log('🚀 ~ hun.events.onSearch= ~ page:', page);
};
hun.events.onInfo = async (ctx) => {};
hun.events.onTab = async (ctx) => {};
hun.events.onList = async (ctx) => {};
```

重新点击“加载”，然后在搜索框输入内容，点击搜索，就可以看到终端输出了搜索内容。

![打印日志](/images/guide/image-4.png)

---

下面将尝试返回内容：

```js
hun.events.onSearch = async (ctx) => {
  const { page, query } = ctx;
  console.log('🚀 ~ hun.events.onSearch= ~ query:', query);
  console.log('🚀 ~ hun.events.onSearch= ~ page:', page);

  ctx.res = [
    {
      title: '这是一条测试的标题',
      url: 'url',
      info: '这是一条测试的描述',
      tags:['标签1','标签2'],
      payloads:{
        'hll': 'world'
      }
    },
  ];
};
hun.events.onInfo = async (ctx) => {};
hun.events.onTab = async (ctx) => {};
hun.events.onList = async (ctx) => {};

```

![返回内容](/images/guide/image-5.png)

---

下面将尝试在详情页返回内容：

```js
hun.events.onSearch = async (ctx) => {
  // ... 省略了上一步的代码
};
hun.events.onInfo = async (ctx) => {
  const { hll } = ctx.payloads;
  console.log('🚀 ~ hun.events.onInfo= ~ hll:', hll);

  // 这里的 hll 就是上面onSearch中的payloads中的内容

  ctx.res = [
    {
      title: '这是详情解析的标题',
      url: 'https://www.baidu.com',
    },
  ];
};
hun.events.onTab = async (ctx) => {};
hun.events.onList = async (ctx) => {};

```

![详情解析](/images/guide/image-6.png)

---

下面的onList和onTab就不赘述了，和上面一样的套路！
