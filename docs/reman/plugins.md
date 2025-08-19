---
outline: deep
---

# ReMan 插件大全（收费）

你将可以将此处的插件理解为独立程序，其通过 ReMan API 与 ReMan 系统进行交互。

## ReMan 网盘资源检测工具

**限制**: 仅限 ReMan 版本 >= 1.6.0

**价格：** ￥299 / 套

**功能描述：** 批量检查 ReMan 系统中网盘资源的有效性，自动标记无效资源状态。

**主要特性：**

- 从 ReMan API 批量拉取网盘数据
- 并行检查网盘资源有效性
- 自动标记无效网盘状态
- 支持代理池进行网络访问
- 支持断点续传机制
- 可配置并发数和批次大小

**使用方法：**

```bash
# 基本用法
check-tool --api https://api.example.com --token your_token --code your_license_code --parallel 5 --size 50

# 使用代理文件
check-tool -a https://api.example.com -t your_token -c your_license_code -p proxy.txt -n 10 -s 50
```

**参数说明：**

- `--api, -a`: ReMan API 地址（必需）
- `--token, -t`: ReMan API 令牌（必需）
- `--code, -c`: ReMan 插件授权码（必需）
- `--proxy-file, -p`: 代理文件路径（可选）,里面一行一个代理地址
- `--proxy-api, -r`: 代理 API 地址（可选，访问该地址会返回一个代理IP）
- `--parallel, -n`: 并行工作线程数（默认：1）
- `--start-last-id, -s`: 起始 last_id（默认：0）
- `--size, -z`: 每次请求获取的项目数量（默认：50）

**代理格式支持：**

- HTTP 代理：`http://ip:port`
- SOCKS5 代理：`socks5://ip:port`

**使用说明：**

不会直接删除文档，可以通过后台的过滤条件筛选，手动进行隐藏：

![使用说明](/images/plugins/image.png)

## 盘搜网盘资源爬虫工具

**限制**: 仅限 ReMan 版本 >= 1.6.0

(`--hot`指令需要>1.7.2)

**价格：** ￥99 / 套

**功能描述：** 从盘搜网站批量搜索网盘资源并导入到 ReMan 系统，支持关键词批量搜索、自动解析、并发处理等。

**主要特性：**

- 从盘搜网站搜索指定关键词的网盘资源
- 自动解析网盘链接并获取详细信息
- 批量导入资源到 ReMan 系统
- 支持并发处理以提高效率
- 支持断点续传和错误重试
- 支持从文件批量导入关键词
- 支持热门关键词自动搜索

**使用方法：**

```bash
# 基本用法（单关键词）
pansou-spider --spider-url https://spider.example.com --api https://api.example.com --token your_token --code license_code --query "电影" --parallel 5

# 批量关键词（文件每行一个关键词）
pansou-spider -s https://spider.example.com -a https://api.example.com -t your_token -c license_code -f keywords.txt -p 10

# 使用热门关键词搜索
pansou-spider -s https://spider.example.com -a https://api.example.com -t your_token -c license_code --hot -p 10
```

**参数说明：**

- `--spider-url, -s`: 盘搜爬虫服务地址（默认：<https://so.252035.xyz/api/search>）
- `--api, -a`: ReMan API 地址（必需）
- `--token, -t`: ReMan API 令牌（必需）
- `--code, -c`: ReMan 插件授权码（必需）
- `--query, -q`: 搜索关键词（与 --file 和 --hot 互斥，三选一）
- `--file, -f`: 包含搜索关键词的文本文件路径（每行一个关键词，与 --query 和 --hot 互斥）
- `--hot`: 使用热门搜索关键词进行搜索（与 --query 和 --file 互斥）
- `--parallel, -p`: 并行工作线程数（默认：1）

## 注意

以上插件均只可保证一段时间内可用，可能会因各种原因失效，且不保证长期维护。购买前请务必确认插件的可用性和适用性。
