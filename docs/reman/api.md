---
outline: deep
---


# 一些接口说明 

这里提供一些接口说明，方便有能力的朋友，自己开发一些功能。

---

在后台【站点配置】=>【其它配置】

有一个[API导入资源到系统Token]选项，你需要先生成这个 token：

![](/images/api/image.png)

然后，你可以使用这个token

## 导入资源接口

```http
POST {api}/v1/disk/api_import?token=[token]
Content-Type: application/json

{
  "disk_id": "网盘分享ID",
  "disk_name": "资源名称",
  "disk_pass": "资源密码",
  "disk_type": "网盘类型",
  "files": "文件列表",
  "share_user": "分享人",
  "shared_time": "10位时间戳",
  "weight": 1
}
```

说明：

- `{api}`是你的网站域名，比如：https://www.example.com
- `disk_id` 网盘分享ID，百度网盘有点特殊：https://pan.baidu.com/s/1xxxxxxxxx 这样的，那么这个ID就是：xxxxxxxxx（把1去掉）
- 网盘类型：BDY, ALY, QUARK, XUNLEI


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