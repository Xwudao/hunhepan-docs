
## 关闭防火墙

建议服务器仅开放：`22`，`80`，`443`端口，其他端口都关闭。

ReMan 目前依赖的服务涉及的端口如下 ：`3306`、`6379`、`9200`、`4677`、`9300`、`80`、`443`。

其中，特别是 `3306`、`6379`、`9200`、`9300` 这几个端口，是必须**关闭**的，这涉及到数据安全问题，不然容易被别人连接。

**特别强调：** 不要信任宝塔的防火墙功能，请务必在服务器商提供的后台进行防火墙设置，宝塔的功能基于系统，但是某些厂商的提供的系统有问题。

**特别强调：** 不要信任宝塔的防火墙功能，请务必在服务器商提供的后台进行防火墙设置，宝塔的功能基于系统，但是某些厂商的提供的系统有问题。

**特别强调：** 不要信任宝塔的防火墙功能，请务必在服务器商提供的后台进行防火墙设置，宝塔的功能基于系统，但是某些厂商的提供的系统有问题。


雨云防火墙参考：

![宝塔防火墙](/images/bt/image-16.png)