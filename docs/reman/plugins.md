---
outline: deep
---

# ReMan 插件大全（收费）

你将可以将此处的插件理解为独立程序，其通过 ReMan API 与 ReMan 系统进行交互。

## ReMan 网盘资源检测工具

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
check-tool --api https://api.example.com --token your_token --parallel 5 --size 50

# 使用代理文件
check-tool -a https://api.example.com -t your_token -p proxy.txt -n 10 -s 50
```

**参数说明：**

- `--api, -a`: ReMan API 地址（必需）
- `--token, -t`: ReMan API 令牌（必需）
- `--proxy-file, -p`: 代理文件路径（可选）
- `--parallel, -n`: 并行工作线程数（默认：1）
- `--start-last-id, -s`: 起始 last_id（默认：0）
- `--size, -z`: 每次请求获取的项目数量（默认：50）

**代理格式支持：**

- HTTP 代理：`http://ip:port`
- SOCKS5 代理：`socks5://ip:port`
