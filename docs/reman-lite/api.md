---
outline: deep
---


# ReMan-lite 的 API

这里同样提供了一些API供开发者使用，这里简单介绍一下。

- **token**：`token`是一个必须的参数，用于验证用户身份，获取token的方法是在后台：`站点配置` -> `其它配置` -> `杂类配置`。
- **api**：`api`是你的站点地址，比如：`https://reman-lite.xwudao.com`。

## 上传网盘信息

```http
### api import by token
POST {{api}}/v1/disk/import?token={{api_token}}
Content-Type: application/json
X-Name: ImportDisk

{
  "disk_id": "0d4af391245b",
  "disk_name": "Q 企丨业强人 2024[港剧]",
  "disk_type": "QUARK",
  "disk_pass": "",
  "files": "files\nfiles\nfiles",
  "share_user": "朴素*貂熊",
  "shared_time": "2021-01-01 00:00:00",
  "share_user_id": "100653330911",
  "status": "normal",
  "is_mine": false
}
```

说明：

- `disk_id`：网盘的唯一标识符，百度盘需要去掉'1'
- `disk_name`：网盘的名称
- `disk_type`：网盘的类型，目前支持`QUARK`、`DBY`、`XUNLEI`、`ALY`、`UC`
- `disk_pass`：网盘的提取码，没有为空字符串
- `files`：文件列表，每个文件之间用换行符分隔
- `share_user`：分享者的名称
- `shared_time`：分享的时间，10位时间戳
- `share_user_id`：分享者的唯一标识符
- `status`：入库 使用`normal`
- `is_mine`：是否是自己的资源，是为`true`，否为`false`

## 上传Tg信息

```http
POST {{api}}/v1/tg/create?token={{api_token}}
Content-Type: application/json
{
    "title": "标题", // 消息的标题
    "text": "介绍信息", // 消息的文本内容
    "channel_id": 12323, // 频道的唯一标识符
    "channel_msg_id": 43434, // 频道消息的唯一标识符
    "channel_title": "string", // 频道的标题
    "channel_username": "string", // 频道的用户名
    "filename": "string", // 文件名
    "text_urls": [
        "string" // 文本中包含的URL列表
    ],
    "media_ext": "string", // 媒体文件的扩展名
    "image": "string" // 图片的URL
}
```

一个例子如下：

```json
{
  "id": 1,
  "text": "名称：直到破坏了丈夫的家庭 夫の家庭を壊すまで (2024) 更新11【日剧】\n\n描述：　　本剧改编自同名漫画，讲述了贯彻从学生开始的纯爱而结婚再拥有幸福家庭的美典，发现了丈夫有着15年的婚外情。她决定向丈夫和小三复仇。作为复仇计划，美典利用了小三的高中生儿子，带着对他的愧疚感和意想不到沸腾起来的感情，丈夫多年来的出轨计划开始慢慢被揭穿… 爱情与背叛的四角关系，各自未来的新人生是…\n\n链接：https://pan.quark.cn/s/ead41078bebd\n\n\uD83D\uDCC1 大小：T\n\uD83C\uDFF7 标签：#直到破坏了丈夫的家庭 #quark\n\uD83D\uDCE2 频道：@yunpanshare\n\uD83D\uDC65 群组：@yunpangroup",
  "channel_id": 1762530683,
  "channel_msg_id": 74969,
  "channel_title": "网盘资源收藏(夸克)",
  "channel_username": "yunpanshare",
  "text_urls": ["https://pan.quark.cn/s/ead41078bebd"],
  "filename": "4944980334366272829.png",
  "media_ext": ".png",
  "title": "直到破坏了丈夫的家庭 夫の家庭を壊すまで (2024) 更新11【日剧】",
  "image": "https://tg.xwd.pw/tg/4944980334366272829.png"
}
```
