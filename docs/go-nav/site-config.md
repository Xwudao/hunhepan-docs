---
outline: deep
title: Go-Nav 站点配置说明
---

# Go-Nav 站点配置说明

Go-Nav 的“站点配置”页面是后台最重要的页面之一。

当前共分为 9 个 Tab：

- 基本信息
- SEO 配置
- 首页配置
- 存储配置
- 推荐配置
- 系统配置
- MCP 服务
- AI 配置
- 授权配置

下面按顺序说明。

## 基本信息

这个页面决定了站点最基础的展示信息。

主要字段包括：

- `site_name`：站点名称
- `site_url`：站点网址
- `site_title`：页面标题
- `sub_title`：副标题
- `main_title`：主页标题
- `site_desc`：站点描述
- `site_keywords`：关键词
- `site_meta_script`：自定义 head 脚本
- `footer_html`：页脚 HTML
- `icp_license`：备案号
- `copyright`
- `admin_email`

### 适合怎么填

#### 站点名称

填写你的品牌名即可，比如：

```text
小明导航
```

#### 站点网址

填写完整域名，例如：

```text
https://nav.example.com
```

#### 页面标题 / 主页标题 / 副标题

这三项决定首页主视觉和浏览器标题，不建议全部写成一样。

#### 自定义 head 脚本

适合放：

- 统计代码
- 自定义 meta 标签
- 验证站点所有权的脚本或标签

#### 页脚 HTML

适合放：

- 版权信息
- 备案号链接
- 联系邮箱

后台还自带一个“自动生成”小工具，可快速生成常见页脚 HTML。

![基本信息](/images/go-nav/site-config.png)

## SEO 配置

这个 Tab 目前主要管理：

- `robots.txt` 内容
- 写入 `robots.txt`
- 生成站点地图

### robots.txt

你可以直接在后台编辑 robots 内容，例如：

```text
User-agent: *
Allow: /
```

保存配置后，只是保存到系统配置里；如果要真正写入服务器文件，还需要点击“写入 robots.txt”。

### 站点地图

后台支持触发 Sitemap 生成任务。

如果你希望搜索引擎更快发现页面，这个功能应该开启并定期确认是否正常生成。

![SEO 配置](/images/go-nav/site-config-seo.png)

## 首页配置

这个部分决定前台首页的布局和一些导航 UI。

主要字段包括：

- `brand_icon`：品牌图标
- `sidebar_open`：侧边栏默认展开 / 收起
- `sidebar_title`：侧边栏标题
- `overview_title`：总览标题
- `category_preview_count`：分类预览数量
- `notice`：公告通知
- `header_links`：顶部导航链接
- `sidebar_links`：侧边栏固定链接

### 品牌图标

支持图标类名或图片。适合放在站点名旁边。

### 顶部导航链接

适合放一些全站常用入口，比如：

- 关于我们
- 联系方式
- 友情链接
- 提交推荐

### 侧边栏固定链接

适合放：

- GitHub
- Telegram
- RSS
- 备用网址

![首页配置](/images/go-nav/site-config-home.png)

## 存储配置

存储配置决定上传文件放在哪里。

当前支持：

- 本地存储
- S3 兼容存储

### 本地存储

字段：

- `local_path`：本地目录，默认是 `./static/uploads`
- `local_url`：公开访问前缀，默认是 `/uploads`

适合小站、单机部署。

### S3 兼容存储

字段：

- `s3_access_key`
- `s3_secret_key`
- `s3_endpoint`
- `s3_bucket`
- `s3_public_url`

适合：

- 想把上传资源放对象存储
- 想配 CDN
- 多实例部署

### 注意

S3 存储是授权功能，没有有效 License 时只能使用本地存储。

![存储配置](/images/go-nav/site-config-storage.png)

## 推荐配置

推荐配置控制前台“推荐网站”能力。

主要字段：

- `enabled`：是否启用推荐功能
- `allow_guest_submit`：是否允许游客提交
- `allow_logged_in_submit`：是否允许登录用户提交
- `require_submitter_name`：游客提交是否必须填写姓名
- `require_submitter_email`：游客提交是否必须填写邮箱
- `entry_title`：入口标题
- `entry_description`：入口描述

### 使用建议

#### 如果你想尽量降低垃圾提交

可以这样搭配：

- 开启推荐功能
- 关闭游客提交
- 只允许登录用户提交

#### 如果你想让收集入口更宽松

可以允许游客提交，但建议至少要求邮箱，方便后续联系。

![推荐配置](/images/go-nav/site-config-recommendation.png)

## 系统配置

当前系统配置里，核心开关是：

- `enable_user_system`：是否启用用户系统

关闭后：

- 前台会隐藏登录 / 注册入口

如果你的网站只打算自己维护，不希望开放用户体系，可以关掉。

![系统配置](/images/go-nav/site-config-system.png)

## MCP 服务

MCP 是 Go-Nav 很有特色的能力之一。

当前字段：

- `enabled`：是否启用 MCP
- `api_key`：MCP API 密钥

启用后，客户端可以连接：

```text
https://你的域名/mcp
```

认证方式：

```text
Authorization: Bearer <api_key>
```

### 注意

- 没有有效 License 时，MCP 无法启用
- 如果 `api_key` 留空，等于不校验，不推荐这样做

更详细的能力说明见：[API 与 MCP](./api)

![MCP 服务](/images/go-nav/site-config-mcp.png)

## AI 配置

AI 配置用于接入大模型服务。

主要字段：

- `enable_ai`
- `provider`
- `api_endpoint`
- `api_model`
- `api_key`
- `use_stream`
- `retry_times`
- `system_prompt`
- `parse_prompt`

当前内置了几个常见提供商预设：

- DeepSeek
- OpenAI
- SiliconFlow
- 自定义兼容 OpenAI 协议的服务

### 作用

AI 功能目前主要服务于：

- HTML 解析
- AI 辅助整理导航内容
- 提示词控制

### 提示词部分

AI 配置里还单独提供了提示词编辑：

- 系统提示词
- HTML 解析 Prompt

如果你想让 AI 更贴合你的站点分类结构，这里非常值得调。

![AI 配置](/images/go-nav/site-config-ai.png)

## 授权配置

授权配置只有一个核心字段：

- `code`：License 授权码

后台保存前会先校验授权码是否有效。

当前一些功能依赖授权，例如：

- MCP 服务
- S3 存储

![授权配置](/images/go-nav/site-config-license.png)

## 推荐的配置顺序

如果你刚部署完成，建议按这个顺序配置：

1. 基本信息
2. 首页配置
3. SEO 配置
4. 存储配置
5. 推荐配置
6. 系统配置
7. AI 配置
8. 授权配置
9. MCP 服务

这样不容易漏掉前台最直观的部分。