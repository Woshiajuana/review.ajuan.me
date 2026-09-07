import { defineConfig } from "vitepress";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";
import { renderSandbox } from "vitepress-plugin-sandpack";
import container from "markdown-it-container";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: "复习鸭",
  description: "好好学习，天天向上！",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  lang: "zh",

  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        path: "src",
        titleFromFile: true,
        collapsed: false,
        ignoreIndexItem: true,
      }) as any,
    ],
  },

  // 主题设置
  themeConfig: {
    // logo
    logo: "/assets/logo.webp",
    siteTitle: "复习鸭",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "MySQL", link: "/mysql/01-basic" },
      {
        text: "面试题",
        items: [
          { text: "HTML & CSS", link: "/interviews/html&css/" },
          { text: "Javascript", link: "/interviews/javascript/" },
          { text: "Typescript", link: "/interviews/typescript/" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    // 尾部
    footer: {
      message:
        '本文档由 <a href="https://www.ajuan.me/">ajuan.me</a> 整理，如发现不对之处，请 <a href="https://github.com/Woshiajuana/review.ajuan.me/issues">点我勘误</a>',
      copyright: `Copyright © 2022-${new Date().getFullYear()} <a href="https://github.com/woshiajuana">Woshiajuana</a>`,
    },

    outline: "deep",
    outlineTitle: "本页目录",

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    darkModeSwitchLabel: "外观",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    langMenuLabel: "选择语言",

    lastUpdated: {
      text: "最近更新时间",
    },
  },

  // markdown 设置
  markdown: {
    lineNumbers: true,

    // 配置
    config(md) {
      md
        // the second parameter is html tag name
        .use(container, "sandbox", {
          render(tokens: any[], idx: number) {
            return renderSandbox(tokens, idx, "sandbox");
          },
        });
    },
  },

  // 网站 sitemap.xml
  sitemap: {
    hostname: "https://review.ajuan.me",
  },
});
