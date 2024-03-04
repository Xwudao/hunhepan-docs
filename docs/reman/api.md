---
outline: deep
---

# 一些接口说明

这里提供一些接口说明，方便有能力的朋友，自己开发一些功能。

---

在后台【站点配置】=>【其它配置】

有一个[API 导入资源到系统 Token]选项，你需要先生成这个 token：

![](/images/api/image.png)

然后，你可以使用这个 token

::: warning 注意
token 权限很大，不要泄露，不要轻易给别人
:::

## 导入资源接口

```http
POST {{api}}/open/disk/api_import?token={{token}}
Content-Type: application/json

{
  "disk_id": "网盘分享ID",
  "disk_name": "资源名称",
  "disk_pass": "资源密码",
  "disk_type": "网盘类型",
  "files": "文件列表",
  "share_user": "分享人",
  "shared_time": "10位时间戳",
  "weight": 1,
  "is_mine":false,
  "meta": {
      "description": "长春图书馆馆藏国家珍贵古籍",
      "posters_url": "https://img.jisuzyimg.com/cover/89a82bfdadb7b2ee56416a986b0376ae.jpg"
  }
}
```

说明：

- `{api}`是你的网站域名，比如：https://www.example.com
- `{token}`是你的 API 导入资源到系统 Token
- `disk_id` 网盘分享 ID，百度网盘有点特殊：https://pan.baidu.com/s/1xxxxxxxxx 这样的，那么这个 ID 就是：xxxxxxxxx（把 1 去掉）
- `disk_type` 网盘类型：BDY, ALY, QUARK, XUNLEI
- `shared_time` 资源分享时的时间，10 位时间戳
- `files` 文件列表，是一个字符串，比如：`file: xxx.jpg\nfolder: xxx\nfile: xxx.mp4`
- `weight` 资源权重，数字越大，权重越高 _已废弃_
- `is_mine` 是否是自己的资源，true 或 false，自己资源将增加搜索结果分数（排在前面）
- `meta` 是可选的，里面有两个字段：
  - `description` 资源描述
  - `posters_url` 资源封面图（海报）

## 获取搜索热词

```http
GET {{api}}/open/analysis/search_hot_key?token={{api_token}}
```

## 获取今日热词

```http
GET {{api}}/open/analysis/today_hot_key?token={{api_token}}
```

## 添加推荐词

```http
POST {{api}}/open/word/create?token={{api_token}}
Content-Type: application/json

{
  "word": "神探驸马请接嫁",
  "description": "小帝姬公仪音得皇上赐婚，与无数少女的梦中情人秦默喜结连理，不料大婚当夜便惨遭冷落，甚至传出驸马要和离的消息！公仪音气愤难平，女扮男装到廷尉寺当差，要跟这素未谋面的夫婿好好算账。一场他逃她追的游戏开始了……",
  "show": [
    "爱情"
  ],
  "type": "movie",
  "image": "https://img.jisuzyimg.com/cover/89a82bfdadb7b2ee56416a986b0376ae.jpg"
}
```

## 搜索资源

```http
### search disk
POST {{api}}/open/search/disk?token={{api_token}}
Content-Type: application/json

{
  "q": "1",
  "type": "",
  "user": "",
  "share_time": "",
  "format": [],
  "page": 1,
  "size": 2
}
```

> `q` 搜索关键词
>
> `type` 资源类型: BDY, ALY, QUARK, XUNLEI
>
> `user` 分享人
>
> `share_time` 分享时间: half_year,year,month,week
>
> `format` 格式: [".mp4", ".mkv"]
>
> `page` 页码
>
> `size` 每页数量

## 导入资源

通过文案导入资源（自动提取文案中的链接信息）

```http
### import disk by task
POST {{api}}/open/task/import_disk?token={{api_token}}
Content-Type: application/json

{
  "text": " 「6103-教父（87集）」 https://pan.quark.cn/s/3445e4fb7cf2"
}
```