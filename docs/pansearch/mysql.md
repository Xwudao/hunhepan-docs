# Docker 安装 MySQL 5.7 完整指南

## 概述

MySQL 5.7 是一个稳定且广泛使用的数据库版本，通过 Docker 容器化部署可以简化安装过程，提高环境一致性。本文将详细介绍如何使用 Docker 安装和配置 MySQL 5.7，并提供重要的注意事项。

## 前置条件

在开始之前，请确保系统已满足以下条件：

- 已安装 Docker Engine（推荐版本 20.10 或更高）
- 具有足够的磁盘空间（至少 2GB 可用空间）
- 具有管理员权限或 sudo 权限
- 网络连接正常，能够访问 Docker Hub

## 安装步骤

### 第一步：拉取 MySQL 5.7 镜像

```bash
docker pull mysql:5.7
```

验证镜像是否成功下载：

```bash
docker images | grep mysql
```

### 第二步：创建数据目录（可选但推荐）

为了数据持久化，建议在宿主机上创建专门的数据目录：

```bash
# 创建数据目录
sudo mkdir -p /opt/mysql/data
sudo mkdir -p /opt/mysql/conf
sudo mkdir -p /opt/mysql/logs

# 设置目录权限
sudo chown -R 999:999 /opt/mysql/data
sudo chown -R 999:999 /opt/mysql/logs
```

### 第三步：运行 MySQL 容器

#### 基础运行命令

```bash
docker run -d \
  --name mysql57 \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=your_strong_password \
  mysql:5.7
```

#### 完整配置运行命令（推荐）

```bash
docker run -d \
  --name mysql57 \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=your_strong_password \
  -e MYSQL_DATABASE=myapp \
  -e MYSQL_USER=appuser \
  -e MYSQL_PASSWORD=app_password \
  -v /opt/mysql/data:/var/lib/mysql \
  -v /opt/mysql/conf:/etc/mysql/conf.d \
  -v /opt/mysql/logs:/var/log/mysql \
  --restart=unless-stopped \
  mysql:5.7
```

### 第四步：验证安装

检查容器运行状态：

```bash
docker ps | grep mysql57
```

查看容器日志：

```bash
docker logs mysql57
```

连接到 MySQL：

```bash
docker exec -it mysql57 mysql -uroot -p
```

## 配置优化

### 自定义配置文件

在 `/opt/mysql/conf` 目录下创建 `my.cnf` 文件：

```ini
[mysqld]
# 基本配置
port = 3306
bind-address = 0.0.0.0
default-storage-engine = InnoDB

# 字符集配置
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init-connect = 'SET NAMES utf8mb4'

# 性能优化
innodb_buffer_pool_size = 256M
innodb_log_file_size = 64M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# 连接配置
max_connections = 200
max_connect_errors = 1000
wait_timeout = 28800

# 日志配置
log-error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2

[mysql]
default-character-set = utf8mb4

[client]
default-character-set = utf8mb4
```

重启容器以应用配置：

```bash
docker restart mysql57
```

## 重要注意事项

### 安全注意事项

1. **密码安全**
   - 务必使用强密码，包含大小写字母、数字和特殊字符
   - 避免在命令行中直接暴露密码，考虑使用环境变量文件
   - 定期更换密码

2. **网络安全**
   - 生产环境中避免将 MySQL 端口直接暴露到公网
   - 使用 Docker 网络隔离数据库容器
   - 配置防火墙规则限制访问

3. **用户权限**
   - 不要在应用中使用 root 账户
   - 为不同应用创建专门的数据库用户
   - 遵循最小权限原则

### 数据持久化注意事项

1. **数据卷挂载**
   - 务必使用数据卷或绑定挂载来持久化数据
   - 确保宿主机目录有足够的磁盘空间
   - 定期备份数据目录

2. **目录权限**
   - 确保挂载目录的权限正确设置
   - MySQL 容器内使用的用户 ID 是 999

### 性能注意事项

1. **资源限制**

   ```bash
   docker run -d \
     --name mysql57 \
     --memory=1g \
     --cpus=1 \
     # ... 其他参数
     mysql:5.7
   ```

2. **监控和维护**
   - 定期监控容器资源使用情况
   - 监控 MySQL 慢查询日志
   - 定期优化数据库表

### 版本兼容性注意事项

1. **MySQL 5.7 特性**
   - 支持 JSON 数据类型
   - 改进的性能模式
   - 增强的复制功能

2. **弃用警告**
   - MySQL 5.7 已进入扩展支持阶段
   - 考虑未来迁移到 MySQL 8.0 的计划

## 常用管理命令

### 备份和恢复

备份数据库：

```bash
docker exec mysql57 sh -c 'mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" --all-databases' > backup.sql
```

恢复数据库：

```bash
docker exec -i mysql57 sh -c 'mysql -u root -p"$MYSQL_ROOT_PASSWORD"' < backup.sql
```

### 容器管理

停止容器：

```bash
docker stop mysql57
```

启动容器：

```bash
docker start mysql57
```

删除容器：

```bash
docker rm mysql57
```

## 故障排除

### 常见问题

1. **容器启动失败**
   - 检查端口是否被占用
   - 确认数据目录权限
   - 查看容器日志获取详细错误信息

2. **连接被拒绝**
   - 确认容器正在运行
   - 检查端口映射配置
   - 验证防火墙设置

3. **性能问题**
   - 检查系统资源使用情况
   - 优化 MySQL 配置参数
   - 分析慢查询日志

## 结论

通过 Docker 部署 MySQL 5.7 是一个高效且可重复的解决方案。遵循本文提供的步骤和注意事项，可以确保数据库的安全性、性能和可靠性。在生产环境中部署时，特别要注意安全配置和数据备份策略。

定期维护和监控是确保数据库长期稳定运行的关键。随着 MySQL 8.0 的成熟，也建议制定相应的升级计划以获得更好的性能和功能支持。
