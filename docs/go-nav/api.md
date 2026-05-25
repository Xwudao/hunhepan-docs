---
outline: deep
title: Go-Nav MCP Server
---

# Go-Nav MCP Server

Go-Nav 内置了一个基于 [Model Context Protocol](https://modelcontextprotocol.io) 的服务端点，允许 Claude Desktop、Cursor、VS Code Copilot 等 AI 客户端直接管理你的导航站——创建分类、录入链接、上传图片、更新站点信息，全部通过自然语言完成。

## 使用前提

必须同时满足以下三个条件：

1. **License 有效** — 未授权实例会返回 `402 Payment Required`
2. **后台已启用 MCP** — 在站点配置页面打开 MCP 开关
3. **已配置 API Key** — 在站点配置页面生成并保存一个强随机密钥

## 接入方式

MCP 服务端点为：

```
POST https://your-domain.com/mcp
```

鉴权使用标准 Bearer Token：

```http
Authorization: Bearer <你的 API Key>
```

### 客户端配置示例

大多数支持 MCP 的 AI 客户端只需配置以下两项：

```json
{
  "mcpServers": {
    "go-nav": {
      "type": "http",
      "url": "https://your-domain.com/mcp",
      "headers": {
        "Authorization": "Bearer your-api-key"
      }
    }
  }
}
```

不同客户端的配置文件路径各异，但核心字段一致。

## 可用工具

### 图片上传

#### `upload_image_from_url`

从公开 URL 下载图片并上传到导航站存储，返回可公开访问的图片 URL。

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | string | 图片的公开访问地址（必填） |

#### `upload_image_from_base64`

解码 Base64 图片数据并上传到导航站存储，返回可公开访问的图片 URL。

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | string | Base64 编码的图片数据，支持原始 base64 或 `data:image/png;base64,...` 格式 |
| `extension` | string | 文件扩展名，如 `.jpg`、`.png`（原始 base64 时必填） |

---

### 分类管理

#### `list_nav_categories`

获取所有导航分类的平铺列表（含嵌套分类），返回字段包括 `id`、`name`、`icon`、`sort_order`、`parent_id`。

无需参数。

#### `create_nav_category`

创建新的导航分类。

| 参数 | 类型 | 说明 |
|------|------|------|
| `name` | string | 分类显示名称（必填） |
| `icon` | string | UnoCSS 图标类名（如 `i-mdi-home`）或图片 URL，可通过 `search_icons` 查找 |
| `sort_order` | int | 排序权重，值越小越靠前，默认 1 |
| `parent_id` | int64 | 父分类 ID，用于创建子分类；顶级分类可省略 |

#### `update_nav_category`

按 ID 更新已有分类。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | int64 | 要修改的分类 ID（必填） |
| `name` | string | 新显示名称 |
| `icon` | string | 新图标类名或图片 URL |
| `sort_order` | int | 新排序权重 |
| `parent_id` | int64 | 新父分类 ID；设为 `null` 可将其提升为顶级分类 |

#### `delete_nav_category`

按 ID 删除分类。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | int64 | 要删除的分类 ID（必填） |

---

### 导航项管理

#### `list_nav_items`

列出导航项，支持按分类过滤和分页。

| 参数 | 类型 | 说明 |
|------|------|------|
| `category_id` | int64 | 按分类筛选；省略或为 0 时返回全部 |
| `page` | int | 页码（从 1 开始），默认 1 |
| `page_size` | int | 每页条数，默认 50 |

#### `create_nav_item`

在指定分类下创建新的导航项（链接或文章）。

| 参数 | 类型 | 说明 |
|------|------|------|
| `category_id` | int64 | 所属分类 ID（必填） |
| `type` | string | 类型：`link`（URL 书签）或 `article`（Markdown 文章） |
| `title` | string | 显示标题（必填） |
| `url` | string | 目标 URL，`type=link` 时必填 |
| `description` | string | 副标题/简介 |
| `icon` | string | UnoCSS 图标类名或图片 URL |
| `content` | string | Markdown 文章内容，`type=article` 时使用 |
| `tags` | string[] | 标签列表 |
| `sort_order` | int | 分类内排序权重，默认 1 |

#### `update_nav_item`

按 ID 更新已有导航项，只有提供的字段会被修改。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | int64 | 要修改的导航项 ID（必填） |
| 其余字段 | — | 同 `create_nav_item`，省略则保持原值 |

#### `delete_nav_item`

按 ID 删除导航项。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | int64 | 要删除的导航项 ID（必填） |

---

### 站点信息

#### `get_site_info`

获取当前站点配置，包括名称、标题、描述、URL、关键词、联系邮箱等字段。

无需参数。

#### `update_site_info`

更新站点信息，只有提供的字段会被修改，省略字段保持原值。

---

### 图标搜索

#### `search_icons`

模糊搜索内置 UnoCSS 图标库，返回匹配的图标类名（如 `i-mdi-home`），可直接用于分类或导航项的 `icon` 字段。

| 参数 | 类型 | 说明 |
|------|------|------|
| `query` | string | 搜索关键词，如 `home`、`github`、`code` |

## 典型使用场景

### 批量导入旧导航站

把旧导航站的 HTML 或链接清单发给 AI，让它调用 `create_nav_category` + `create_nav_item` 批量整理入库，省去手动逐条录入。

### 自动化内容维护

定时让 AI 检查并更新站点标题、描述、关键词等 SEO 字段，或批量替换失效链接。

### AI 驱动内容录入

将 Go-Nav 作为 AI 工作流的执行端：AI 抓取、分析内容后直接写入导航站，而不只是输出文本。

## 安全建议

- MCP API Key 使用强随机字符串，不要留空或使用简单密码
- 生产环境务必走 HTTPS，避免 Bearer Token 明文传输
- 反代时只暴露应用端口（默认 `8080`），不要将 MySQL / Redis 暴露到公网
- 如无必要，不要在不可信网络中暴露 `/mcp` 端点