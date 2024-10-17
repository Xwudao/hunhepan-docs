---
outline: deep
---

# 通过宝塔安装ReMan

这篇文章主要是通过宝塔面板来安装 ReMan，但请注意，这篇并不是那么友好，你可以同时参考 [从零开始完整安装 ReMan](/reman/complete-install) 来安装 ReMan。

我们是非常建议使用干净环境并使用`docker compose`来安装所需服务的，然后非要使用宝塔的话，且又要自己安装的话，请仔细先阅读目前ReMan所有文档，不要来问一些傻瓜问题。

::: details 简述使用宝塔安装的流程

1. 首先，你要使用了宝塔 ，那么大概率你之前是使用宝塔来安装mysql的，所以和[从零开始完整安装 ReMan](/reman/complete-install)这篇文章不同，
mysql, redis就都通过宝塔安装了，只有elasticsearch是通过docker安装的。

2. 所以本篇文章主要目的，是告诉你：

- mysql, redis是使用宝塔来安装，然后`elasticsearch`是通过docker安装的。
- 然后，要安装`elasticsearch`，你需要上传一些文件，然后解压，然后再通过`docker compose`来启动elasticsearch。
- 并且，在上传 elasticsearch 文件的同时，把ReMan的地二进制文件和配置文件也上传上去了。

3. 之后就是安装ReMan，这个就和[安装ReMan](/reman/complete-install#安装-reman)这篇文章这一章节一样了。
:::

::: details 还有就是目录问题
整个ReMan文档，其实都在强调，第三方服务均放在 `~/env` 目录下，ReMan 本身的程序和配置文件是放在 `~/app` 目录下的

所以，一些命令在什么地方执行，在哪个目录下上传文件、执行命令，需要注意（**思考**）一下。

---

`~`在linux系统下，代表的是家目录，普通用户是：`/home/用户名`，root用户比较特殊，是`/root`

所以`~`代表的意思是`/home/用户名`或者`/root`。
:::

安装视频教程：<https://www.bilibili.com/video/BV1aE2AYHEuq/>

## 服务器

推荐雨云香港服务器，[https://www.rainyun.com](https://www.rainyun.com/Mzc4MDI=_)

最低配置：2c4g

系统建议：Ubuntu 22.04

## 准备工作

下载组件包：<https://wwhb.lanzouw.com/iB1dS1gt9trc>

下载ReMan程序：<https://github.com/Xwudao/reman-release>

## 安装宝塔

<https://www.bt.cn/>

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

> 我知道宝塔可以安装 elasticsearch，但它安装的是 8.x 版本的，在我们程序中，我们使用的是 7.x 版本的，所以我们还是得用 docker 安装

## 上传文件

找到家目录，然后上传文件：

![](/images/bt/image-1.png)

我上面演示的家目录是 `/home/tim`，但是你们的话可能是 `/root`

![](/images/bt/image-2.png)

一次性把`reman-install.zip`和`linux_amd64.zip`都上传上去；

> `reman-install.zip` 下载：<https://wwhb.lanzouw.com/iB1dS1gt9trc>

## 进入终端

这一步来安装 elasticsearch 环境

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

由于使用了宝塔安装的mysql,redis，所以我们需要修改一下配置文件：

`docker-compose.yml`把`redis`和`mysql`的配置注释掉(删除掉)，只保留 elasticsearch 节，也即`docker-compose.yml`最后只剩下下面展示的内容：

```yml {4}
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
# 上条命令没有明显报错，就可以按 ctrl+c 退出，然后执行下面的命令
sudo docker compose up -d # 后台执行
```

> 如果 docker 会自启的话，理论上 docker compose 也会自启。

![](/images/bt/image-5.png)

---

到比，我们的es环境就安装好了，接下来就是新建站点了；

![](/images/bt/image-6.png)

## 新建站点

:::details 新建站点的目的

1. 为了让 ReMan 能够通过域名访问，我们需要新建一个站点，然后添加反向代理。
2. 同时，也创建了一个数据库，用于存储 ReMan 的数据。（记住数据库名和密码，之后在在`config.yml`里面配置）
:::

:::warning 关于https
如果你使用的反向代理功能，宝塔提示不能申请https证书，
解决方法是：先关闭反向代理，然后申请https证书，然后再开启反向代理。
:::

![](/images/bt/image-7.png)

设置,添加反向代理：

![](/images/bt/image-8.png)

内容：

![](/images/bt/image-9.png)

其中，`4677`是reman程序监听的端口：

![](/images/bt/image-10.png)

## 安装ReMan

至此，环境就好了，之后就是安装ReMan了，你可以参考 [complete-install#安装-reman](/reman/complete-install#安装-reman) 来安装 ReMan。
