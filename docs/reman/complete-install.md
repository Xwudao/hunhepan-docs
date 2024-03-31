---
outline: deep
title: 从零开始完整安装ReMan
---

# 从零开始完整安装 ReMan

我尝试在这篇文章里面，从零开始，完整的安装 ReMan，将需要注意的地方都写出来，希望能帮助到你。

## 准备工作

### 下载组件包

下载组件包：https://wwhb.lanzouw.com/iB1dS1gt9trc

下载后解压，里面包含了以下文件：

- docker-compose.yml
- redis.conf
- elasticsearch.yml
- plugins/

通过 `docker-compose.yml` 我们可以一键运行 mysql, redis, elasticsearch。

通过 `redis.conf` 和 `elasticsearch.yml` 我们可以配置 redis 和 elasticsearch。
但是这两个文件可以保持默认，不需要修改。

需要修改的是，`docker-compose.yml` 文件中的 `MYSQL_ROOT_PASSWORD` 和 `MYSQL_PASS` 和 `MYSQL_USER`，这两 3 个参数，分别是 mysql 的 root 密码、普通用户密码和用户名。

```yml {5-7}
services:
  mysql:
    network_mode: 'bridge'
    environment:
      MYSQL_ROOT_PASSWORD: '123456'
      MYSQL_USER: 'tim'
      MYSQL_PASS: '123456'
```

> 普通用户其实没用，但也需要修改，待会我们会通过 root 用户专门来新建 reman 的数据库和用户。

### 安装 docker

请参考 [/reman/docker](/reman/docker) 安装 docker。

安装成功后，可以通过以下 2 个命令查看版本：

```sh
docker -v

docker compose version
```

这两个命令都能查看版本，如果有输出，说明安装成功。

:::details 输出参考
![docker version](/images/complete-install/image-7.png)
:::

## 运行组件

docker 安装完成后，将组件包解压到一个目录，然后进入该目录，运行以下命令：

**为了统一文档，建议是解压到`/root/env`**

```sh
sudo docker compose up -d
```

:::details 输出参考
docker 正在拉取镜像:

![docker正在拉取镜像](/images/complete-install/image.png)

拉取完毕，启动了：
![拉取完毕，启动了](/images/complete-install/image-1.png)
:::

创建数据库和用户：

首先找到 mysql 的容器 id：

```sh
sudo docker ps
```

:::details 输出参考
这就是容器 ID:

![这就是容器ID](/images/complete-install/image-2.png)
:::

然后进入 mysql 容器：

```sh
sudo docker exec -it 3b19cc6bab5a bash
# 这里的 3b19cc6bab5a 是你的容器ID
```

进入容器后，登录 mysql：

```sh
mysql -u root -p
```

输入 ROOT 密码（密码是你之前修改了`docker-compose.yml`文件里面，自己设置的），然后创建数据库和用户：

```sql
CREATE DATABASE `reman` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';

CREATE USER `reman`@`%` IDENTIFIED BY '[password]';

GRANT Alter, Alter Routine, Create, Create Routine, Create Temporary Tables, Create View, Delete, Drop, Event, Execute, Grant Option, Index, Insert, Lock Tables, References, Select, Show View, Trigger, Update ON `reman`.* TO `reman`@`%`;
```

> 这里的 `[password]` 是你自己设置的密码，记得替换。
>
> 上面会创建一个名为 `reman` 的数据库，和一个名为 `reman` 的用户，密码是你自己设置的。

:::details 输出参考
进入 mysql 容器，并输入 root 密码:

![进入mysql容器，并输入root密码](/images/complete-install/image-3.png)

执行 sql 语句:

![执行sql语句](/images/complete-install/image-4.png)
:::

**至此，数据库和用户创建完成。**

## 安装 ReMan

ReMan 我会给你发一个压缩包，解压后里面有一个 `reman`、一个 `config.yml` 文件，将这个文件夹放到你的服务器上，然后进入该文件夹。

> 如果你解压后，发现是 `reman-xxxxx`，请将 `reman-xxxxx` 改名为 `reman`即可。

**为了统一文档，建议是解压到`/root/app`**

### 修改配置文件

修改 `config.yml` 文件，将里面的 `mysql`、`redis`、`elasticsearch` 的配置修改为你的配置。

app项：
```yml
app:
  mode: release
  port: 4677
  license: your license code
```

修改, license 为你的授权码。

---

cors项：
```yml
cors:
  allowCredentials: true
  allowOrigin:
    - http://localhost:*
    - http://127.0.0.1:*
    - https?://.+example.com
  maxAge: 24h
```

在 `allowOrigin` 中，添加你的域名，如：`https?://.+example.com`。

---

mysql项：

```yml
db:
  database: go-re-man
  dialect: mysql
  host: 192.168.1.21
  username: root
  password: 123456
  port: 3306
  autoMigrate: true
```

修改 `host`、`username`、`password` 为你的 mysql 配置。

一般为：

```yml
db:
  database: reman
  dialect: mysql
  host: 127.0.0.1
  username: reman
  password: 这里填写你的密码，在上面创建用户时设置的密码，不是root密码
  port: 3306
  autoMigrate: true
```

---

Es项：

```yml
es:
  enable: true
  address: http://127.0.0.1:9200
  diskIndex: reman-disk-v1
```

修改 `address` 为你的 elasticsearch 配置，一般修改地址为 `http://127.0.0.1:9200`即可，因为我们是在同一台服务器上。

---

jwt项：

```yml
jwt:
  secret: secret
  expire: 24h
  issuer: reman
```

修改 `secret` 为你的 jwt 密钥，`expire` 为过期时间，`issuer` 为签发者。

> 你需要将secret和修改为不少于32位的随机字符串。
>
> 不然你将得到如下错误：panic: jwt.secret must be configured and the length is greater than 10

---

redis项：

```yml
redis:
  addr: 127.0.0.1:6379
  db: 0
  password: ""
```

因为我们是在同一台服务器上，所以只需要将addr改为 `127.0.0.1:6379`即可。

### 第一次运行

运行：

```sh
chmod +x reman
./reman
```

> 这只是暂时运行，后面我们会使用 `pm2` 来管理。

:::details 输出参考
首次成功运行参考：

![首次成功运行参考](/images/complete-install/image-5.png)
:::

你需要找到类似这个输出：

`Admin user created, username: admin, password: r1a8O8H7`

这个是你的管理员账号和密码，后面在ReMan后台我们会使用这个账号登录。

然后，按 `Ctrl + C` 退出。

## 使用 pm2 管理

安装 pm2 参考：[/reman/pm2](/reman/pm2)

安装成功后，运行：

```sh
pm2 start reman
```

然后运行：

```sh
pm2 save
```

这样，ReMan 就会在后台运行了。

查询状态：

```sh
pm2 ls
```

:::details 输出参考
![pm2 ls](/images/complete-install/image-6.png)
:::


## Caddy/Nginx

经过上面的步骤，ReMan 已经可以正常运行了，但是它是运行在本地的 4677端口，所以我们还需要一个反向代理，比如 Caddy 或者 Nginx。

对于小白，我推荐使用 Caddy，因为它配置简单，而且自带 HTTPS。


请参考：[/reman/caddy](/reman/caddy) 安装 Caddy