import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '混合盘规则文档',
  markdown: {
    externalLinks: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  },
  sitemap: {
    hostname: 'https://docs.hunhepan.com',
  },
  description:
    '混合盘是一个规则引擎，可以制作规则搜索资源，典型的是网盘、磁力搜索规则；本文档告诉用户如何编写规则；',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: 'Xwudao' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          '混合盘规则文档,网盘搜索引擎源码,阿里云盘搜索引擎源码,百度网盘搜索引擎源码,夸克网盘搜索引擎源码',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '流量卡合作', link: '/sim/' },
      { text: 'ReMan', link: '/reman/' },
      { text: '开放API', link: '/api-docs' },
      { text: 'Android端文档', link: '/android/' },
      { text: 'PC端文档', link: '/pc/' },
    ],

    sidebar: {
      '/hunhepan/': [
        {
          text: '混合盘',
          items: [
            { text: '混合盘文档', link: '/hunhepan/' },
            { text: '资源提交公约', link: '/hunhepan/convention' },
          ],
        },
      ],
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
          text: '安装帮助',
          items: [
            {
              text: '总览',
              link: '/reman/',
            },
            {
              text: '使用宝塔',
              link: '/reman/bt',
            },
            {
              text: '从零开始安装Reman',
              link: '/reman/complete-install',
            },
          ],
        },
        {
          text: '系统使用介绍',
          items: [
            { text: '首页热搜影视词', link: '/reman/film' },
            { text: '一些功能的理解', link: '/reman/cleavage' },
            { text: 'API接口使用', link: '/reman/api' },
            { text: '配套爬虫程序', link: '/reman/crawl' },
            { text: '一些命令帮助', link: '/reman/cmd-help' },
            { text: 'Google Adsense', link: '/reman/ads' },
          ],
        },
        {
          text: '一些教程',
          items: [
            { text: 'Docker安装', link: '/reman/docker' },
            { text: 'Caddy介绍安装', link: '/reman/caddy' },
            { text: '使用PM2管理进程', link: '/reman/pm2' },
            { text: '安装elasticsearch', link: '/reman/elasticsearch' },
            { text: '运行多个网站（实例）', link: '/reman/multiple' },
            { text: '常见问题与解决方法', link: '/reman/problems' },
            { text: '帮忙安装后的说明', link: '/reman/help-install' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Xwudao/hunhepan-docs' },
    ],
  },
});
