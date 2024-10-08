---
outline: deep
title: ReMan 网盘搜索引擎程序源码
keywords: ['ReMan', '网盘搜索引擎源码', '网盘资源管理', '搭建阿里云盘搜索']
---

# ReMan 网盘搜索引擎程序

`ReMan`是一款拥有后台的个人网盘资源管理程序；

**可以帮你管理、搜索自己的网盘资源；**

特点：

- 完善的后台管理，可以管理资源、分类、用户、卡密等
- 支持手机端和电脑端（前台）
- 程序本身只有两个文件：config.yml 和 reman（**二进制文件，没有源码**）

特色功能：

- 支持设置分类，可以按分类展示资源列表
- 支持设置资源是自己的，这将在搜索结果中排在前面（有助于网盘拉新）
- 提供热词、热门资源记录，可以在后台查看搜索热词
- **2024/05/12：添加用户系统+卡密系统** => [介绍](/reman/vip-coin)
- **2024/08/14：添加支付模块和商品模块** => [介绍](/reman/pay)

更多功能，在下面的演示环境中体验吧！

::: details 点击查演示环境
<https://reman.xwd.pw>

后台登录：<https://reman.xwd.pw/login>

用户名： admin

密码： l2LMZ$WsNuw$2S
:::

盈利方向：

- 提供用户+会员体系，可以卖注册邀请码或者 VIP 会员码；
- 网盘拉新，现在夸克、阿里、百度、迅雷网盘都有提供拉新奖励，ReMan 支持将资源设置为自己的，这样就可以在搜索结果中排在前面，有助于拉新；

## 购买

<!-- ￥ 999 / 套， -->

程序永久使用，并**包 1 年更新**，<!-- 进内部群，和其他人交流， -->可以帮忙安装（服务器、域名提前解析好）

**同**服务器**不限**建站数量，不同服务器也提供增值帮助，参考：[运行多个网站](/reman/multiple)

:::details 授权宽松
我们只会在程序启动时，验证授权码及是否是正版用户。

对于授权更是无比宽松，我们不会限制同服务器的建站数量，更不会限制域名数量。

只限制服务器IP，且服务器IP可以自助在线更改10次。
:::

购买请加微信：apkapb 备注：reman

## ReMan-Lite

在2024国庆期间，我们推出了`ReMan-Lite`，这是一个更加轻量级的程序，当然功能也相对较少，但是对于一些要求不高的用户来说，这是一个不错的选择；

<!--@include: @/components/compare-reman.md-->

<!-- ::: details 请注意
原则上不建议啥都不懂的人购买，最起码买服务器、域名，解析域名到服务器要会；

我们提供的服务是：程序主体、程序的安装与调试（可帮忙）、1年的程序免费更新；

当调试完毕，程序正常运行后，代表交易已经完成，之后有其它**非程序本身问题**，我们帮忙是情分，不帮是本分；
::: -->

<!-- ::: details 特别注意（小白、事多请注意）
原则上不建议啥都不懂的人购买，最最起码买服务器、域名，解析域名到服务器要会；

不然到时候，什么都要问我 ，但本人不是一个有耐心的人，所以为了避免双方浪费时间、搞得互相都心情不好，请三思而后行；

毕竟，几百块钱，在如今时代，一个好点的羽绒服都要 500+，499 真当不了上帝；

**话有点难听，但为了大家都好，还是需要提前说明**
::: -->

<!-- ---

加 ￥ 150 送爬虫一只

相应介绍：[点击前往](./crawl.md) -->

## 客户网站展示

- <https://alipanx.com>
- <https://qkpanso.com> 👍
- <https://www.lzpanx.com>
- <https://so.yuneu.com>
- <http://51panso.cn>
- <https://www.duanjuso.com> 👍
- <https://www.kuufuu.com>

(想要添加进来列表，请联系我)

## 推荐的服务器

推荐雨云香港服务器，[https://www.rainyun.com](https://www.rainyun.com/Mzc4MDI=_)

最低配置：2c4g

系统建议：Ubuntu 22.04

<!-- 大陆服务器需要备案，这是常识，不多说；**建议的是香港服务器**

然后首推的是阿里、腾讯香港轻量服务器，价格便宜，性能也不错；（最近腾讯好像没有 2c4g 这种配置了，所以可以阿里云购买）

---

如果，你不想用大厂的服务器，可以雨云，这是一家小众的云服务商，价格也还能接受，主要是查 IP，不会有`[中国香港香港 阿里云]`这种

**当然，稳定性肯定是不如大厂的，这点要知道**

雨云地址：[https://www.rainyun.com](https://www.rainyun.com/Mzc4MDI=_) -->

:::warning 注意
购买厂商的轻量服务器时，务必选择**系统镜像**（也推荐是 Ubuntu 22.04），不要选择应用镜像，因为应用镜像会有一些预装的软件，可能会影响程序的安装。

能选择纯净的镜像，我们就尽量纯净一点，不要有多余的东西
:::

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

<https://wwhb.lanzouw.com/iB1dS1gt9trc>

```sh
sudo docker compose up -d
```

> docker 如何安装，请看本文附录

### Caddy2

介绍：Caddy2 是由 golang 开发的一款类似 nginx 的 http 服务器，我们使用它来作为后端程序的反向代理工具；

使用它最重要的原因是它可以自动为我们生成 tls 证书，让我们的网站挂上绿锁（https）

下载：

<https://caddyserver.com/download>

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

`es`：即 elasticsaerch 全文检索数据库 7.x 版本，特别注意，es 分词器，我们使用的是`hao`：<https://github.com/tenlee2012/elasticsearch-analysis-hao>

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

## 激励/推广

目前，只要是买了 `ReMan` 的用户，都可以参加推广活动：

- 卖 0-5 套：给 20% 比例
- 卖 5-20 套：给 30% 比例
- 卖 20-N 套：给 40% 比例

注：比例是按用户最终购买价格按比例反拥，因为可能由于活动或优惠，用户最终支付的金额非标准金额；

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

<https://nodejs.org/en/download>

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
