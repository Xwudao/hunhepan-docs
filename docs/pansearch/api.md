---
outline: deep
---

# PanSearch API 文档

以下是 PanSearch 的一些 API 端点，允许有能力的用户开发额外功能。

## 生成 API Token

在后台【站点配置】=>【系统配置】中，有一个选项用于生成 API Super Token

:::warning 注意
Token 权限很大，请勿泄露或轻易分享给他人。
:::

## 导入网盘（公开）

```http
POST {{api}}/open/disk/import?token={{token}}
Content-Type: application/json

{
  "disk_id": "{{$random.hexadecimal(10)}}",
  "disk_name": "{{$random.alphabetic(10)}}",
  "disk_pass": "{{$random.hexadecimal(4)}}",
  "disk_type": "BDY",
  "files": "{{$random.alphabetic(10)}}",
  "share_user": "{{$random.alphabetic(7)}}",
  "shared_time": "{{$timestamp}}",
  "category_id": 1,
  "is_mine": true,
  "extensions": ["mp4", "mkv", "avi"],
  "tags": ["电影", "高清", "2024"]
}
```

解释：

- `{api}` 是您的网站域名，例如 <https://www.example.com>
- `disk_id` 是网盘分享 ID（示例中随机生成）,百度ID不要前面的`1`。
- `disk_type` 是网盘类型：BDY、ALY、QUARK、XUNLEI 等。
- `shared_time` 是分享时间（时间戳）。
- `category_id` 是类别 ID，不添加分类，则不要设置到 body。
- `is_mine` 表示是否为您的资源（true 或 false）。
- `extensions` 是文件扩展名的数组。
- `tags` 是资源标签的数组。
