---
outline: deep
---


# Elasticsearch

这里说一下，如何安装 `elasticseach`


## 使用我们提供的docker配置安装

我们是建议使用我们提供的`docker`版本，因为这样可以避免很多问题


可以直接下载 [reman-install](https://wwhb.lanzouw.com/iB1dS1gt9trc)

解压之后，可以看到 `docker-compose.yml` 文件，直接在和 `docker-compose.yml` 同级目录运行如下命令即可同时启动 `mysql`、`redis`、`elasticsearch`：

```bash
docker compose up -d
```


---

打开 `docker-compose.yml` 文件，可以看到如下内容：

```yaml
version: '3'

services:
  # ...这里省略了mysql和redis的配置
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

可以看到，我们使用的是 `elasticsearch:7.17.7` 版本，所以您在手动安装 `elasticsearch` 的时候，可以使用该版本

![](/images/elasticsearch/image.png)

然后解压之后，可以看到 `plugins` 目录，该目录下我们已经内置了 `hao` 分词器：

![](/images/elasticsearch/image-1.png)





## 手动安装


既然您选择手动安装，那说明您对 `elasticsearch` 有一定的了解，这里就不多说了

有几点说明：

1. 程序内部使用的是 `elasticsearch` 7.x 版本，所以您也**必须**使用该版本
2. 程序内部使用的是 [hao](https://github.com/tenlee2012/elasticsearch-analysis-hao) 分词器，所以您安装es的时候，也需要安装该分词器（**注意es和hao版本需要对应**）


## 如何仅安装单一服务

场景：`mysql` 和 `redis` 我想通过宝塔安装，但是宝塔不能安装 `elasticsearch`，怎么办？

> 实际上新版本的宝塔提供了`elastcisearch`的安装，但是其提供的是8.x版本，而我们必须使用7.x版本，所以 `elasticsearch` 无法使用宝塔安装

同样，你可以下载：[reman-install](https://wwhb.lanzouw.com/iB1dS1gt9trc)

然后修改 `docker-compose.yml` 文件，将 `mysql` 和 `redis` 节的配置删掉，然后运行如下命令即可：

```bash
sudo docker compose up -d
```

修改后的 `docker-compose.yml` 文件如下：

```yaml
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
      - '9200:9200'
      - '9300:9300'
    privileged: true
```



