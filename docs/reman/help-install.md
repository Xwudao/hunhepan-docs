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

一般，更新包是zip压缩文件，里面包括 `config.yml` 和 `reman_xxx_xxx`

1. 解压zip，将 `reman_xxx_xxx` 重名成 `reman`

2. 将reman上传到 `/root/app` (我帮忙安装的都是这个目录，如何上传，办法太多了，scp，xftp, 宝塔的文件管理等等都可)

3. 终端进入到：`/root/app` ，下面两步都在这个目录执行

4. 给reman添加执行权限：`chmod +x reman` （这条命令在 terminal 终端执行）

5. `pm2 restart reman` （这条命令在 terminal 终端执行）