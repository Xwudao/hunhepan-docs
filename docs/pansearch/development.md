# 开发样式说明

为了方便地修改 HTML 和 CSS 文件，你需要启用调试模式。这将允许你在不重启程序的情况下实时查看更改。

## 启用调试模式

1. 打开 `config.yml` 配置文件。
2. 将 `app.mode` 的值从 `release` 更改为 `debug`：

   ```yml
   app:
     mode: debug  # 改为 debug 以启用开发模式
     # ...existing code...
   ```

3. 保存配置文件后，重启程序。
4. 现在，你可以直接修改 `templates` 目录下的 HTML 文件（如 `index.html`、`search.html` 等）和 `static` 目录下的 CSS 文件（如 `main.css`、`utils.css`）。
5. 更改将自动反映在浏览器中，无需重启服务器。
6. 可能由于浏览器缓存问题，建议在浏览器中使用无痕模式访问，或清除缓存后查看更改。
    - 可以f12打开开发者工具，Network选项卡，勾选Disable cache（禁用缓存），然后刷新页面查看更改。

> 注意：生产环境中应保持 `mode: release` 以优化性能。
