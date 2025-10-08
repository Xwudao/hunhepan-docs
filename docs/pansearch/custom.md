---
outline: deep
---

# 自定义前端模板

从版本v0.2.4起，二进制文件中已内嵌templates目录，无需单独放置。

若需要自定义前端模板，可以将templates目录放置到和二进制文件、配置文件同级目录。

## 步骤

1. 修改配置文件

    ```yml
    app:
        mode: debug # <- here  将 mode 设置为 debug
    ```

2. 用vscode之类的编辑器打开 templates 目录，修改里面的 html 和 css 文件。

3. 浏览器打开 `http://127.0.0.1:6655` 查看效果。

## 视频教程

<https://www.bilibili.com/video/BV1wJ4Fz9ELE/>
