---
outline: deep
---

# 宝塔安装

https://www.bt.cn/

Ubuntu的是：

```sh
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```


进行web面板后，选择安装：mysql, nginx：

![](/images/bt/image.png)




安装redis：

![](/images/bt/image-11.png)

还得通过宝塔安装`docker`：

![](/images/bt/image-4.png)

之后等它安装，我们同时去上传一些文件，因为redis和mysql是可以通过宝塔安装，
但是 elasticsearch 得用docker安装，所以我们先上传一些文件；


## 上传文件

找到家目录，然后上传文件：

![](/images/bt/image-1.png)

我上面演示的家目录是 `/home/tim`，但是你们的话可能是 `/root`

![](/images/bt/image-2.png)

一次性把`reman-install.zip`和`linux_amd64.zip`都上传上去；

## 进入终端（安装es环境）

![](/images/bt/image-3.png)

因为我演示环境无法通过密码登录，所以我就在本地登录，你们是可以通过上面截图的方式登录的；

先建立两个目录，一个是`env`，一个是`app`

```sh
mkdir env app
```

移动之前上传的文件到`app`和`env`目录：

```sh
mv linux_amd64_v0.1.4.zip app #你们的压缩包的名称可能不一样，所以你们要改一下
mv reman-install.zip env
```

解压`app`目录下的文件：

```sh
cd ~/app
sudo apt install unzip # 如果没有安装unzip的话，先安装，如果你是centos, 那么就是 `sudo yum install unzip``

unzip linux_amd64_v0.1.4.zip

mv reman_linux_amd64_v0.1.4 reman
chmod +x reman
```

解压`env`目录下的文件：

```sh
cd ~/env
unzip reman-install.zip
```

由于使用了宝塔安装了mysql,redis，所以我们需要修改一下配置文件：

`docker-compose.yml`把`redis`和`mysql`的配置注释掉(删除掉)：

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
      - '9200:9200'
      - '9300:9300'
    privileged: true
```

下面这一步的话，你得等到宝塔把docker安装完毕之后，再执行：

```sh
sudo docker compose up #验证，因为是在前台执行的，
sudo docker compose up -d # 后台执行
```


![](/images/bt/image-5.png)

---

到比，我们的es环境就安装好了，接下来就是新建站点了； 

![](/images/bt/image-6.png)


## 新建站点

![](/images/bt/image-7.png)


设置,添加反向代理：

![](/images/bt/image-8.png)


内容：

![](/images/bt/image-9.png)

其中，`4677`是reman程序监听的端口：

![](/images/bt/image-10.png)

