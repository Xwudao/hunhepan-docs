---
outline: deep
---


# 常见问题

## 密码忘记

ssh 登录服务器，进行到 `reman` 运行的目录，执行：

```sh
./reman reset admin
```

### 黑名单设置错误

如果黑名单设置错误，导致自己都无法访问，可以通过 ssh 登录服务器，进行到 `reman` 运行的目录，执行：

```sh
./reman reset blacklist
```

**注意：** 执行上述命令后，会关闭黑名单功能，然后需要您手动重启 `reman` 程序，之后才能生效。

之后，再次登录 `reman` 管理后台，检查黑名单的问题，之后方可再次开启黑名单功能。