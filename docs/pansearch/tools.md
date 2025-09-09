---
outline: deep
---

# 一些相关工具

## PanSou Spider

地址：<https://github.com/Xwudao/go-pansearch-tools>

介绍：基于 <https://github.com/fish2018/pansou> API的链接获取工具，可以从盘搜网站搜索资源并批量导入到 Go 盘搜系统。

### 使用方法

该工具的命令行使用方法如下：

```txt
盘搜网盘资源爬虫工具

该工具用于从盘搜网站搜索并导入网盘资源到 PanSearch 系统，支持以下功能：

• 从盘搜网站搜索指定关键词的网盘资源
• 自动解析网盘链接并获取详细信息
• 批量导入资源到 PanSearch 系统
• 支持并发处理以提高效率
• 支持断点续传和错误重试

使用示例：
    pansou-spider --spider-url https://spider.example.com --api https://api.example.com --token your_token --code license_code --query "电影" --parallel 5
    pansou-spider -s https://spider.example.com -a https://api.example.com -t your_token -c license_code -q "软件" -p 10

Usage:
    pansou-spider [flags]

Flags:
    -a, --api string          PanSearch API 地址
    -f, --file string         包含搜索关键词的文本文件路径（每行一个关键词）
    -h, --help                help for pansou-spider
    -p, --parallel int        并行工作线程数 (default 1)
    -r, --proxy-api string    代理 API 地址（可选，访问该地址会返回一个代理IP）
    -x, --proxy-file string   代理文件路径，里面每行一个代理地址（可选）
    -q, --query string        搜索关键词
    -s, --spider-url string   盘搜爬虫服务地址 (default "https://so.252035.xyz/api/search")
    -t, --token string        PanSearch API 令牌
```
