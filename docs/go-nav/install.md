---
outline: deep
title: Go-Nav 安装部署
---

# Go-Nav 安装部署

Go-Nav 支持两种部署方式：

- **方式一：二进制文件**——自行安装 MySQL 和 Redis，下载对应平台的二进制直接运行
- **方式二：Docker Compose**——一条命令拉起全部服务（含 MySQL、Redis），最省事

---

## 方式一：二进制部署

### 1. 安装依赖

需要提前安装并启动：

- MySQL 5.7+（UTF8MB4 字符集）
- Redis 7+

MySQL 中手动创建数据库：

```sql
CREATE DATABASE `go-nav` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. 下载二进制

从 [GitHub Releases](https://github.com/Xwudao/go-nav/releases) 下载对应平台的压缩包，解压后得到可执行文件（Linux 下通常命名为 `go-nav`）。

### 3. 编写配置文件

在二进制同目录下创建 `config.yml`：

```yml
app:
  mode: release
  port: 8799
  host: true          # 生产环境必须为 true

db:
  database: go-nav
  dialect: mysql
  host: 127.0.0.1
  port: 3306
  username: root
  password: your-mysql-password
  autoMigrate: true   # 首次启动自动建表

jwt:
  secret: your-long-random-secret   # 至少 12 位，用于登录态签名
  expire: 24h
  issuer: neter

redis:
  addr: 127.0.0.1:6379
  password: ''
  db: 0
  prefix: nav

log:
  level: info
  path: ./logs
```

所有配置项均可改用 `GONAV_*` 环境变量覆盖，规则是将路径中的 `.` 换为 `_` 并全部大写，例如：

```sh
GONAV_DB_PASSWORD=secret GONAV_JWT_SECRET=my-random-secret ./go-nav
```

### 4. 启动程序

```sh
chmod +x go-nav
./go-nav
```

首次启动时程序会自动建表，并创建管理员账号 `admin`，随机密码打印在日志里：

```text
Admin user created, username: admin, password: xxxxxxxx
```

### 5. 使用 PM2 管理进程（可选）

生产环境推荐用 PM2 守护进程，自动重启、日志管理均开箱即用。

**安装 Node.js 和 PM2**

先从 [nodejs.org](https://nodejs.org/zh-cn/download/prebuilt-binaries) 下载并安装对应平台的 Node.js，配置好环境变量后执行：

```sh
npm i -g pm2
```

**启动程序**

```sh
pm2 start "./go-nav"
```

**常用命令**

```sh
pm2 ls                  # 查看所有进程状态
pm2 logs go-nav         # 查看实时日志
pm2 restart go-nav      # 重启进程
pm2 stop go-nav         # 停止进程
```

**开机自启**

```sh
pm2 startup             # 生成并执行系统自启命令（按提示操作）
pm2 save                # 保存当前进程列表
```

---

## 方式二：Docker Compose 部署

这是最省事的方式，MySQL 和 Redis 会随 Go-Nav 一起启动，无需单独安装。

### 1. 创建 docker-compose.yml

::: tip
如需指定版本，将 `latest` 改为具体版本号，如 `misiai/go-nav:0.0.7`。
:::

```yml
services:
  app:
    image: misiai/go-nav:latest
    container_name: go-nav-app
    ports:
      - '8799:8799'
    environment:
      GONAV_APP_HOST: 'true'
      GONAV_JWT_SECRET: change-me-to-a-long-random-string   # 必改
      GONAV_DB_HOST: mysql
      GONAV_DB_PASSWORD: gonav_mysql_2024                   # 与下方 MySQL 密码保持一致
      GONAV_REDIS_ADDR: redis:6379
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads
      - app_data:/app/data
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped

  mysql:
    image: mysql:5.7
    container_name: go-nav-mysql
    environment:
      MYSQL_ROOT_PASSWORD: gonav_mysql_2024
      MYSQL_DATABASE: go-nav
    volumes:
      - mysql_data:/var/lib/mysql
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    healthcheck:
      test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost', '-u', 'root', '-pgonav_mysql_2024']
      interval: 5s
      timeout: 5s
      retries: 20
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: go-nav-redis
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 5s
      timeout: 5s
      retries: 10
    restart: unless-stopped

volumes:
  mysql_data:
  redis_data:
  app_data:
```

### 2. 必改项

| 环境变量 | 说明 |
|---|---|
| `GONAV_JWT_SECRET` | 登录态签名密钥，至少 12 位，不要使用默认值 |
| `GONAV_DB_PASSWORD` | MySQL 密码，需同时修改 `MYSQL_ROOT_PASSWORD` 保持一致 |

### 3. 启动服务

```sh
docker compose up -d
```

### 4. 查看初始管理员密码

```sh
docker logs go-nav-app | grep "Admin user"
```

输出类似：

```text
Admin user created, username: admin, password: xxxxxxxx
```

---

## 访问后台

启动成功后，浏览器访问：

```
http://你的服务器IP:8799
```

正式上线时建议在前面挂 Nginx 或 Caddy 做反向代理，绑定域名并启用 HTTPS。只需将 `8799` 端口反代出去，不要将 MySQL / Redis 暴露到公网。

---

## 常见问题

### 忘记初始管理员密码

```sh
# Docker 部署
docker logs go-nav-app | grep "Admin user"

# 二进制部署
grep "Admin user" logs/current.log
```

如果日志已清理，可在后台用现有管理员账号重置，或直接修改数据库中的密码字段。

### 后台无法访问

- 检查端口 `8799` 是否已放行（防火墙、安全组）
- Docker 部署检查容器状态：`docker ps`
- 检查反向代理是否正确指向 `8799` 端口

### 登录后功能异常

确认 `GONAV_APP_HOST`（或 `config.yml` 中的 `app.host`）已设为 `true`，该配置控制程序是否信任反向代理传入的 Host 头。

---

## 下一步

部署完成后，建议继续阅读：

- [后台功能说明](./admin)
- [站点配置说明](./site-config)
- [MCP Server](./api)