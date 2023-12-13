---
outline: deep
---


# Docker安装

我们提供了基于 `docker compose`的一键基础服务（`elasticsearch`, `redis`, `mysql`）安装模式，所以这里简略提一下如何安装Docker

这里顺带说句，购买服务器尽量购买大众化的版本，比如`Centos7`、`Ubuntu`：`x86_64`架构下的服务器，这样可以避免很多问题

不要买`arm`架构的服务器，虽然也能用，但是没必要


## Centos7


```sh
# 更新yum源
sudo yum update

# 安装需要的依赖包
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加Docker软件源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装Docker
sudo yum install -y docker-ce docker-ce-cli containerd.io

# 启动Docker服务
sudo systemctl start docker

# 重启 Docker 服务使配置生效
sudo systemctl restart docker

# 设置Docker服务开机自启
sudo systemctl enable docker
```


## Ubuntu

```sh

sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt install docker-ce

sudo systemctl restart docker
sudo systemctl enable docker
```