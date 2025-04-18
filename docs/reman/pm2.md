---
outline: deep
---

# PM2使用教程

## 安装Nodejs

> pm2需要nodejs环境，所以需要先安装nodejs

> 不建议使用包管理安装，因为其安装的版本太过老旧；

在 <https://nodejs.org/zh-cn/download/prebuilt-binaries> 下载系统相应的版本；

![下载Nodejs](/images/pm2/image.png)

配置好相应的环境变量，以便在任意目录下都可以使用nodejs命令：

```sh
node -v
npm -v
```

> 网上很多安装nodejs和pm2的文章，本文不再赘述，有能力和兴趣的可以试一试；
>
> 当然，配置环境变量网上也有很多教程，这里也不再赘述；

## 安装pm2

```sh
npm i -g pm2
```

## 使用pm2运行程序

```sh
pm2 start "./reman"
```

## 使用pm2重启程序

首先你可能需要将更新程序的二进制文件上传到服务器；

然后使用下面的命令重启程序：

::: details 一般我帮忙安装的话

一般我帮忙安装的话，程序运行在家目录的app目录下，即：`~/app`

你可能需要先解压更新程序的二进制文件，将类似 `reman_linux_amd64_v0.2.3` 重命名成 `reman`，然后将`reman`文件上传到服务器的`~/app`目录下；

然后使用下面的命令重启程序：

```sh
# 这条命令在 `~/app` 目录下执行
pm2 restart "./reman"
```

:::

```sh
pm2 restart id
```

\<id\>从`pm2 ls`命令中获取：

```sh
pm2 ls
```
