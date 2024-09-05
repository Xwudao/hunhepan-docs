---
outline: deep
draft: true
---

# 从零开始搭建 V2FD 网址导航网站

所需环境：

- MySQL 5.7+
- Redis 6+

除了之外，V2FD 不需要任何其他依赖。

---

V2FD 主体包含：

- web/
- v2fd
- config.yml

上述`web/`目录是用户端前端界面代码，`v2fd`是主体程序，`config.yml`是配置文件。

## 安装依赖环境

本文将使用 Docker 来安装 MySQL 和 Redis，如果你已经有了 MySQL 和 Redis，可以跳过这一步。

如果你使用了 宝塔 之类的面板，可以直接在面板中安装 MySQL 和 Redis。请注意，MySQL 的版本需要在 5.7 以上，Redis 的版本需要在 6 以上。

**使用 Docker 安装 Mysql 和 Redis**

```yml {9,11}
version: '3'

services:
  mysql:
    container_name: mysqltest
    network_mode: 'bridge'
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: '4TFu32eLZk5ODrRy'
      MYSQL_USER: 'v2fd'
      MYSQL_PASS: 'Oo4FfWX3dm80D7bK'
      MYSQL_DATABASE: 'v2fd'
    image: 'mysql:5.7.31'
    restart: always
    volumes:
      - './mysql-data:/var/lib/mysql'
      - './mysql-conf/my.cnf:/etc/my.cnf'
      - './init/:/docker-entrypoint-initdb.d/'
    ports:
      - '3307:3306'
    command: --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
  redis:
    image: redis:6.2.6-alpine
    container_name: redistest
    restart: always
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - ./redis-data:/data
      - ./redis.conf:/etc/redis/redis.conf
    ports:
      - '6380:6379'
    sysctls:
      - net.core.somaxconn=1024
    command: /bin/sh -c "echo 'vm.overcommit_memory = 1' >> /etc/sysctl.conf && redis-server /etc/redis/redis.conf --appendonly yes"
```

将上面的内容保存为 `docker-compose.yml`，修改 MySQL 的密码和用户名，

并在同`docker-compose.yml`同级目录，建立 `./init/init.sql` 目录和文件，内容如下：

```sql
use v2fd;
GRANT ALL PRIVILEGES ON *.* TO 'v2fd'@'%' IDENTIFIED BY 'Oo4FfWX3dm80D7bK' WITH GRANT OPTION;
flush privileges;
```

> 注意：`init.sql` 文件中的密码(`Oo4FfWX3dm80D7bK`)和用户名需要和 `docker-compose.yml` 中的一致。

然后执行：

```bash
sudo docker compose up -d
```

即可使用 docker 同时 MySQL 和 Redis。

---

`docker-compose.yml` 和 `init/init.sql` 文件目录结构如下：

```txt
├── docker-compose.yml
├── init
│   └── init.sql
```

## 修改程序配置文件

`config.yml` 是程序的配置文件，程序启动时会读取这个文件，所以需要修改这个文件。

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
  username: v2fd
  password: Oo4FfWX3dm80D7bK
  port: 3306
  autoMigrate: true

jwt:
  secret: randomstr of 32 bits or more
  expire: 300h
  issuer: v2fd

log:
  format: text
  level: info
  linkName: current.log
  path: ./logs

redis:
  addr: 127.0.0.1:6379
  db: 0
  password: ''
```

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

在 `v2fd` 主体程序所在目录执行：

```bash
./v2fd
```

之所以需要手动运行一遍，是需要找到输出的默认管理员账号和密码；

上述命令会输出管理员账号和密码，类似：

```txt
system-init-biz Admin user created, username: admin, password: 0aGW2V0uERRB
```

，然后 ctrl+c 退出。下面将使用`pm2`来运行程序。

---

**基于 pm2**

安装`pm2`需要先安装`nodejs`，然后执行在 `v2fd` 主体程序所在目录执行：

```bash
pm2 start v2fd

pm2 save # 保存当前进程
pm2 startup # 生成开机启动命令，这样程序就会在开机时自动启动
```

安装`pm2`参考：[/reman/pm2](/reman/pm2)

## 配置反向代理

**nginx**或者**caddy**都可以，推荐新手使用**caddy**。

程序默认配置中，监听的端口是`2476`，而用户是不能直接访问这个端口的，所以需要配置反向代理以便用户可以通过`80`、`443`端口及域名进行访问。

Caddyfile 配置如下：

```txt
{
    email admin@yourdomain.com
}

www.yourdomain.com {
    reverse_proxy http://127.0.0.1:2476
}

yourdomain.com {
    redir https://www.yourdomain.com 301
}
```

解释：上述内容保存为 `Caddyfile`，然后执行 `caddy run` 即可。

`caddy`和`Caddyfile`文件在同一目录下。

## 更新程序

之后更新程序，请在 Github 下载：https://github.com/Xwudao/v2fd-release ，里面有程序本体和配置文件，一般而言不需要管配置文件，只需要将程序本体替换即可。

> 一般而言，程序名是`v2fd_xxx`，你需要先重命名为`v2fd`，然后替换原有的`v2fd`。

然后执行：

```bash
pm2 restart v2fd
```

即可。
