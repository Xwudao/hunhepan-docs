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
            { text: "缓存 cache", link: "/pc/cache" },
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

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
