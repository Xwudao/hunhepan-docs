---
outline: deep
draft: true
---

# 从零开始搭建 V2FD 网址导航网站

所需环境：

- MySQL 5.7+
- Redis 6+

除了之外，V2FD 不需要任何其他依赖。

## 安装依赖环境

### 安装 Mysql

### 安装 Redis

### 使用 Docker 安装 Mysql 和 Redis

## 修改配置文件

```yml
app:
  mode: release
  port: 2476
  meta: v2fd
cors:
  allowCredentials: true
  allowOrigin:
    - http://localhost:*
    - http://127.0.0.1:*
  maxAge: 24h
db:
  database: v2fd
  dialect: mysql
  host: 127.0.0.1
  username: root
  password: root
  port: 3306
  autoMigrate: true

jwt:
  secret: randomstr of 32 bits or more
  expire: 300h
  issuer: v2fd

log:
  format: text
  level: debug
  linkName: current.log
  path: ./logs

redis:
  addr: 127.0.0.1:6379
  db: 0
  password: ''
```

## 运行程序

**手动运行**

在 `v2fd` 主体程序所在目录执行：

```bash
./v2fd
```

找到输出的默认管理员账号和密码，然后 ctrl+c 退出。下面将使用`pm2`来运行程序。


---

**基于pm2**

安装`pm2`需要先安装`nodejs`，然后执行在 `v2fd` 主体程序所在目录执行：

```bash
pm2 start v2fd

pm2 save # 保存当前进程
pm2 startup # 生成开机启动命令，这样程序就会在开机时自动启动
```

安装`pm2`参考：**todo...**



## 配置反向代理

**nginx**或者**caddy**都可以，推荐新手使用**caddy**。


程序默认配置中，监听的端口是`2476`，而用户是不能直接访问这个端口的，所以需要配置反向代理以便用户可以通过`80`、`443`端口及域名进行访问。





## 更新程序

之后更新程序，会在群里发一个压缩包，里面有程序本体和配置文件，一般而言不需要管配置文件，只需要将程序本体替换即可。

然后执行：

```bash
pm2 restart v2fd
```

即可。