---
outline: deep
---

# ReMan

**本文档编写中，目前并未完善**

`ReMan`是一款拥有后台的个人网盘资源管理程序；

可以帮你管理、搜索自己的网盘资源；

特点：

- 拥有后台，灵活配置
- 支持手机端和电脑端（前台）
- 程序本身只有两个文件：config.yml 和 reman（二进制文件）

::: details 点击查演示环境
https://reman.xwd.pw

后台登录：https://reman.xwd.pw/login

用户名：admin

密码：Au2m1TdM
:::

## 价格

￥ 499 程序，包 1 年更新，进内部群，和其他人交流，可以帮忙安装（服务器、域名提前解析好）

购买先加微信：apkapb 备注：reman

::: details 请注意
原则上不建议啥都不懂的人购买，最起码买服务器、域名，解析域名到服务器要会；

我们提供的服务是：程序主体、程序的安装与调试（可帮忙）、1年的程序免费更新；

当调试完毕，程序正常运行后，代表交易已经完成，之后有其它**非程序本身问题**，我们帮忙是情分，不帮是本分；
:::

<!-- ::: details 特别注意（小白、事多请注意）
原则上不建议啥都不懂的人购买，最最起码买服务器、域名，解析域名到服务器要会；

不然到时候，什么都要问我 ，但本人不是一个有耐心的人，所以为了避免双方浪费时间、搞得互相都心情不好，请三思而后行；

毕竟，几百块钱，在如今时代，一个好点的羽绒服都要 500+，499 真当不了上帝；

**话有点难听，但为了大家都好，还是需要提前说明**
::: -->

---

2024-01-14 起，提供配套爬虫，价格：￥ 200

相应介绍：[点击前往](./crawl.md)


## 所需服务部署

运行整套服务，最少需要服务器配置：`2c4g` 即 `2核4G`

系统 `Centos` 或 `Ubuntu` x86_64 均可

- mysql
- redis
- elasticsearch
- Caddy2

### MRE

- mysql
- redis
- elasticsearch

可以使用我为大家准备的`docker compose`文件，一键运行上述 3 个服务

https://wwhb.lanzouw.com/iB1dS1gt9trc

```sh
sudo docker compose up -d
```

> docker 如何安装，请看本文附录

### Caddy2

介绍：Caddy2 是由 golang 开发的一款类似 nginx 的 http 服务器，我们使用它来作为后端程序的反向代理工具；

使用它最重要的原因是它可以自动为我们生成 tls 证书，让我们的网站挂上绿锁（https）

下载：

https://caddyserver.com/download

配置示例：

```txt
{
    email test@example.com
}

example.com www.example.com {
    reverse_proxy http://127.0.0.1:4677
}
```

将上述内容保存为`Caddyfile`

运行示例，假设：`Caddyfile`和`caddy`在同一目录：

```sh
chmod +x caddy # 首次执行，需要添加执行权限
./caddy run # 不知道配置文件有没有问题，可以先使用`run`，没有报错，则之后可以使用`start`后台运行（如下）
./caddy start # start 就是直接后台运行
```

## 程序运行

本程序本身，只有 2 个文件：

![](/images/reman/image.png)

一个程序本体，一个配置文件

### 配置文件

```yml
app:
  mode: debug # 程序运行的模式,  debug 或 release
  port: 4677 # 程序监听的端口
  license: your license code # 授权码
cors:
  allowCredentials: true
  allowOrigin: # 到时候需要在下面加上你的域名
    - http://localhost:*
    - http://127.0.0.1:*
  maxAge: 24h
db:
  database: go-re-man # 数据库名称
  dialect: mysql # 默认即可
  host: 127.0.0.1 # 数据库地址
  username: root # 数据库用户
  password: 123456 # 密码
  port: 3306 # 端口
  autoMigrate: true # 自动迁移，即自动建立数据库表，这个目前必须为true

es:
  enable: true # 目前必须为true
  address: http://127.0.0.1:9200 # elasticsearch的地址
  diskIndex: reman-disk-v1 # 索引名称，可改可不改

jwt:
  secret: secret # jwt签名密钥，必须修改
  expire: 24h # 过期时间，这里即表示，每24小时过期，即需要重新登录
  issuer: reman
log:
  format: text
  level: debug
  linkName: current.log
  path: ./logs
redis:
  addr: 127.0.0.1:6379 # redis数据库地址
  db: 0
  password: '' # 密码
```

需要配置的有：

`db`：即 mysql 数据库

`redis`：即 redis 数据库

`es`：即 elasticsaerch 全文检索数据库 7.x 版本，特别注意，es 分词器，我们使用的是`hao`：https://github.com/tenlee2012/elasticsearch-analysis-hao

还需要填写的是：`jwt.secret`，这个汲及到登录安全问题，在程序内部是强制要求修改的，15 位以上的随机字符串

### 首次运行

一般，分发的程序名称类型类似：`reman_linux_amd64_v0.0.9`

所以需要先改名：

```sh
mv reman_linux_amd64_v0.0.9 reman
```

> 上面的`reman_linux_amd64_v0.0.9`是例子，不是每次都是 0.0.9，所以请根据实际来

运行程序，首先需要确保程序有执行权限：

```sh
chmod +x ./reman
```

运行（配置文件已修改完毕）：

```sh
./reman
```

但是上面这种运行是会随着 terminal 关闭而关闭的，所以一个最简单的办法是使用 `nohup`

```sh
nohup ./reman &
```

### 程序更新

程序更新需要先停掉之前的旧程序：

```sh
kill `pgrep reman` # 这一步是找到reman程序并kill掉，一般步骤可以是：`ps aux|grep reman` 找到pid，然后 `kill pid`
```

然后，按照首次运行程序时的命令：

```sh
mv reman_linux_amd64_v0.0.9 reman
chmod +x ./reman
nohup ./reman &
```

> 这种运行和更新程序的方法其实不太好，所以建议是使用`pm2`来管理和守护我们的程序
>
> 如何使用`pm2`请参考附录

## 附录

### Docker 安装

#### Centos

```sh
#!/bin/bash

sudo yum update

# 安装需要的依赖包
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加Docker软件源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装Docker
sudo yum install -y docker-ce docker-ce-cli containerd.io

# 启动Docker服务
sudo systemctl start docker

# 设置Docker服务开机自启
sudo systemctl enable docker

```

#### ubuntu

```sh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt install docker-ce

# 启动Docker服务
sudo systemctl start docker
# 设置Docker服务开机自启
sudo systemctl enable docker
```

### pm2 安装

`PM2`是一个`node.js`程序，这又增加了复杂度，所以将其添加到附录，有能力和兴趣的可以试一试；

你可以去：

https://nodejs.org/en/download

下载系统相应的版本；

> 不建议使用包管理安装，因为其安装的版本太过老旧；

---

nodejs 安装完毕后，会自带`npm`命令：

```sh
npm -v
```

使用 npm 安装 pm2：

```sh
npm i -g pm2
```

---

使用 pm2 运行程序：

```sh
pm2 start "./reman"
```

使用 pm2 重启程序（比如更新程序后，需要重启）：

```sh
pm2 restart id
```

\<id\>从`pm2 ls`命令中获取：

```sh
pm2 ls
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 3  │ go-mall-xxxxxxx    │ fork     │ 0    │ online    │ 0%       │ 17.0mb   │
│ 0  │ go-yyyyyyyyyy      │ fork     │ 53   │ online    │ 0%       │ 99.2mb   │
│ 1  │ go-xxxx            │ fork     │ 4    │ online    │ 0%       │ 12.8mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

---

设置 pm2 开机自启：

```sh
pm2 save # 保存现有pm2运行中的程序，以便在pm2开机自启后，能自动运行我们自己的程序
pm2 startup
```
