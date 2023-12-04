# ReMan

**本文档编写中，目前并未完善**

`ReMan`是由本人开发的一款拥有后台的网盘搜索引擎程序；

特点：

- 拥有后台，灵活配置
- 支持手机端和电脑端（前台）
- 程序本身只有两个文件：config.yml 和 reman（二进制文件）


## 价格

￥799 程序，包1年更新，进内部群，和其他人交流

如需帮忙安装，需再+100，即：￥899


购买先加微信：apkapb


## 演示环境

https://reman.xwd.pw

用户名：admin

密码：Au2m1TdM


## 所需服务部署

运行整套服务，最少需要服务器配置：`2c4g`

系统 `Centos` 或 `Ubuntu` x86_64均可

- mysql
- redis
- elasticsearch
- Caddy2


### MRE

- mysql
- redis
- elasticsearch

可以使用我为大家准备的`docker compose`文件，一键运行上述3个服务

https://wwhb.lanzouw.com/iB1dS1gt9trc

```sh
sudo docker compose up -d
```


### Caddy2

介绍：Caddy2是由golang开发的一款类似nginx的http服务器，我们使用它来作为后端程序的反向代理工具；

使用它最重要的原因是它可以自动为我们生成tls证书，让我们的网站挂上绿锁（https）

下载：

https://caddyserver.com/download

配置示例：

```caddy
{
    email test@example.com
}

example.com www.example.com {
    reverse_proxy http://127.0.0.1:4677
}
```

将上述内容保存为`Caddyfile`

运行示例，假设：`Caddyfile`和`caddy`在同一目录：

```sh
./caddy start # start 就是直接后台运行
```

## 程序运行




## 附录

### Docker 安装

