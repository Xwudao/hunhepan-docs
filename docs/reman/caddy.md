---
outline: deep
---


# Caddy2

https://caddyserver.com

`Caddy`介绍：

Caddy是一个开源的、模块化的、具有自动HTTPS功能的Web服务器。它是用Go语言编写的，并且被设计成简单易用、高效灵活的工具。

1. 自动HTTPS：Caddy通过与Let's Encrypt集成，可以自动为您的网站启用和管理HTTPS。您无需手动配置证书，Caddy会自动为您获取和更新证书，从而为您的网站提供安全的加密连接。

2. 模块化架构：Caddy的核心设计理念是模块化。它提供了丰富的插件系统，您可以根据需要选择和配置不同的插件来扩展Caddy的功能。这使得Caddy非常灵活，可以适应各种不同的用途和需求。

3. 简单易用：Caddy的配置文件采用Caddyfile格式，非常简洁明了。您可以使用简单的语法来定义您的网站和其它服务的配置，而无需深入了解复杂的配置选项。此外，Caddy还提供了一个强大的命令行界面，使得管理和监控您的网站变得非常方便。

4. 高性能：Caddy采用了现代的Web服务器技术和一些性能优化策略，以确保提供高性能的服务。它支持HTTP/2和HTTP/3，可以有效地处理并发请求，并具有低内存占用和快速的响应时间。

5. 安全性：除了自动的HTTPS支持之外，Caddy还提供了一些安全增强功能，如请求过滤、IP黑名单、基于客户端证书的身份验证等。这些功能可以帮助您保护您的网站免受恶意攻击和滥用。

6. 多平台支持：Caddy可在各种操作系统上运行，包括Linux、macOS、Windows等。您可以将其用作开发环境、生产服务器或者本地测试服务器。


## 下载与安装

可在 https://caddyserver.com/download 页面下载您操作系统对应版本的Caddy。

![](/images/caddy/image.png)


---

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

> `example.com`和`www.example.com`是您的网站域名，`

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