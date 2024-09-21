---
outline: deep
title: 安装ReMan-Lite
---


# 安装 ReMan-Lite

## 准备工作


1. 下载最新的 ReMan-Lite 主体程序：https://github.com/Xwudao/pan/releases
2. 下载环境依赖包（docker-compose）：https://wwhb.lanzn.com/iR4g32aj1brg



## 服务器

推荐雨云香港服务器，[https://www.rainyun.com](https://www.rainyun.com/Mzc4MDI=_)

最低配置：2c4g

系统建议：Ubuntu 22.04


## 安装依赖环境

本文将使用 Docker 来安装 MySQL 和 Redis，如果你已经有了 MySQL 和 Redis，可以跳过这一步。

如果你使用了 宝塔 之类的面板，可以直接在面板中安装 MySQL 和 Redis。请注意，MySQL 的版本需要在 5.7 以上，Redis 的版本需要在 6 以上。


::: details 简单的列举ubuntu安装docker的命令

```bash
sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt install docker-ce

sudo systemctl restart docker
sudo systemctl enable docker
```

:::

**使用 Docker 安装 Mysql 和 Redis**

解压上面的依赖包，修改`docker-compose.yml` 里面的 MySQL 的密码和用户名，

::: details docker-compose.yml
```yml {9,11}
version: '3'

services:
  mysql:
    container_name: mysql
    network_mode: 'bridge'
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: '4TFu32eLZk5ODrRy'
      MYSQL_USER: 'reman'
      MYSQL_PASS: 'Oo4FfWX3dm80D7bK'
      MYSQL_DATABASE: 'reman'
    image: 'mysql:5.7.31'
    restart: always
```
:::

并在同`docker-compose.yml`同级目录，建立 `./init/init.sql` 目录和文件，内容如下：

```sql
use reman;
GRANT ALL PRIVILEGES ON *.* TO 'reman'@'%' IDENTIFIED BY 'Oo4FfWX3dm80D7bK' WITH GRANT OPTION;
flush privileges;
```

> 注意：`init.sql` 文件中的密码(`Oo4FfWX3dm80D7bK`)和用户名需要和 `docker-compose.yml` 中的一致。

然后执行：

```bash
sudo docker compose up -d
```

即可使用 docker 同时安装 MySQL 、Redis 和 Elasticsearch。

---

`docker-compose.yml` 和 `init/init.sql` 文件目录结构如下：

```txt
├── docker-compose.yml
├── init
│   └── init.sql
```


## 修改程序配置文件


::: details config.yml
```yml
app:
  mode: release
  port: 4343
  meta: reman

cors:
  allowCredentials: true
  allowOrigin:
    - http://localhost:*
    - http://127.0.0.1:*
  maxAge: 24h

db:
  database: go-reman-free
  dialect: mysql
  host: 127.0.0.1
  username: root
  password: 123456
  port: 3306
  autoMigrate: true

es:
  enable: true
  address: http://127.0.0.1:9200
  diskIndex: reman-free
  debug: false

jwt:
  secret: W4LmAMPzesQQs571tDuRarmsQPy64cYTg
  expire: 24h
  issuer: reman
log:
  format: text
  level: info
  linkName: current.log
  path: ./logs

redis:
  addr: 127.0.0.1:6379
  db: 0
  password: ""

```


:::


实际上，只需要修改 `db.password` 、 `jwt.secret` 及 `cors.allowOrigin` 部分即可，其余部分可以不用修改，或等你熟悉了之后再修改。

- `db.password`：只需要和上面`docker-compose.yml`中的 MySQL 密码一致即可。
- `cors.allowOrigin` 需要修改为你的域名：
  ```yml
  cors:
    allowCredentials: true
    allowOrigin:
      - http://localhost:*
      - http://127.0.0.1:*
      - https://yourdomain.com
      - https://www.yourdomain.com
    maxAge: 24h
  ```


## 运行程序


**手动运行**

在 `reman` 主体程序所在目录执行：

```bash
./reman
```

之所以需要手动运行一遍，是需要找到输出的默认管理员账号和密码；

上述命令会输出管理员账号和密码，类似：

```txt
system-init-biz Admin user created, username: admin, password: 0aGW2V0uERRB
```

，然后 ctrl+c 退出。下面将使用`pm2`来运行程序。

---

**基于 pm2**

安装`pm2`需要先安装`nodejs`，然后执行在 `reman` 主体程序所在目录执行：

```bash
pm2 start reman

pm2 save # 保存当前进程
pm2 startup # 生成开机启动命令，这样程序就会在开机时自动启动
```

安装`pm2`参考：[/reman/pm2](/reman/pm2)



## 配置反向代理

**nginx**或者**caddy**都可以，推荐新手使用**caddy**。

程序默认配置中，监听的端口是`4343`，而用户是不能直接访问这个端口的，所以需要配置反向代理以便用户可以通过`80`、`443`端口及域名进行访问。

Caddyfile 配置如下：

::: details Caddyfile
```txt
{
    email admin@yourdomain.com
}

www.yourdomain.com {
    reverse_proxy http://127.0.0.1:4343
}

yourdomain.com {
    redir https://www.yourdomain.com 301
}
```
:::


解释：上述内容保存为 `Caddyfile`，然后执行 `caddy run` 即可。

`caddy`和`Caddyfile`文件在同一目录下。

运行：

```bash
caddy run
```


::: details 更进一步

通过`caddy run`命令运行`caddy`，只是临时运行，如果需要开机自启动，可以使用`systemd`。

命令参考：

```bash
sudo groupadd --system caddy

sudo useradd --system \
    --gid caddy \
    --create-home \
    --home-dir /var/lib/caddy \
    --shell /usr/sbin/nologin \
    --comment "Caddy web server" \
    caddy


# 下面这一步是将当前目录下的 `caddy_linux_amd64` 文件移动到`/usr/local/sbin/caddy`
mv caddy_linux_amd64 /usr/local/sbin/caddy
chmod +x /usr/local/sbin/caddy
mkdir /etc/caddy
touch /etc/caddy/Caddyfile


cd /etc/systemd/system
vim caddy.service
```

caddy.service 文件内容如下：

```ini
[Unit]
Description=Caddy
Documentation=https://caddyserver.com/docs/
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=notify
User=caddy
Group=caddy
ExecStart=/usr/local/sbin/caddy run --environ --config /etc/caddy/Caddyfile
ExecReload=/usr/local/sbin/caddy reload --config /etc/caddy/Caddyfile --force
TimeoutStopSec=5s
LimitNOFILE=1048576
LimitNPROC=512
PrivateTmp=true
ProtectSystem=full
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
```

然后执行：

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now caddy
```

:::



## 更新程序

之后更新程序，请在 Github 下载：https://github.com/Xwudao/pan ，里面有程序本体和配置文件，一般而言不需要管配置文件，只需要将程序本体替换即可。

> 一般而言，程序名是`reman_xxx`，你需要先重命名为`reman`，然后替换原有的`reman`。

然后执行：

```bash
pm2 restart reman
```

即可。
