---
outline: deep
---

# 安装说明

该文档介绍如何安装和配置 PanSearch。

## 程序主体介绍

```txt
├── config.yml
├── go-pansearch_linux_amd64_v0.1.0
└── templates
    ├── layouts
    │   ├── footer.html
    │   ├── header.html
    │   └── navbar.html
    ├── pages
    │   ├── doc.html
    │   ├── error.html
    │   ├── index.html
    │   └── search.html
    └── static
        ├── main.css
        ├── main.iife.js
        └── utils.css
```

- config.yml: 程序配置文件
- go-pansearch_linux_amd64_v0.1.0: 程序主体文件(二进制)
- templates: 前端模板文件

::: warning 注意
从版本v0.2.4起，二进制文件中已内嵌templates目录，无需单独放置。

若有自定义需求，可以将templates目录放置到和二进制文件、配置文件同级目录。
:::

## 配置详情

:::details 点击查看配置文件 config.yml 示例

```yml
app:
  mode: release
  port: 6655
  host: true
cors:
  allowCredentials: true
  domains:
    - example.com
    - test.com
  maxAge: 24h
db:
  database: go-pansearch
  dialect: mysql
  host: 192.168.1.21
  username: root
  password: 123456
  port: 3306
  autoMigrate: true

es:
  address: http://192.168.1.21:9200
  diskIndex: "pansearch"
  debug: false
  indexAnalyzer: "ik_max_word"
  searchAnalyzer: "ik_smart"
  username: ""
  password: ""

jwt:
  secret: thisstringmustbeverylongandrandom
  expire: 24h
  issuer: neter

log:
  format: text
  level: info
  linkName: current.log
  path: ./logs

redis:
  addr: 192.168.1.21:6379
  db: 0
  password: ""
  prefix: ""

```

:::

### 配置说明

- **app**: 应用程序基本设置。
  - `mode`: 运行模式，如 `release` 用于生产环境。
  - `port`: 服务器监听端口，默认 6655。
  - `host`: 是否绑定到主机地址，true 表示绑定到所有接口。

> 除了端口，默认不用动。

- **cors**: 跨域资源共享设置。
  - `allowCredentials`: 是否允许发送凭据。
  - `domains`: 允许的源地址列表。
  - `maxAge`: 预检请求缓存时间。

> 你需要将你的域名地址添加到 `domains` 列表中。

- **db**: 数据库配置。
  - `database`: 数据库名称。
  - `dialect`: 数据库类型，如 mysql。
  - `host`: 数据库主机地址。
  - `username`: 数据库用户名。
  - `password`: 数据库密码。
  - `port`: 数据库端口。
  - `autoMigrate`: 是否自动迁移数据库结构。

> 请根据你的 MySQL 配置进行修改。

- **es**: Elasticsearch 配置。
  - `address`: Elasticsearch 服务器地址。
  - `diskIndex`: 索引名称。
  - `debug`: 是否启用调试模式。
  - `indexAnalyzer`: 索引分析器，用于中文分词。
  - `searchAnalyzer`: 搜索分析器，用于中文分词。
  - `username`: Elasticsearch 用户名（可选）。
  - `password`: Elasticsearch 密码（可选）。

> 请根据你的 Elasticsearch 配置进行修改。**必须**安装 `IK` 分词插件或 `hao` 分词插件以获得更好的中文支持。

- **jwt**: JSON Web Token 设置。
  - `secret`: JWT 签名密钥，必须长且随机。
  - `expire`: Token 过期时间。
  - `issuer`: Token 发行者。

> 如果要修改登录过期时间，请修改 `expire`。最大单位是`h`，即小时。
>
> 必须修改 `secret` 为一个长且随机的字符串。

- **log**: 日志配置。
  - `format`: 日志格式，如 text。
  - `level`: 日志级别，如 info。
  - `linkName`: 日志文件链接名称。
  - `path`: 日志文件存储路径。
- **redis**: Redis 配置。
  - `addr`: Redis 服务器地址和端口。
  - `db`: Redis 数据库编号。
  - `password`: Redis 密码（可选）。
  - `prefix`: Redis 键前缀（可选，若多个实例共用一个 Redis 服务器时需要指定）。

> 请根据你的 Redis 配置进行修改。

### 用环境变量覆盖

你可以使用环境变量覆盖配置文件中的设置，环境变量格式为 `PAN_<SECTION>_<KEY>`，例如：

更改端口：

```bash
export PAN_APP_PORT=8080
```

添加允许的跨域地址：

```bash
export PAN_CORS_DOMAINS=http://example.com http://another.com
```

从上可以看出，规则是：

1. 所有字母大写
2. 用下划线 `_` 替换点 `.` 和连字符 `-`
3. 数组类型的值用空格分隔

## 一键安装MySQL和Elasticsearch

这里也是可以建议新手使用 `docker compose` 来一键安装 MySQL 和 Elasticsearch。

下载`docker-compose.yml`、参考安装教程，点击：[从零开始完整安装 ReMan](/reman/complete-install.md)

**唯一不同的是**:

`PanSearch` 多了一个`templates`目录，但是这个目录只需要放置到和二进制文件、配置文件同级目录即可。

## Elasticsearch 安装说明

程序支持elasticsearch 7.x 及 elasticsearch 8.x 版本

更多介绍请参考：[Es安装介绍说明](./elasticsearch.md)

主要想表达的是：要使ES支持中文搜索，必须安装`IK`分词插件或`hao`分词插件，然后这两个插件的版本必须和你的ES版本对应，否则会报错。

使用`IK`分词插件时，配置文件中的`indexAnalyzer`和`searchAnalyzer`必须分别设置为`ik_max_word`和`ik_smart`。

```yml
es:
  # ... other settings ...
  indexAnalyzer: "ik_max_word"
  searchAnalyzer: "ik_smart"
```

使用`hao`分词插件时，配置文件中的`indexAnalyzer`和`searchAnalyzer`必须分别设置为`hao_max_word`和`hao_smart`。

```yml
es:
  # ... other settings ...
  indexAnalyzer: "hao_index_mode"
  searchAnalyzer: "hao_search_mode"
```

## MySQL 安装说明

更多介绍请参考：[MySQL安装介绍说明](./mysql.md)
