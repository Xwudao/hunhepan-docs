---
outline: deep
---


# Caddy2

<https://caddyserver.com>

## 下载与安装

可在 <https://caddyserver.com/download> 页面下载您操作系统对应版本的Caddy。

![Caddy 官方下载安装](/images/caddy/image.png)

之后，将其上传到您的服务器上，并改名（一般下载的文件是类似：`caddy_linux_amd64`）

```sh
mv caddy_linux_amd64 caddy
```

然后，给予执行权限：

```sh
chmod +x caddy
```

最后，运行：

```sh
./caddy run
```

---

但是在运行之前，我们需要先配置一下`Caddyfile`文件，这个文件是`Caddy`的配置文件（在和`caddy`同级目录新建`Caddyfile`文本文件），我们可以在这里配置我们的网站域名、反向代理等等。

一个 `ReMan`可以使用的基本配置如下：

```txt
{
    email admin@example.com
}

example.com www.example.com {
    reverse_proxy http://127.0.0.1:4677
}
```

> 请将上述内容保存为`Caddyfile`文件
>
> `example.com`和`www.example.com`是您的网站域名
>
> 其中，`email`是您的邮箱，用于`Caddy`自动为您申请证书

## www跳转

如果，您需要配置将非www域名，跳转到www域名，可以使用如下配置：

```txt
{
    email admin@example.com
}

www.example.com {
    reverse_proxy http://127.0.0.1:4677
}

example.com {
    redir https://www.example.com
}
```

> 请举一反三，如果您需要将www域名，跳转到非www域名，可以自行配置

## systemd管理

上述方式，是直接运行`Caddy`，但是如果您需要使用`systemd`管理`Caddy`，可以使用如下配置：

```sh
sudo groupadd --system caddy

sudo useradd --system \
    --gid caddy \
    --create-home \
    --home-dir /var/lib/caddy \
    --shell /usr/sbin/nologin \
    --comment "Caddy web server" \
    caddy


# 下行`caddy_linux_amd64`是从官网下载的文件，如果您的文件名不是这个，请自行修改
mv caddy_linux_amd64 /usr/local/sbin/caddy

chmod +x /usr/local/sbin/caddy
mkdir /etc/caddy
touch /etc/caddy/Caddyfile


cd /etc/systemd/system
vim caddy.service
```

::: details caddy.service

```txt
# caddy.service
#
# For using Caddy with a config file.
#
# Make sure the ExecStart and ExecReload commands are correct
# for your installation.
#
# See https://caddyserver.com/docs/install for instructions.
#
# WARNING: This service does not use the --resume flag, so if you
# use the API to make changes, they will be overwritten by the
# Caddyfile next time the service is restarted. If you intend to
# use Caddy's API to configure it, add the --resume flag to the
# `caddy run` command or use the caddy-api.service file instead.

[Unit]
Description=Caddy
Documentation=https://caddyserver.com/docs/
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=notify
User=caddy
Group=caddy
ExecStart=/usr/local/sbin/caddy run --environ --config /etc/caddy/Caddyfile
ExecReload=/usr/local/sbin/caddy reload --config /etc/caddy/Caddyfile --force
TimeoutStopSec=5s
LimitNOFILE=1048576
LimitNPROC=512
PrivateTmp=true
ProtectSystem=full
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
```

:::

::: details Caddyfile

```sh
vim /etc/caddy/Caddyfile
```

编辑`Caddyfile`文件，内容如下：

```txt
{
    email admin@example.com
}

www.example.com {
    reverse_proxy http://127.0.0.1:4677
}

example.com {
    redir https://www.example.com
}
```

:::