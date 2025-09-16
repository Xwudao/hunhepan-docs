---
outline: deep
---

# 宝塔面板安装ReMan指南

本文介绍如何通过宝塔面板安装ReMan。建议同时参考 [完整安装指南](/reman/complete-install) 获得更详细的技术细节。

📺 **视频教程**：<https://www.bilibili.com/video/BV1aE2AYHEuq/>

## 重要说明

:::warning 安装方式对比
我们**强烈推荐**使用干净环境和 `docker compose` 来部署所需服务。

如果坚持使用宝塔面板，请：

1. 仔细阅读所有ReMan文档
2. 理解技术原理后再操作
3. 具备基础的Linux和Docker知识
:::

### 安装架构差异

| 服务 | 推荐方式 | 宝塔方式 |
|------|----------|----------|
| MySQL | Docker Compose | 宝塔安装 |
| Redis | Docker Compose | 宝塔安装 |
| Elasticsearch | Docker Compose | Docker安装（宝塔版本不兼容） |
| ReMan | 二进制部署 | 二进制部署 |

### 目录结构说明

```txt
/root/                    # 家目录（root用户）
├── env/                  # 第三方服务配置
└── app/                  # ReMan程序目录
    ├── reman            # 可执行文件
    └── config.yml       # 配置文件
```

> 💡 **提示**：`~` 符号代表家目录，root用户为 `/root`，普通用户为 `/home/用户名`

## 系统要求

- **最低配置**：2核4G内存
- **推荐系统**：Ubuntu 22.04
- **推荐服务器**：雨云香港服务器 -> [https://www.rainyun.com](https://www.rainyun.com/Mzc4MDI=_)

## 准备资源

### 下载必需文件

1. **组件包**：<https://wwhb.lanzn.com/iLyLF2qj0adg>
2. **ReMan程序**：<https://github.com/Xwudao/reman-release>

## 第一步：安装宝塔面板

### 安装命令

```sh
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

### 安装基础软件

登录宝塔Web面板后，安装以下软件：

1. **MySQL** - 数据库服务
   ![MySQL安装](/images/bt/image.png)

2. **Nginx** - Web服务器

3. **Redis** - 缓存服务
   ![Redis安装](/images/bt/image-11.png)

4. **Docker** - 容器服务（用于Elasticsearch）
   ![Docker安装](/images/bt/image-4.png)

> ⚠️ **注意**：宝塔的Elasticsearch是8.x版本，与ReMan不兼容，必须用Docker安装7.x版本

## 第二步：上传和解压文件

### 文件上传

1. 进入宝塔文件管理器
2. 导航到家目录（通常是 `/root`）
   ![家目录导航](/images/bt/image-1.png)

3. 上传以下文件：
   - `reman-install.zip`（组件包）
   - `linux_amd64.zip`（ReMan程序）
   ![文件上传](/images/bt/image-2.png)

### 创建目录结构

通过宝塔终端或SSH执行：

```sh
# 创建目录
mkdir ~/env ~/app

# 移动文件到对应目录
mv reman-install.zip ~/env/
mv linux_amd64_v*.zip ~/app/  # 根据实际文件名调整
```

## 第三步：部署Elasticsearch

### 解压和配置

```sh
# 解压组件包
cd ~/env
sudo apt install unzip  # 如果未安装
unzip reman-install.zip

# 修改docker-compose.yml，只保留Elasticsearch配置
```

### 编辑docker-compose.yml

删除MySQL和Redis配置，只保留：

```yml
version: '3'

services:
  elasticsearch:
    image: elasticsearch:7.17.7
    restart: always
    hostname: es1
    container_name: elasticsearch
    volumes:
     - ./es-data:/var/lib/elasticsearch/data
     - ./plugins:/usr/share/elasticsearch/plugins
     - ./elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
    environment:
     - "ES_JAVA_OPTS=-Xms1200m -Xmx1200m"
     - discovery.type=single-node
    ports:
      - '127.0.0.1:9200:9200'
    privileged: true
```

### 启动Elasticsearch

```sh
cd ~/env

# 测试启动（前台运行）
sudo docker compose up

# 无错误后，后台启动
sudo docker compose up -d
```

![ES部署成功](/images/bt/image-5.png)

## 第四步：解压ReMan程序

```sh
cd ~/app

# 解压ReMan程序
unzip linux_amd64_v*.zip

# 重命名并设置权限
mv reman_linux_amd64_v* reman
chmod +x reman
```

## 第五步：创建网站和数据库

### 新建站点

在宝塔面板中创建新站点：

![新建站点](/images/bt/image-6.png)

**创建站点的目的**：

1. 提供域名访问入口
2. 自动创建MySQL数据库
3. 配置反向代理

### 配置反向代理

1. 进入站点设置
   ![站点设置](/images/bt/image-8.png)

2. 添加反向代理
   ![反向代理配置](/images/bt/image-9.png)

3. 配置代理参数：
   - **代理名称**：reman
   - **目标URL**：`http://127.0.0.1:4677`
   - **发送域名**：`$host`

   ![代理详细配置](/images/bt/image-10.png)

:::warning HTTPS证书注意事项
如果反向代理影响SSL证书申请：

1. 临时关闭反向代理
2. 申请SSL证书
3. 重新开启反向代理
:::

## 第六步：配置和启动ReMan

### 配置文件修改

编辑 `~/app/config.yml`，参考 [完整安装指南的配置部分](/reman/complete-install#配置文件详解)：

**关键配置项**：

```yml
# 数据库配置（使用宝塔创建的数据库信息）
db:
  database: 宝塔创建的数据库名
  host: 127.0.0.1
  username: 数据库用户名
  password: 数据库密码
  port: 3306

# Redis配置（宝塔Redis默认配置）
redis:
  addr: 127.0.0.1:6379
  db: 0
  password: ''

# 其他配置项参考完整安装指南
```

### 启动ReMan

```sh
cd ~/app

# 首次启动测试
./reman

# 记录管理员账号信息后，按Ctrl+C退出
# 然后使用PM2管理（参考完整安装指南）
```

## 后续步骤

完成以上配置后，继续参考 [完整安装指南](/reman/complete-install) 完成：

1. **PM2进程管理**
2. **系统监控配置**
3. **日常维护**

## 故障排除

### 常见问题

1. **端口冲突**：检查4677端口是否被占用
2. **数据库连接**：确认宝塔MySQL服务正常运行
3. **Redis连接**：检查宝塔Redis服务状态
4. **ES连接**：确认Docker容器正常运行

### 检查命令

```sh
# 检查服务状态
sudo docker ps                    # Docker容器状态
netstat -tulpn | grep 4677       # ReMan端口状态
pm2 ls                           # PM2进程状态

# 查看日志
pm2 logs reman                   # ReMan日志
sudo docker logs elasticsearch   # ES日志
```

<!-- @include: @/components/firewall.md -->
