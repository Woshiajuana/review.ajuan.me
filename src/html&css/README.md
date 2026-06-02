## 一、HTML 知识点（核心基础，不包含 HTML5 新增）

### 1. 文档结构与元信息

- `<!DOCTYPE>` 声明
- `<html>`、`<head>`、`<body>`
- `<title>`、`<meta>`（字符集、视口、描述、关键词等）
- `<link>`（外部资源）、`<style>`、`<script>`

### 2. 文本与语义

- 标题：`<h1>`~`<h6>`
- 段落：`<p>`
- 换行：`<br>`、水平线：`<hr>`
- 引用：`<blockquote>`、`<q>`、`<cite>`
- 预格式化：`<pre>`
- 强调：`<strong>`、`<em>`、`<b>`、`<i>`、`<u>`、`<small>`
- 上下标：`<sup>`、`<sub>`
- 时间/日期：`<time>`

### 3. 链接与锚点

- `<a>` 的 `href`、`target`、`title`、`download`、`rel`
- 锚点跳转（`#id`）

### 4. 列表

- 无序列表 `<ul>` + `<li>`
- 有序列表 `<ol>`（`type`、`start`、`reversed`）
- 定义列表 `<dl>`、`<dt>`、`<dd>`

### 5. 表格

- `<table>`、`<tr>`、`<td>`、`<th>`
- 表格结构：`<thead>`、`<tbody>`、`<tfoot>`
- 合并单元格：`colspan`、`rowspan`
- 表格标题 `<caption>`

### 6. 表单（HTML5 之前）

- `<form>`（`action`、`method`、`enctype`、`target`）
- `<input>` 类型（text, password, hidden, submit, reset, button, file, radio, checkbox）
- `<textarea>`、`<select>` + `<option>`、`<button>`
- 标签 `<label>`（`for` 属性）
- 字段集 `<fieldset>` + `<legend>`

### 7. 嵌入内容

- `<img>`（`src`、`alt`、`width`、`height`）
- `<iframe>`（内嵌页面）
- `<object>`、`<embed>`（插件，现已少用）
- 图片热区 `<map>` + `<area>`

### 8. 其他基础元素

- 容器 `<div>`、行内容器 `<span>`
- 注释 `<!-- -->`
- 字符实体（如 `&lt;` `&gt;` `&nbsp;` `&copy;`）

---

## 二、HTML5 新增知识点（包含新语义、新 API 和特性）

### 1. 语义化元素

- 结构类：`<header>`、`<footer>`、`<main>`、`<section>`、`<article>`、`<nav>`、`<aside>`
- 内容分组：`<figure>` + `<figcaption>`、`<mark>`、`<details>` + `<summary>`
- 进度/度量：`<progress>`、`<meter>`
- 地址：`<address>`（已存在但 HTML5 重新定义）
- 对话：`<dialog>`（需配合 JavaScript）

### 2. 表单增强

- 新增 input 类型：`email`、`url`、`tel`、`number`、`range`、`date`、`datetime-local`、`month`、`week`、`time`、`color`、`search`
- 新增属性：`placeholder`、`required`、`autofocus`、`autocomplete`、`novalidate`、`pattern`、`min`/`max`/`step`、`multiple`、`formaction`、`formenctype`、`formmethod`、`formtarget`、`list`（与 `<datalist>` 配合）
- 新元素：`<datalist>`（预定义选项）、`<output>`（计算结果显示）、`<keygen>`（已废弃）、`<input type="file" accept>`

### 3. 多媒体

- `<video>`（`src`、`controls`、`autoplay`、`loop`、`muted`、`poster`、`width/height`，支持 WebVTT 字幕 `<track>`）
- `<audio>`（类似 `<video>` 但无画面）
- `<source>`（为 `<picture>`、`<video>`、`<audio>` 提供多格式资源）
- `<track>`（字幕、章节等）

### 4. 图形与绘图

- `<canvas>`（2D 绘图 API：路径、矩形、文本、图像、像素操作等）
- SVG（可缩放矢量图形，作为内联元素或外部嵌入）
- `<picture>`（响应式图片，配合 `srcset`、`sizes`）
- `<img srcset>` 和 `sizes` 属性（响应式图像）

### 5. 嵌入与交互

- `<embed>`（标准化嵌入插件，以前非标准）
- `<iframe>` 新增属性：`srcdoc`、`sandbox`、`seamless`（已弃用）、`allow`（权限策略）
- `<details>` + `<summary>`（展开/折叠）
- `<menu>`（上下文菜单，支持度低）和 `<menuitem>`（已废弃）

### 6. 离线与存储

- Web Storage：`localStorage`、`sessionStorage`
- IndexedDB（异步数据库）
- Application Cache（已废弃，现由 Service Worker + Cache API 替代）
- File API：`FileReader`、`Blob`、`FileList`
- 拖拽 API（Drag and Drop）：`draggable` 属性、拖拽事件

### 7. 通信与网络

- WebSocket
- Server-Sent Events (EventSource)
- XMLHttpRequest Level 2（跨域、进度事件、FormData）
- Fetch API（通常归为 JS API，但 HTML5 时代兴起）

### 8. 设备与硬件访问

- Geolocation API（地理位置）
- 设备方向 DeviceOrientation 事件
- 摄像头/麦克风（getUserMedia / MediaDevices）
- Vibration API（振动）
- Battery API（电量）

### 9. 历史与导航

- History API：`pushState`、`replaceState`、`popstate` 事件

### 10. 其他 API

- Web Workers（多线程）
- Notification API（桌面通知）
- Page Visibility API
- Fullscreen API
- Clipboard API（剪贴板）
- 请求动画帧 `requestAnimationFrame`（通常归为 JS，但属于 HTML5 标准）
- 微数据（Microdata）和 `itemscope` / `itemprop`（语义标注）
- `<template>` 元素（HTML 模板）
- 自定义数据属性 `data-*`

---

## 三、CSS 知识点（核心基础，不包含 CSS3 新增）

### 1. 基本语法与选择器

- 规则集：选择器 `{ 属性: 值; }`
- 基础选择器：
  - 通用选择器 `*`
  - 类型选择器（元素名）
  - 类选择器 `.class`
  - ID 选择器 `#id`
  - 属性选择器 `[attr]`、`[attr=value]`（CSS2 支持部分，完整在 CSS3）
- 组合选择器：
  - 后代 ` `（空格）
  - 子元素 `>`
  - 相邻兄弟 `+`
  - 通用兄弟 `~`（CSS2 部分浏览器支持，CSS3 明确）
- 伪类（CSS2）：
  - `:link`、`:visited`、`:hover`、`:active`（LVHA）
  - `:focus`
  - `:first-child`
  - `:lang()`
- 伪元素（CSS2）：
  - `:first-line`、`:first-letter`
  - `:before`、`:after`（CSS2 中为单冒号，但 CSS3 要求双冒号）

### 2. 盒模型

- `width` / `height`
- `padding`、`border`、`margin`
- 标准盒模型（`box-sizing: content-box`）
- `display` 基本值：`block`、`inline`、`inline-block`、`none`
- `visibility`

### 3. 布局定位

- 普通流、浮动 `float`（`left`、`right`、`none`）、`clear`
- 定位 `position`：`static`、`relative`、`absolute`、`fixed`（`fixed` 在 CSS2 已存在）
- `z-index` 堆叠上下文
- `overflow`（`visible`、`hidden`、`scroll`、`auto`）

### 4. 文本与字体

- `font-family`、`font-size`、`font-weight`、`font-style`、`font-variant`
- `line-height`、`text-align`、`text-decoration`、`text-indent`、`text-transform`
- `letter-spacing`、`word-spacing`
- `color`、`background-color`
- `vertical-align`

### 5. 背景（CSS2.1）

- `background-color`、`background-image`、`background-repeat`、`background-attachment`、`background-position`

### 6. 列表与表格

- 列表：`list-style-type`、`list-style-image`、`list-style-position`
- 表格：`border-collapse`、`border-spacing`、`caption-side`、`empty-cells`、`table-layout`

### 7. 其他属性

- `cursor`（鼠标样式）
- `outline`（轮廓，不影响盒模型）
- `white-space`（空格处理）
- `content`（配合 `:before`/`:after`）

---

## 四、CSS3 新增知识点（模块化新特性）

### 1. 新增选择器

- 属性选择器增强：
  - `[attr^=value]`（以 value 开头）
  - `[attr$=value]`（以 value 结尾）
  - `[attr*=value]`（包含 value）
- 伪类：
  - 结构伪类：`:root`、`:empty`、`:nth-child(n)`、`:nth-last-child(n)`、`:nth-of-type(n)`、`:nth-last-of-type(n)`、`:first-of-type`、`:last-of-type`、`:only-child`、`:only-of-type`
  - 否定伪类：`:not(selector)`
  - 目标伪类：`:target`
  - UI 状态伪类：`:enabled`、`:disabled`、`:checked`、`:indeterminate`、`:required`、`:optional`、`:valid`、`:invalid`、`:in-range`、`:out-of-range`、`:read-only`、`:read-write`
- 伪元素双冒号规范：`::before`、`::after`、`::first-line`、`::first-letter`、`::selection`（文本选中样式）

### 2. 圆角、阴影与边框背景增强

- `border-radius`（圆角，支持四值、八值简写）
- `box-shadow`（外阴影、内阴影 `inset`，多阴影）
- `border-image`（边框图像）
- `background` 增强：
  - 多背景图片（逗号分隔）
  - `background-size`（`cover`、`contain`、长度/百分比）
  - `background-origin`（背景定位区域）
  - `background-clip`（背景裁切区域）
- `box-decoration-break`（边框和背景在元素分片时的行为）

### 3. 渐变（Gradients）

- 线性渐变 `linear-gradient()`
- 径向渐变 `radial-gradient()`
- 重复渐变 `repeating-linear-gradient()` / `repeating-radial-gradient()`

### 4. 文本效果

- `text-shadow`（文本阴影）
- `text-overflow`（`ellipsis` 文本溢出省略号）
- `word-wrap` / `overflow-wrap`（长单词换行）
- `word-break`（断词规则）
- `white-space` 新增值
- `text-transform` 增强（无实质 CSS3 新增值，但配合 `@font-face`）
- `@font-face`（自定义字体，CSS3 标准化）

### 5. 2D/3D 变换（Transforms）

- **2D 变换**：`transform` 函数：`translate()`、`rotate()`、`scale()`、`skew()`、`matrix()`
- **3D 变换**：`translate3d()`、`rotate3d()`、`scale3d()`、`perspective()`、`matrix3d()`
- 变换原点 `transform-origin`
- 3D 透视 `perspective`（父级属性）和 `perspective-origin`
- 背面可见性 `backface-visibility`

### 6. 过渡（Transitions）

- `transition-property`
- `transition-duration`
- `transition-timing-function`（`ease`、`linear`、`ease-in`、`ease-out`、`ease-in-out`、`cubic-bezier()`）
- `transition-delay`
- 简写 `transition`

### 7. 动画（Animations）

- `@keyframes` 定义关键帧
- `animation-name`、`animation-duration`、`animation-timing-function`、`animation-delay`、`animation-iteration-count`（`infinite`）
- `animation-direction`（`normal`、`reverse`、`alternate`、`alternate-reverse`）
- `animation-fill-mode`（`none`、`forwards`、`backwards`、`both`）
- `animation-play-state`（`running`、`paused`）
- 简写 `animation`

### 8. 多列布局（Multi-column Layout）

- `column-count`、`column-width`
- `column-gap`、`column-rule`
- `column-span`（跨列）
- `column-fill`（高度平衡）

### 9. 弹性盒布局（Flexbox）

- 容器属性：
  - `display: flex` / `inline-flex`
  - `flex-direction`（`row`、`row-reverse`、`column`、`column-reverse`）
  - `flex-wrap`（`nowrap`、`wrap`、`wrap-reverse`）
  - `flex-flow`（简写）
  - `justify-content`（主轴对齐：`flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`space-evenly`）
  - `align-items`（交叉轴对齐：`stretch`、`flex-start`、`flex-end`、`center`、`baseline`）
  - `align-content`（多行交叉轴对齐）
- 项目属性：
  - `order`（排序）
  - `flex-grow`、`flex-shrink`、`flex-basis`
  - `flex`（简写）
  - `align-self`（覆盖容器的 `align-items`）

### 10. 网格布局（Grid）

- 容器属性：
  - `display: grid` / `inline-grid`
  - 定义行列：`grid-template-rows`、`grid-template-columns`（支持 `fr` 单位、`repeat()`、`minmax()`）
  - `grid-template-areas`
  - `gap` / `grid-gap`（`row-gap`、`column-gap`）
  - 对齐：`justify-items`、`align-items`、`justify-content`、`align-content`
- 项目属性：
  - 定位：`grid-row`、`grid-column`（`span` 关键字）
  - `grid-area`（配合模板区域或行列坐标）
  - `justify-self`、`align-self`

### 11. 媒体查询（Media Queries）

- `@media` 规则
- 媒体类型（`all`、`screen`、`print` 等）
- 媒体特性：`width`、`height`、`device-width`、`orientation`、`resolution`、`aspect-ratio`、`prefers-color-scheme` 等
- 逻辑运算符 `and`、`not`、`only`、`,`（逗号表示 or）

### 12. 变量（Custom Properties）

- `--var-name` 定义变量
- `var(--var-name, fallback)` 使用

### 13. 颜色与透明度

- `rgba()`、`hsla()` 颜色模式
- `opacity`（元素整体透明度）
- 新增颜色关键字 `transparent`（CSS2 已有但 CSS3 标准化）

### 14. 盒模型增强

- `box-sizing: border-box`（CSS3 正式纳入，让宽度包含 padding 和 border）

### 15. 滤镜与混合模式

- `filter`（`blur()`、`brightness()`、`contrast()`、`drop-shadow()`、`grayscale()`、`hue-rotate()`、`invert()`、`opacity()`、`saturate()`、`sepia()`、`url()` 引用 SVG 滤镜）
- `backdrop-filter`（背景滤镜）
- `mix-blend-mode`（元素内容与背景混合）
- `background-blend-mode`（多背景图片混合）

### 16. 遮罩与裁剪

- `clip-path`（裁剪路径，支持多边形、圆形、椭圆、SVG 路径）
- `mask`、`mask-image`、`mask-mode` 等（遮罩，部分浏览器前缀）

### 17. 滚动行为

- `scroll-behavior: smooth`（平滑滚动）
- `overflow` 新增 `overflow-x`、`overflow-y`
- 滚动捕捉（Scroll Snap）：`scroll-snap-type`、`scroll-snap-align` 等

### 18. 用户界面

- `resize`（允许用户调整元素尺寸）
- `outline` 增强（`outline-offset`）
- `caret-color`（光标颜色）
- `pointer-events`（控制鼠标事件穿透）

### 19. 书写模式与逻辑属性

- `writing-mode`（水平/垂直书写）
- 逻辑属性（`margin-inline`、`padding-block` 等）以适应不同书写方向

### 20. 其他

- `will-change`（性能优化，提前告知浏览器即将变化的属性）
- `content` 属性支持 `attr()` 获取 HTML 属性值
- `@supports`（特性检测）
- `initial`、`inherit`、`unset`、`revert` 全局关键字（部分 CSS3 引入）

---

> 以上知识点覆盖了前端开发中 HTML、HTML5、CSS、CSS3 的核心内容。注意部分 API（如 Service Worker、WebRTC）虽常与 HTML5 一同讨论，但严格属于 Web API 而非 HTML 语言规范。实际学习建议结合最新浏览器兼容性和 W3C 规范更新。
