import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "混合盘规则文档",
  description:
    "混合盘是一个规则引擎，可以制作规则搜索资源，典型的是网盘、磁力搜索规则；本文档告诉用户如何编写规则；",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "PC端文档", link: "/pc/" },
    ],

    sidebar: {
      "/pc/": [
        {
          text: "全局变量",
          items: [
            { text: "加解密 crpto", link: "/pc/crypto" },
            { text: "编码 encode", link: "/pc/encode" },
            { text: "缓存 cache", link: "/pc/cache" },
            { text: "Cookie cookies", link: "/pc/cookies" },
            { text: "网络请求 http", link: "/pc/http" },
            { text: "HTML解析 html", link: "/pc/html" },
            { text: "APP app", link: "/pc/app" },
          ],
        },
        {
          text: "获取网站Cookies",
          items: [
            { text: "浏览器器开发者控制台获取", link: "/pc/get-cookies-dev" },
            { text: "使用Cookie-editor插件获取", link: "/pc/get-cookies-crx" },
          ],
        },
      ],
      "/android/": [
        {
          text: "PC端文档",
          items: [{ text: "算法", link: "/pc/algo" }],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com" }],
  },
});
