# Elasticsearch 安装与配置

## 概述

本文档详细介绍如何使用 Docker 安装 Elasticsearch，并配置 IK 中文分词插件。特别需要注意的是，分词插件版本必须与 Elasticsearch 版本完全一致，否则会导致兼容性问题。

## 版本兼容性说明

⚠️ **重要提醒**：分词插件版本必须与 Elasticsearch 版本完全一致！

- Elasticsearch 8.15.0 → IK 插件 8.15.0
- Elasticsearch 7.17.0 → IK 插件 7.17.0

版本不匹配会导致以下问题：
- 插件加载失败
- Elasticsearch 启动异常
- 分词功能无法正常工作

## Docker 安装方式

### 方式一：直接运行官方镜像（不含插件）

```bash
# 拉取官方镜像
docker pull elasticsearch:7.17.7

# 运行容器
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" \
  elasticsearch:7.17.7
```

### 方式二：使用自定义 Dockerfile（推荐）

使用自定义 Dockerfile 可以在构建镜像时自动安装 IK 分词插件，确保版本完全匹配。

## 环境配置

### 系统要求
- Docker 20.10+
- 内存：至少 2GB
- 磁盘空间：至少 10GB

### 创建数据目录

```bash
# 创建数据和配置目录
mkdir -p /opt/elasticsearch/data
mkdir -p /opt/elasticsearch/config
mkdir -p /opt/elasticsearch/logs

# 设置权限（ES 运行用户 UID 1000）
chown -R 1000:1000 /opt/elasticsearch/
chmod 755 /opt/elasticsearch/data
```

## Docker Compose 配置

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'
services:
  elasticsearch:
    build: .
    container_name: elasticsearch
    environment:
      - node.name=es-node-1
      - cluster.name=es-cluster
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
      - xpack.security.enabled=false
      - xpack.security.enrollment.enabled=false
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - /opt/elasticsearch/data:/usr/share/elasticsearch/data
      - /opt/elasticsearch/logs:/usr/share/elasticsearch/logs
    ports:
      - "9200:9200"
      - "9300:9300"
    networks:
      - elastic

networks:
  elastic:
    driver: bridge
```

## 验证安装

### 1. 检查 Elasticsearch 状态

```bash
# 检查集群状态
curl -X GET "localhost:9200/_cluster/health?pretty"

# 检查节点信息
curl -X GET "localhost:9200/_nodes?pretty"
```

### 2. 验证 IK 插件

```bash
# 查看已安装的插件
curl -X GET "localhost:9200/_cat/plugins?v"

# 测试 IK 分词器
curl -X POST "localhost:9200/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "analyzer": "ik_max_word",
  "text": "中华人民共和国国歌"
}'
```

### 3. 期望输出

IK 插件正常工作时，分词结果应类似：

```json
{
  "tokens": [
    {"token": "中华人民共和国", "start_offset": 0, "end_offset": 7},
    {"token": "中华人民", "start_offset": 0, "end_offset": 4},
    {"token": "中华", "start_offset": 0, "end_offset": 2},
    {"token": "华人", "start_offset": 1, "end_offset": 3},
    {"token": "人民共和国", "start_offset": 2, "end_offset": 7},
    {"token": "人民", "start_offset": 2, "end_offset": 4},
    {"token": "共和国", "start_offset": 4, "end_offset": 7},
    {"token": "共和", "start_offset": 4, "end_offset": 6},
    {"token": "国", "start_offset": 6, "end_offset": 7},
    {"token": "国歌", "start_offset": 7, "end_offset": 9}
  ]
}
```

## 常见问题

### 1. 内存不足
```bash
# 调整 JVM 堆内存
-e "ES_JAVA_OPTS=-Xms2g -Xmx2g"
```

### 2. 权限问题
```bash
# 确保数据目录权限正确
sudo chown -R 1000:1000 /opt/elasticsearch/
```

### 3. 插件版本不匹配
- 检查 Elasticsearch 版本：`curl localhost:9200`
- 确保下载对应版本的 IK 插件
- 重新构建 Docker 镜像

## Dockerfile

```dockerfile
FROM elasticsearch:7.17.7

# 维护者信息
LABEL maintainer="your-email@example.com"

# 设置工作目录
WORKDIR /usr/share/elasticsearch

# 下载并安装 IK 分词插件
RUN elasticsearch-plugin install --batch https://release.infinilabs.com/analysis-ik/stable/elasticsearch-analysis-ik-7.17.7.zip

# 验证插件安装
RUN elasticsearch-plugin list

# 暴露端口
EXPOSE 9200 9300

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:9200/_cluster/health || exit 1
```

:::warning 注意
编写文章时，release.infinilabs.com 证书过期，请根据实际情况更换下载地址。
:::

## Docker 运行命令

### 构建镜像

```bash
# 构建自定义镜像
docker build -t elasticsearch-ik:7.17.7 .
```

### 单独运行

```bash
# 运行容器
docker run -d \
  --name elasticsearch \
  --restart=unless-stopped \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" \
  -e "xpack.security.enabled=false" \
  -e "bootstrap.memory_lock=true" \
  --ulimit memlock=-1:-1 \
  -v /opt/elasticsearch/data:/usr/share/elasticsearch/data \
  -v /opt/elasticsearch/logs:/usr/share/elasticsearch/logs \
  elasticsearch-ik:7.17.7
```

### 使用 Docker Compose

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f elasticsearch

# 停止服务
docker-compose down
```

### 生产环境命令

```bash
# 生产环境推荐配置
docker run -d \
  --name elasticsearch-prod \
  --restart=always \
  --network=host \
  -e "cluster.name=prod-cluster" \
  -e "node.name=es-node-1" \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms4g -Xmx4g" \
  -e "xpack.security.enabled=true" \
  -e "bootstrap.memory_lock=true" \
  -e "indices.query.bool.max_clause_count=10240" \
  --ulimit memlock=-1:-1 \
  --ulimit nofile=65536:65536 \
  -v /opt/elasticsearch/data:/usr/share/elasticsearch/data \
  -v /opt/elasticsearch/logs:/usr/share/elasticsearch/logs \
  -v /opt/elasticsearch/config:/usr/share/elasticsearch/config \
  elasticsearch-ik:7.17.7
```

---

## 总结

通过以上步骤，您可以成功部署带有 IK 中文分词插件的 Elasticsearch 集群。记住关键点：

1. **版本严格匹配**：插件版本必须与 ES 版本完全一致
2. **权限设置**：确保数据目录权限正确（UID 1000）
3. **内存配置**：根据实际需求调整 JVM 堆内存
4. **健康监控**：定期检查集群状态和插件功能

如有问题，请检查容器日志：`docker logs elasticsearch`