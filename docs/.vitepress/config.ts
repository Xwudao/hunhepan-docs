import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '混合盘规则文档',
  description:
    '混合盘是一个规则引擎，可以制作规则搜索资源，典型的是网盘、磁力搜索规则；本文档告诉用户如何编写规则；',
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'ReMan', link: '/reman/' },
      { text: '开放API', link: '/api-docs' },
      { text: 'Android端文档', link: '/android/' },
      { text: 'PC端文档', link: '/pc/' },
    ],

    sidebar: {
      '/pc/': [
        {
          text: '使用帮助',
          items: [
            { text: '使用帮助', link: '/pc/usage' },
            { text: '导入默认规则', link: '/pc/import-default-rule' },
            { text: 'JS引擎说明', link: '/pc/js-engine-usage' },
            { text: '规则模板说明', link: '/pc/rule-template' },
          ],
        },
        {
          text: '全局变量',
          items: [
            { text: '加解密 crpto', link: '/pc/crypto' },
            { text: '编码 encode', link: '/pc/encode' },
            { text: '缓存 cache', link: '/pc/cache' },
            { text: 'Cookie cookies', link: '/pc/cookies' },
            { text: '网络请求 http', link: '/pc/http' },
            { text: 'HTML解析 html', link: '/pc/html' },
            { text: 'APP app', link: '/pc/app' },
          ],
        },
        {
          text: '获取网站Cookies',
          items: [
            { text: '浏览器器开发者控制台获取', link: '/pc/get-cookies-dev' },
            { text: '使用Cookie-editor插件获取', link: '/pc/get-cookies-crx' },
          ],
        },
      ],
      '/android/': [
        {
          text: '帮助说明',
          items: [
            { text: '使用帮助', link: '/android/usage' },
            { text: 'JS引擎说明', link: '/android/js-engine-usage' },
          ],
        },
        {
          text: '全局变量',
          items: [
            { text: '通用全局变量', link: '/android/common' },
            { text: '网络 net', link: '/android/net' },
            { text: '编码 encode', link: '/android/encode' },
            { text: '加解密 encode', link: '/android/crypto' },
          ],
        },
      ],
      '/reman/': [
        {
          text: '总览',
          link: '/reman/',
        },
        {
          text: '系统使用介绍',
          items: [
            { text: '首页热搜影视词', link: '/reman/film' },
            { text: '一些功能的理解', link: '/reman/cleavage' },
            { text: 'API接口使用', link: '/reman/api' },
          ],
        },
        {
          text: '一些教程',
          items: [
            { text: '使用PM2管理进程', link: '/reman/pm2' },
            { text: '安装elasticsearch', link: '/reman/elasticsearch' },
            { text: '运行多个网站（实例）', link: '/reman/multiple' },
            { text: '常见问题与解决方法', link: '/reman/problems' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Xwudao/hunhepan-docs' },
    ],
  },
});
