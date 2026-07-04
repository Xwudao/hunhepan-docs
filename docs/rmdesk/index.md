---
outline: deep
keywords: ['RmDesk', 'Tauri桌面应用', '夸克网盘管理', 'ReMan管理']
---

# RmDesk

`RmDesk` 是一款基于 **Tauri + React** 构建的跨平台桌面应用程序，将常用网盘资源管理能力集中到同一处，提供紧凑、顺手的桌面工作台体验。

## 功能概览

- **夸克网盘管理** — 浏览文件目录、管理分享链接、保存资源到网盘
- **ReMan 管理** — 连接 ReMan 站点，查看资源列表、热门资源、转存管理等
- **多账户支持** — 夸克网盘和 ReMan 均支持多账户切换




## 下载与安装

请从以下地址下载对应平台的安装包：

<https://github.com/Xwudao/rmdesk-release/releases>

注意：

由于没有签名，Windows 可能会提示「未知发布者」，请点击「更多信息」->「仍要运行」即可。

**支持平台：**

- Windows（x64）


## 使用说明

### 夸克网盘

通过 Cookie 登录夸克网盘账户，即可浏览网盘文件、管理分享链接以及保存资源。

<!-- ![夸克网盘-文件浏览]($TODO_SCREENSHOT_QUARK_FILES) -->
![夸克网盘-文件浏览](/images/index/image-20.png)

*夸克网盘文件浏览界面*

<!-- ![夸克网盘-我的分享]($TODO_SCREENSHOT_QUARK_SHARES) -->
![夸克网盘-我的分享](/images/index/image-21.png)

*夸克网盘分享管理界面*

**操作步骤：**

1. 在设置弹窗中输入夸克网盘 Cookie
2. 选择需要操作的账户
3. 在「文件浏览」标签页中浏览目录和文件
4. 在「我的分享」标签页中查看和管理分享链接
5. 支持一键保存资源到网盘

### ReMan 管理

连接已部署的 ReMan 站点，在桌面端即可管理资源、查看热门数据。

<!-- ![ReMan-资源列表]($TODO_SCREENSHOT_REMAN_LIST) -->
![ReMan-资源列表](/images/index/image-22.png)

*ReMan 资源列表界面*

<!-- ![ReMan-热门资源]($TODO_SCREENSHOT_REMAN_HOT) -->
![ReMan-热门资源](/images/index/image-23.png)

*ReMan 热门资源界面*

**操作步骤：**

1. 在配置弹窗中输入 ReMan 站点地址和 Token
2. 连接成功后即可查看资源列表
3. 支持按状态、网盘类型筛选资源
4. 查看热门资源排行
5. 支持资源转存管理

## 系统截图

### 首页

<!-- ![RmDesk 首页]($TODO_SCREENSHOT_HOME) -->
![RmDesk 首页](/images/index/image-24.png)

*应用首页 — 快捷入口*

### 夸克网盘

<!-- ![夸克网盘-设置Cookie]($TODO_SCREENSHOT_QUARK_SETTINGS) -->
![夸克网盘-设置Cookie](/images/index/image-25.png)

*夸克网盘 Cookie 设置弹窗*

<!-- ![夸克网盘-保存资源]($TODO_SCREENSHOT_QUARK_SAVE) -->
![夸克网盘-保存资源](/images/index/image-29.png)

*资源保存弹窗*

### ReMan 管理

<!-- ![ReMan-配置连接]($TODO_SCREENSHOT_REMAN_CONFIG) -->
![ReMan-配置连接](/images/index/image-27.png)

*ReMan 站点配置弹窗*

<!-- ![ReMan-转存管理]($TODO_SCREENSHOT_REMAN_TRANSFER) -->
![ReMan-转存管理](/images/index/image-28.png)
*ReMan 转存管理弹窗*

## 常见问题

**Q: RmDesk 需要付费吗？**

A: RmDesk 需要授权码激活使用，请联系微信 `apkapb` 获取。

**Q: 夸克网盘 Cookie 会保存在哪里？**

A: Cookie 信息仅保存在本地，使用 Zustand 持久化存储，不会上传到任何服务器。

**Q: 支持 macOS 吗？**

<!-- A: 支持 Intel 和 Apple Silicon 芯片的 Mac，请下载对应版本的安装包。 -->
A: 暂不提供 macOS 版本，后续会考虑提供。

**Q: ReMan 站点需要什么版本？**

A: 建议使用最新版本的 ReMan 服务端，以确保 API 兼容性（V > 1.26.0）。
