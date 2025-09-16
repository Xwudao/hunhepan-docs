---
outline: deep
---

# 从零开始完整安装 ReMan

本文将详细介绍如何从零开始完整安装 ReMan，包含所有关键配置和注意事项。

📺 **视频教程**：<https://www.bilibili.com/video/BV1iR2NYeE51/>

## 系统要求

- **最低配置**：2核4G内存
- **推荐系统**：Ubuntu 22.04
- **必需组件**：Docker、Docker Compose

## 第一步：准备组件包

### 下载必需文件

📥 **组件包下载**：<https://wwhb.lanzn.com/iLyLF2qj0adg>

解压后包含以下文件：

- `docker-compose.yml` - 一键部署配置文件
- `redis.conf` - Redis配置文件
- `elasticsearch.yml` - Elasticsearch配置文件
- `plugins/` - Elasticsearch插件目录

### 配置数据库密码

编辑 `docker-compose.yml`，修改MySQL相关配置：

```yml {5-7}
services:
  mysql:
    network_mode: 'bridge'
    environment:
      MYSQL_ROOT_PASSWORD: '123456'  # 设置MySQL root密码
      MYSQL_USER: 'tim'              # 普通用户名
      MYSQL_PASS: '123456'           # 普通用户密码
```

> ⚠️ **重要**：请将密码修改为强密码，确保系统安全性

## 第二步：安装Docker环境

### 安装Docker

详细安装步骤请参考：[Docker安装指南](/reman/docker)

### 验证安装

执行以下命令验证安装成功：

```sh
docker -v
docker compose version
```

:::details 正确输出示例
![docker version](/images/complete-install/image-7.png)
:::

## 第三步：部署基础服务

### 启动服务容器

将组件包解压到 `/root/env` 目录（推荐路径），然后执行：

```sh
cd /root/env
sudo docker compose up -d
```

:::details 部署过程参考
Docker拉取镜像中：
![docker正在拉取镜像](/images/complete-install/image.png)

部署完成：
![拉取完毕，启动了](/images/complete-install/image-1.png)
:::

### 配置MySQL数据库

#### 1. 进入MySQL容器

```sh
# 查看容器状态
sudo docker ps

# 进入MySQL容器（替换为实际容器ID）
sudo docker exec -it <容器ID> bash
```

:::details 容器ID查看示例
![这就是容器ID](/images/complete-install/image-2.png)
:::

#### 2. 创建数据库和用户

```sh
# 登录MySQL
mysql -u root -p
```

执行以下SQL语句：

```sql
-- 创建数据库
CREATE DATABASE `reman` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';

-- 创建用户（替换[password]为实际密码）
CREATE USER `reman`@`%` IDENTIFIED BY '[password]';

-- 授权
GRANT Alter, Alter Routine, Create, Create Routine, Create Temporary Tables, Create View, Delete, Drop, Event, Execute, Grant Option, Index, Insert, Lock Tables, References, Select, Show View, Trigger, Update ON `reman`.* TO `reman`@`%`;
```

> 📝 **注意**：请将 `[password]` 替换为强密码并妥善保管

:::details SQL执行参考
![执行sql语句](/images/complete-install/image-4.png)
:::

## 第四步：安装ReMan程序

### 上传程序文件

将ReMan压缩包解压到 `/root/app` 目录：

- 确保目录包含 `reman` 可执行文件
- 确保包含 `config.yml` 配置文件

> 💡 **提示**：如解压后目录名为 `reman-xxxxx`，请重命名为 `reman`

### 配置文件详解

编辑 `config.yml` 文件，逐项配置：

#### 应用基础配置

```yml
app:
  mode: release
  port: 4677
  license: your_license_code  # 替换为你的授权码
```

#### 跨域配置

```yml
cors:
  allowCredentials: true
  allowOrigin:
    - http://localhost:*
    - http://127.0.0.1:*
    - https://yourdomain.com      # 替换为你的域名
    - https://www.yourdomain.com
    - http://yourdomain.com
    - http://www.yourdomain.com
  maxAge: 24h
```

#### 数据库配置

```yml
db:
  database: reman
  dialect: mysql
  host: 127.0.0.1
  username: reman
  password: 这里填写reman用户密码  # 注意：不是root密码
  port: 3306
  autoMigrate: true
```

#### Elasticsearch配置

```yml
es:
  enable: true
  address: http://127.0.0.1:9200
  diskIndex: reman-disk-v1
```

#### JWT配置

```yml
jwt:
  secret: 至少32位的随机字符串  # 重要：必须修改
  expire: 24h
  issuer: reman
```

> ⚠️ **安全警告**：JWT密钥长度必须大于32位，否则程序无法启动

#### Redis配置

```yml
redis:
  addr: 127.0.0.1:6379
  db: 0
  password: ''
```

### 首次启动

```sh
cd /root/app
chmod +x reman
./reman
```

:::details 启动成功示例
![首次成功运行参考](/images/complete-install/image-5.png)
:::

**重要**：记录输出中的管理员账号信息：

```
Admin user created, username: admin, password: r1a8O8H7
```

启动成功后按 `Ctrl + C` 退出。

## 第五步：进程管理

### 安装PM2

详细安装步骤：[PM2安装指南](/reman/pm2)

### 启动服务

```sh
cd /root/app

# 启动ReMan服务
pm2 start reman

# 保存进程列表
pm2 save

# 设置开机自启
pm2 startup
```

### 查看状态

```sh
pm2 ls
```

:::details PM2状态示例
![pm2 ls](/images/complete-install/image-6.png)
:::

## 第六步：配置反向代理

### 推荐使用Caddy

对于新手推荐使用Caddy，配置简单且自动HTTPS。

详细配置：[Caddy配置指南](/reman/caddy)

#### 快速配置步骤

1. **创建用户和目录**

```sh
sudo groupadd --system caddy
sudo useradd --system \
    --gid caddy \
    --create-home \
    --home-dir /var/lib/caddy \
    --shell /usr/sbin/nologin \
    --comment "Caddy web server" \
    caddy
```

2. **安装二进制文件**

```sh
# 移动Caddy二进制文件
mv caddy_linux_amd64 /usr/local/sbin/caddy
chmod +x /usr/local/sbin/caddy

# 创建配置目录
mkdir /etc/caddy
touch /etc/caddy/Caddyfile
```

3. **创建系统服务**

创建 `/etc/systemd/system/caddy.service`：

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

4. **配置Caddyfile**

编辑 `/etc/caddy/Caddyfile`：

```txt
{
    email your-email@example.com
}

yourdomain.com www.yourdomain.com {
    reverse_proxy http://127.0.0.1:4677
}
```

5. **启动服务**

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now caddy
```

## 维护和更新

### 程序更新

详细更新步骤：[更新指南](/reman/help-install#更新程序)

### 日常维护

- 定期检查服务状态：`pm2 ls`
- 查看日志：`pm2 logs reman`
- 重启服务：`pm2 restart reman`

## 故障排除

### 常见问题

1. **数据库连接失败**：检查MySQL服务状态和用户权限
2. **端口占用**：使用 `netstat -tulpn | grep 4677` 检查端口
3. **权限问题**：确保文件具有执行权限

### 获取帮助

如遇到问题，请查看日志文件或联系技术支持。


### 文件参考

::: details caddy.service

```ini
[Unit]
Description=Caddy
Documentation=<https://caddyserver.com/docs/>
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

:::

::: details Caddyfile

以下内容保存在：`/etc/caddy/Caddyfile`

```txt
{
    email test@example.com
}

example.com www.example.com {
    reverse_proxy http://127.0.0.1:4677
}
```

:::

启动并开机自启：

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now caddy
```

## 程序更新

请参考：[/reman/help-install](/reman/help-install#更新程序)

<!-- @include: @/components/firewall.md -->
