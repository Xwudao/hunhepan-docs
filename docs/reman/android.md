---
outline: deep
---


# 安卓端

ReMan自 2025/2/20 起，支持安卓端；特点：

1. 原生安卓应用，非网页套壳
2. 自动检测是否安装相应网盘APP，有则直接调用打开，**有助于网盘拉新**

支持：需 `ReMan v1.1.0+`

价格：原则上不免费，但现阶段可以免费构建、免费使用

## 构建

打开 Github : <https://github.com/Xwudao/reman-app-release>

创建issue：
标题为`[BUILD] 这里任意填`，
内容为：

```markdown
app_id: com.lzpanx.com
api_url: https://www.lzpanx.com
app_name: 懒盘搜索
```

注意：

- app_id 为包名，例如 com.tencent.mm
- api_url 为网站首页，末尾不要带/，例如 <https://weixin.qq.com>  
- app_name 为 APP 名称，例如 ReMan
- 中间冒号为英文冒号，不要使用中文冒号
- 标题中的`[BUILD]`不要修改

若队列中无其它任务，会立即构建，否则会排队等待。

开始构建时，会评论：

```markdown
🚀 Build process started...
```

构建完成后，会评论：

```markdown
✅ Build completed successfully!

Version: v0.0.3
Download: https://github.com/Xwudao/reman-app-release/releases/tag/v0.0.3
```

## 截图

![安卓app](/images/android/2025-02-20_185103.png)