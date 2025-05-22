---
outline: deep
---

# 一些接口说明

这里提供一些接口说明，方便有能力的朋友，自己开发一些功能。

---

在后台【站点配置】=>【其它配置】

有一个[API 导入资源到系统 Token]选项，你需要先生成这个 token：

![api 生成说明](/images/api/image.png)

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

- `{api}`是你的网站域名，比如：<https://www.example.com>
- `{token}`是你的 API 导入资源到系统 Token
- `disk_id` 网盘分享 ID，百度网盘有点特殊：<https://pan.baidu.com/s/1xxxxxxxxx> 这样的，那么这个 ID 就是：xxxxxxxxx（把 1 去掉）
- `disk_type` 网盘类型：BDY, ALY, QUARK, XUNLEI
- `shared_time` 资源分享时的时间，10 位时间戳
- `files` 文件列表，是一个字符串，比如：`file: xxx.jpg\nfolder: xxx\nfile: xxx.mp4`
- `weight` 资源权重，数字越大，权重越高 _已废弃_
- `is_mine` 是否是自己的资源，true 或 false，自己资源将增加搜索结果分数（排在前面）
- `meta` 是可选的，里面有两个字段：
  - `description` 资源描述
  - `posters_url` 资源封面图（海报）


---

**2025/03/06 更新**：（实验性）添加通过API导入磁链、ED2K链接功能

注意：

- 磁力：disk_type: MAGNET
- ED2K：disk_type: ED2K

disk_id例子如下：

```txt
magnet:?xt=urn:btih:3a4f5e6d7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u
disk_id: 3a4f5e6d7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u


ed2k://|file|cn_windows_10_enterprise_version_1703_updated_june_2017_x86_dvd_10721462.iso|3737954304|9DF7203BD15FF86CD381D9C998462C78|
disk_id: |file|cn_windows_10_enterprise_version_1703_updated_june_2017_x86_dvd_10721462.iso|3737954304|9DF7203BD15FF86CD381D9C998462C78|
```


## 获取资源详情

> 在ReMan版本 > v1.5.9 中提供

```http
GET {{api}}/open/disk/doc?token={{api_token}}&doc_id=clpnxgck90004r4o7ngp8ls7d
```


:::details 返回举例
```json
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "id": 7,
    "create_time": "2023-12-02T10:45:17Z",
    "update_time": "2025-03-23T00:43:47Z",
    "disk_id": "dccef7304ec8",
    "disk_name": "魔方学习资料",
    "disk_pass": "8zex",
    "disk_type": "QUARK",
    "files": "file:9【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:8【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:6【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:7【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:5【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:3【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:4【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:30【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:2【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:29【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:28【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:27【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:26【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:25【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:23【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:24【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:22【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:21【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:1【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:20【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:19【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:18【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:17【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:16【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:15【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:14【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:13【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:12【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:11【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:10【微信公众号：97学社-免费分享】关注即可获取更多免费学习资源.mp4\nfile:第12课：四阶最后一层换角换棱.mp4\nfile:第11课：黄色顶面.mp4\nfile:第10课：前三层复原.mp4\nfile:第09课：白色第一层复原.mp4\nfile:第08课：白色十字.mp4\nfile:第07课：四阶核心大招：棱合并.mp4\nfile:第06课：橙、蓝、红、绿、中心合并.mp4\nfile:第05课：四阶魔方复原步骤-黄白中心合并.mp4\nfile:第04课：提速技法总结.mp4\nfile:第03课：二阶魔方第二招.mp4\nfile:第02课：二阶魔方第一招.mp4\nfile:第01课：一招搞定金字塔魔方.mp4\nfile:12 进阶三顶面复原-公式的叠加大法.mp4\nfile:11 进阶二-三个顶层一步复原公式加手法公式.mp4\nfile:13 进阶四-字母法.mp4\nfile:10 进阶1 一个手法公式+三个顶面复原高级公式.mp4\nfile:08 顶层第三招：角块位置复原.mp4\nfile:07 顶层第二招：角块方向复原 .mp4\nfile:05 搭好中间层-拼“棱块”.mp4\nfile:03 底层第一招-小花+04底层第二招-十字.mp4\nfile:06 顶层第一招：顶面十字.mp4\nfile:04 底层第三招-T字复原.mp4\nfile:02 魔方空间思维基本功-拆解魔方.mp4\nfile:01  魔方手法预习-神奇的“六步还原法”.mp4\nfolder:魔方学习资料\nfolder:013【完结】魔方进阶  王鹰豪\nfolder:012【完结】魔方冠军王鹰豪亲授，最好玩的学习力提升\nfolder:魔方大全（从入门到高级 分类 有趣易懂）\nfolder:50 凯叔魔方(四阶）\nfolder:03 三阶魔方课\nfolder:魔方入门\nfolder:课程\nfolder:魔方教程2\nfolder:魔方教程1\nfolder:异形魔方教程\nfolder:高级：魔方教程快速还原\nfolder:四阶魔方视频教程\nfolder:五阶魔方教程\nfolder:二阶魔方教程\nfolder:三阶魔方视频教程\nfolder:魔方高级玩法CFOP简版教程\nfolder:魔方高级玩法CFOP教程之高手实例 莫奇凌\nfolder:魔方高级玩法CFOP之顶层顺序PLL教程\nfolder:魔方高级玩法CFOP之顶层朝向OLL教程\nfolder:魔方高级玩法CFOP之底层十字Cross教程\nfolder:魔方高级玩法CFOP之前两层F2L教程\nfolder:魔方盲拧入门视频教程\nfolder:魔方入门课高清\nfolder:入门魔方玩法视频教程\nfolder:镜面魔方入门教程\nfolder:三阶魔方高级玩法教程\nfolder:6阶魔方教程\nfolder:5阶魔方玩法视频教程\nfolder:4阶魔方四阶魔方玩法视频教程\nfolder:3阶魔方入门玩法视频教程\nfolder:3阶教程一看就懂\nfolder:2阶魔方入门玩法教程\nfolder:变换金刚魔方教程\nfolder:五魔方教程\nfolder:SQ魔方教程",
    "doc_id": "clpnxgck90004r4o7ngp8ls7d",
    "share_user": "夸***3盟",
    "shared_time": "2023-12-02T15:14:25Z",
    "enabled": true,
    "weight": 1,
    "extensions": [
      ".mp4"
    ],
    "tags": [
      "魔方",
      "教程",
      "学习"
    ],
    "edges": {}
  }
}
```
:::

## 更新网盘资源信息

> 在ReMan版本 > v0.8.15 中提供

```http
### update disk partial by id type
POST {{api}}/open/disk/update_id_type?token={{api_token}}
Content-Type: application/json

{
  "disk_id": "VNkdBx69f34LBe1QqSdFwUdCa1",
  "disk_type": "XUNLEI",
  "disk_name": "mei女合集",
  "disk_pass": "qvif",
  "files": "file:Screenrecorder-2022-06-08-00-36-15-706.mp4",
  "share_user": "151****0380",
  "shared_time": "2023-12-01 23:07:09",
  "status": 1,
  "share_user_id": "12323233",
  "cost_coin": 12
}
```

> 说明：`disk_id`、`disk_type` 为必填项，其他字段可选
>
> status: 状态：0正常, 1被举报

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
  "text": "https://pan.quark.cn/s/3445e4fb7cf2\n\nhttps://pan.quark.cn/s/3445e4fb72323\n\thttps://pan.quark.cn/s/3445e4fb2323"
}
```

## 获取网盘导入任务

> 预计在版本 > 0.3.4 中提供

```http
GET {{api}}/open/disk_task/pick?token={{api_token}}&disk_type=&status=
```

- `disk_type` 网盘类型: BDY, ALY, QUARK, XUNLEI
- `status` 任务状态: pending, finished, failed, review

## 设置网盘导入任务状态

> 预计在版本 > 0.3.4 中提供

```http
### update status
POST {{api}}/open/disk_task/update_status?token={{api_token}}
Content-Type: application/json

{
  "ids": [
    1,
    2,
    3
  ],
  "status": "pending",
  "message": "错误信息，当status=failed时，可以填写错误信息"
}
```

- `ids` 任务 ID 列表
- `status` 任务状态: pending, finished, failed, review
