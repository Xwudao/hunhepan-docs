---
outline: deep
---


# Docker安装

我们提供了基于 `docker compose`的一键基础服务（`elasticsearch`, `redis`, `mysql`）安装模式，所以这里简略提一下如何安装Docker

这里顺带说句，购买服务器尽量购买大众化的版本，比如`Centos7`、`Ubuntu`：`x86_64`架构下的服务器，这样可以避免很多问题

不要买`arm`架构的服务器，虽然也能用，但是没必要

## Centos7

::: details Centos7官方源

```sh
sudo yum update
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io

sudo systemctl start docker
sudo systemctl restart docker
sudo systemctl enable docker
```

:::

::: details Centos7国内阿里源

```sh
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo wget -O /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo yum -y install docker-ce

sudo systemctl start docker
sudo systemctl restart docker
sudo systemctl enable docker
```

:::

## Ubuntu

::: details Ubuntu官方源

```sh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt install docker-ce
sudo systemctl restart docker
sudo systemctl enable docker
```

:::

::: details Ubuntu国内阿里源

```sh
sudo apt-get update
sudo apt-get -y install ca-certificates curl

sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] http://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

:::
