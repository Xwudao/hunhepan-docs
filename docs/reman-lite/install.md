---
outline: deep
title: 安装ReMan-Lite
---


# 安装 ReMan-Lite


## 准备工作


## 安装依赖环境



本文将使用 Docker 来安装 MySQL 和 Redis，如果你已经有了 MySQL 和 Redis，可以跳过这一步。

如果你使用了 宝塔 之类的面板，可以直接在面板中安装 MySQL 和 Redis。请注意，MySQL 的版本需要在 5.7 以上，Redis 的版本需要在 6 以上。

**使用 Docker 安装 Mysql 和 Redis**

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
    volumes:
      - './mysql-data:/var/lib/mysql'
      - './mysql-conf/my.cnf:/etc/my.cnf'
      - './init/:/docker-entrypoint-initdb.d/'
    ports:
      - '3306:3306'
    command: --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
  redis:
    image: redis:6.2.6-alpine
    container_name: redis
    restart: always
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - ./redis-data:/data
      - ./redis.conf:/etc/redis/redis.conf
    ports:
      - '6379:6379'
    sysctls:
      - net.core.somaxconn=1024
    command: /bin/sh -c "echo 'vm.overcommit_memory = 1' >> /etc/sysctl.conf && redis-server /etc/redis/redis.conf --appendonly yes"
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
      - '9200:9200'
      - '9300:9300'
    privileged: true
```

将上面的内容保存为 `docker-compose.yml`，修改 MySQL 的密码和用户名，

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
