---
outline: deep
---

# 帮忙安装的说明

下面是我帮忙安装之后的一些必要说明，如果你是自己安装的，可以忽略这个文档。

## 安装目录

一般，我帮忙安装的都是在家目录下的 `app` 和 `env` 目录，即：`~/app` 和 `~/env`；

更一般来说，如果是 `root` 用户，就是 `/root/app` 和 `/root/env` 目录。

- `app` 目录是程序的安装目录，一般是程序的二进制文件和配置文件，如：`reman`，`config.yml` 等等
- `env` 目录是程序的第三方依赖目录，如：`mysql`, `redis`, `elasticsearch` 等等

## 更新程序

视频教程：<https://www.bilibili.com/video/BV1z2Z8YKEwP/>

请在下面地址下载最新版本：

<https://github.com/Xwudao/reman-release>

一般，更新包是 zip 压缩文件，里面包括 `config.yml` 和 `reman_xxx_xxx`

> 基本上，不用动 `config.yml` 文件（just ignore it），只需要更新 `reman_xxx_xxx` 文件即可。

**下面是详细步骤：**

1. 解压 zip，将 `reman_xxx_xxx` 重名成 `reman`

2. 将 `reman` 上传到 `/root/app` (我帮忙安装的都是这个目录，如何上传，办法太多了，scp，xftp, 宝塔的文件管理等等都可以；)

   ::: details 原有的 reman

   本身在 `/root/app` 目录下有一个 `reman` 文件，如果你使用 `xftp` 的话会提示上传错误，原因是文件已经存在，你需要先删除原有的 `reman` 文件，然后再上传新的 `reman` 文件。

   当然，建议是将原有的 `reman` 文件重命名，如：`reman.bak.1`，这样可以保留原有的文件，以防万一你想用回旧版，可以改回 `reman`。

   :::

3. 终端进入到/root/app：`cd /root/app` ，下面两步都在这个目录执行

4. 给 reman 添加执行权限：`chmod +x reman` （这条命令在 terminal 终端执行）

5. `pm2 restart reman` （这条命令在 terminal 终端执行）

## 修改域名

如果是我帮忙安装的，想要修改/添加新域名，需要改这几个地方：

- config.yml
- Caddyfile

**config.yml**

在目录：`/root/app/`中有个`config.yml`文件，`cors.allowOrigin`字段添加一行：

```yml {4}
cors:
  allowCredentials: true
  allowOrigin:
    - https?://.+yourdomain.com
```

你只需要将上面`yourdomain.com`改成你的域名即可。

> 因为你可能是 https,可能带 www，可能不带 www，所以这里使用正则表达式，可以匹配多种情况。

![](/images/help-install/image.png)

注意：

1. config.yml 文件是 yaml 格式，所以缩进很重要，不要随便乱缩进，否则会报错。
2. 修改完 `config.yml` 文件后，需要重启程序，执行（在`/root/app/`目录下执行）：

```sh
pm2 restart reman
```

---

**Caddyfile**

在目录：`/etc/caddy` 中有个 `Caddyfile` 文件，修改或添加。

一般，你会看到如下类似的配置：

```txt
{
    email admin@example.com
}

www.example.com {
    reverse_proxy http://127.0.0.1:4677
}

example.com {
    redir https://www.example.com 301
}
```

上面的意思是：用`admin@example.com`去申请证书，然后将非`www`的域名重定向到`www`的域名。

然后，`www`域名的请求，转发到`http://127.0.0.1:4677`

所以，就清楚怎么改了，只需要将`example.com`和`www.example.com`改成你的**新域名**即可。

改完后，执行：

```sh
systemctl restart caddy
```

添加也是依样画葫芦，复制一份原来的，然后修改域名即可。

特别注意：一些空格之类的，也不要乱了，比如在 `example.com {` 中间有个空格，也不要随便删掉。

## 简单备份数据

理论上，把 `/root/env` 目录即可，mysql 和 elasticsearch 和 redis 的数据都在这个目录下。

## 复杂数据备份

**未完待续**

其实一般而言，只需要备份 mysql 即可，elastic 和 redis 一般不需要备份，es 和 redis 数据都可以根据 mysql 数据重建。

首先，在 `/root/env` 找到 `docker-compose.yml` 文件，然后找到 mysql 的配置，如下：

```yml
mysql:
    environment:
        MYSQL_ROOT_PASSWORD: "here_is_root_password" // <-- 这个是 root 密码
```

记住 root 密码，然后执行：

```sh
sudo docker ps 
```

找到 mysql 的 container id，替换下面的 `<container_id>`，然后执行：

```sh
sudo docker exec -it <container_id> mysqldump -u root -p reman > ./mydatabase.sql
```

**注意：**

1. 上面的 `reman` 是数据库名，你可以根据实际情况修改。默认就是 `reman`。
2. 上述命令回车之后，不会有任何提示，但是你需要输入root密码，然后再次回车即可。

这样，就会在当前目录下生成一个 `mydatabase.sql` 文件，这个文件就是你的数据库备份文件。
