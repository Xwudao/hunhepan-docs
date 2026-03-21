---
outline: deep
---

# 混合盘开放API

这里提供一部分开放API，方便开发者使用。

## API Token (Api Keys) 获取

购买方式：

1. 首先注册混合盘账号，登录后在 [https://hunhepan.com/my_api_keys](https://hunhepan.com/my_api_keys) 可查询自己的API Token。
2. 开通会员后，可自助生成API Token，生成后会显示在 [https://hunhepan.com/my_api_keys](https://hunhepan.com/my_api_keys) 页面上。

添加微信: timnottom 购买会员

## 搜索系统资源

```http
### search disk
POST https://hunhepan.com/open/search/disk?token=<your_api_token>
Content-Type: application/json

{
  "q": "搜索词",
  "page": 1,
  "size": 10,
  "time": "",
  "type": "",
  "exact": true
}
```

说明：

- `time`: week, month, three_month, year；分别表示：一周内、一个月内、三个月内、一年内；
- `type`: 资源类型，如：BDY, ALY, QUARK, XUNLEI；
- `exact`: 是否精确搜索，默认为`false`；
- `page`: 页码
- `size`: 每页数量
