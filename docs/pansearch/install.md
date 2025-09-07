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

## 配置详情

:::details 点击查看配置文件 config.yml 示例

```yml
app:
  mode: release
  port: 6655
  host: true
cors:
  allowCredentials: true
  allowOrigin:
    - http://localhost:*
    - http://127.0.0.1:*
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
  - `allowOrigin`: 允许的源地址列表，支持通配符。
  - `maxAge`: 预检请求缓存时间。

> 你需要将你的域名地址添加到 `allowOrigin` 列表中。

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

> 请根据你的 Redis 配置进行修改。


### 用环境变量覆盖

你可以使用环境变量覆盖配置文件中的设置，环境变量格式为 `PAN_<SECTION>_<KEY>`，例如：

更改端口：

```bash
export PAN_APP_PORT=8080
```

添加允许的跨域地址：

```bash
export PAN_CORS_ALLOWORIGIN=http://example.com http://another.com
```

从上可以看出，规则是：

1. 所有字母大写
2. 用下划线 `_` 替换点 `.` 和连字符 `-`
3. 数组类型的值用空格分隔

## Elasticsearch 安装说明

程序支持elasticsearch 7.x 及 elasticsearch 8.x 版本

更多介绍请参考：

[Es安装介绍说明](./elasticsearch.md)


## MySQL 安装说明

更多介绍请参考：

[MySQL安装介绍说明](./mysql.md)