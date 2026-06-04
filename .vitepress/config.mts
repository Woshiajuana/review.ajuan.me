import { defineConfig } from "vitepress";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";
import { renderSandbox } from "vitepress-plugin-sandpack";
import container from "markdown-it-container";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: "答题卡",
  description: "好好学习，天天向上！",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  lang: "zh",

  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        path: "src",
        titleFromFile: true,
        sideBarItemsResolved(data) {
          const list = data.map((item) => {
            return { sort: item.text === "指南" ? -1 : 99, ...item };
          });

          // 排序
          list.sort((a, b) => a.sort - b.sort);

          return list;
        },
      }) as any,
    ],
  },

  // 主题设置
  themeConfig: {
    // logo
    logo: "/assets/logo.png",
    siteTitle: "答题卡",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      {
        text: "前端面试",
        items: [
          { text: "HTML & CSS", link: "/html&css/" },
          { text: "Typescript", link: "/typescript/" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    // 尾部
    footer: {
      message:
        '本文档由 <a href="https://www.ajuan.me/">ajuan.me</a> 整理，如发现不对之处，请 <a href="https://github.com/Woshiajuana/answer-sheet.ajuan.me/issues">点我勘误</a>',
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
    hostname: "https://code.daysnap.cn",
  },
});
