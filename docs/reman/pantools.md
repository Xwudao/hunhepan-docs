---
outline: deep
title: 网盘工具使用教程
---


# 网盘工具使用教程

这里提供了一些网盘工具的使用教程，包括：批量转存夸克链接的方法工具



## 批量转存夸克/UC

我自己写了一个脚本，可以转存别人的夸克链接，然后分享出来并导入分享链接，然后再将自己的链接入库；


是一个单文件，可以直接运行，不需要安装任何依赖；


### 初始化

在该文件(main.exe)所有目录，打开cmd：

![](/images/pantools/image.png)


运行如下命令：

```bat
main.exe init -a name -c "这里填入cookies" -t quark
```

**参数说明：**

- `-a`：别名，用于标识，这也代表着支持多账号；
- `-c`：cookies，这里填入你的cookies；下面将会介绍如何获取；
- `-t`：类型，这里填入`quark`，代表夸克；`uc`即UC网盘；


---

**Cookies 获取方法：**

浏览器打开`https://pan.quark.cn/`，登录后，按`F12`，刷新，在`Network`中找到`https://drive-pc.quark.cn`开头的任意一个链接，然后找到`Request Headers`中的`cookie`，复制即可；

实际上，只需要名为`__pus`的cookie即可；

![alt text](/images/pantools/image-3.png)


所以找到Cookies后，我们的命令就是：

```bat
main.exe init -a name -c "__pus=xxxx" -t quark
```

> 如果你复制了全部的Cookies,确保你的Cookies是一行文本，否则命令会报错；


---


如果执行成功，那么会在当前目录生成如下文件：

- `name-del.bat`：删除包含关键词的**文件**；
- `name-export.bat`：导出自己的分享链接；
- `name-save.bat`：保存其他人的分享链接；
- `name-share.bat`：分享指定pid文件夹的资源；
- `name.cookie.txt`：cookies文件；
- `name.link.txt`：其他人的分享链接文件可以存于该文件内；
- `name.pid.txt`：pid文件；

**说明：**

`name-del.bat`：删除包含关键词的**文件**，该命令会找当前目录下的`dict.txt`，你可能需要新建一个，里面是敏感词，每行一个；

`name-export.bat`：导出自己的分享链接，该命令会导出自己的分享链接，会将链接存于`name.export.txt`中；

`name-save.bat`：保存其他人的分享链接，该命令会将`name.link.txt`中的链接保存到自己的网盘中；

`name-share.bat`：分享指定pid文件夹的资源，该命令会将`name.pid.txt`中的pid文件夹分享出来；

**关于pid文件夹**：

默认程序在初始化时，会自动查找名为：`来自：分享`的文件夹，所以你没有的话，在初始化之前自行创建；

后期，你想分享其它文件夹的资源，可以将文件夹的pid写入`name.pid.txt`中；**注意** `name.pid.txt`中只能有一行；


**找pid：**

夸克最新PC端中，文件夹右键，“详细信息”中有ID：

![](/images/pantools/image-2.png)


---

如果执行失败，比如看到：

```json
panic: {"status":401,"code":31001,"message":"require login [guest]","req_id":"971212","timestamp":1728791773}
```

说明你的cookies有问题；


### 使用流程

1. 将他人的分享链接存于`name.link.txt`中，确保一行中只有一个分享链接，然后双击`name-save.bat`即可；

2. [可选]转存完毕后，如果要删除敏感（广告）文件，可以将敏感词写入`dict.txt`中，然后双击`name-del.bat`即可；

3. 双击`name-share.bat`即可分享指定pid文件夹的资源；

4. 双击`name-export.bat`即可导出自己的分享链接；


###  注意事项

该工具是免费分享（仅限购买了ReMan的用户），所以有问题请仔细研究文档，除了程序bug，不要找我；

也请不要将该工具分享给其他人；

需要工具，请私信我；