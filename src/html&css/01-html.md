# HTML 基础

## 一、HTML 核心基础知识点详细补充（针对“知识点一”）

> 以下对原始列出的 HTML 核心基础（不含 HTML5）逐项深入展开，涵盖常见细节、最佳实践及注意事项。

---

### 1. 文档结构与元信息

#### `<!DOCTYPE>`

- **作用**：告知浏览器使用哪种 HTML 版本解析文档，避免“怪异模式”（Quirks Mode）。
- **标准写法**：HTML5 中简写为 `<!DOCTYPE html>`（不区分大小写）。
- **历史**：HTML 4.01 有复杂 DTD 引用（如 `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`），现在统一推荐 HTML5 DOCTYPE。

#### `<html>`、`<head>`、`<body>`

- `<html>`：根元素，可指定 `lang` 属性（如 `lang="zh-CN"`）提升可访问性和 SEO。
- `<head>`：存放元数据、资源引用，内容不直接显示。
- `<body>`：可见内容。

#### `<title>`

- 必需在 `<head>` 内，定义页面标题（浏览器标签栏、收藏夹标题、搜索引擎结果标题）。
- 长度建议不超过 60 字符（SEO 和显示）。

#### `<meta>`

- **字符集**：`<meta charset="UTF-8">` 应放在 `<head>` 最前。
- **视口（移动端）**：`<meta name="viewport" content="width=device-width, initial-scale=1.0">`（属于 HTML5，但现为标配）。
- **描述**：`<meta name="description" content="...">` 用于 SEO 摘要。
- **关键词**：`<meta name="keywords" content="...">`（搜索引擎已不重视）。
- **作者**：`<meta name="author" content="...">`
- **刷新/重定向**：`<meta http-equiv="refresh" content="5;url=https://example.com">`（不推荐，影响用户体验）。

#### `<link>`

- 外部资源链接，常见用途：
  - CSS：`<link rel="stylesheet" href="style.css">`
  - 网站图标：`<link rel="icon" href="favicon.ico" type="image/x-icon">`
  - 预连接/预加载：`rel="preconnect"`、`rel="preload"`（HTML5 增强）
  - 备选样式：`rel="alternate stylesheet" title="皮肤名"`（需浏览器支持）

#### `<style>`

- 内嵌 CSS，推荐放在 `<head>` 内，属性 `type="text/css"` 可省略。
- `scoped` 属性（已废弃）曾用于限定样式作用域。

#### `<script>`

- 默认阻塞解析，建议将普通脚本放在 `</body>` 前，或使用 `async` / `defer`（HTML5 属性）。
- `<script src="..."></script>` 引入外部 JS。

---

### 2. 文本与语义

#### 标题 `<h1>`~`<h6>`

- 重要性逐级递减，每个页面通常只有一个 `<h1>`（主标题）。
- 有助于 SEO 和无障碍（屏幕阅读器）。
- 不要仅为了加粗而使用标题，应使用 CSS 和 `<strong>`/`<b>`。

#### `<p>` 段落

- 浏览器自动添加上下边距，块级元素。
- 不要用 `<br>` 连续换行替代段落。

#### `<br>` 换行、`<hr>` 水平线

- `<br>` 用于内联换行（如地址、诗歌）。
- `<hr>` 表示主题分隔，视觉上为横线。

#### 引用

- `<blockquote>`：块级引用，可加 `cite` 属性指向来源 URL。
- `<q>`：行内引用，自动加引号（取决于浏览器）。
- `<cite>`：标记作品标题（书籍、文章等），通常斜体。

#### 预格式化 `<pre>`

- 保留空格和换行，常用于展示代码或 ASCII 艺术。
- 内部可使用 `<code>` 表示代码。

#### 强调与样式化元素（语义 vs 表现）

- `<strong>`：表示重要、严重性（默认加粗）。
- `<em>`：表示重音强调（默认斜体）。
- `<b>`：仅引起注意，无额外语义（如关键词、产品名）。
- `<i>`：表示不同语气、技术术语、外来词（斜体）。
- `<u>`：表示拼写错误或专有名词（下划线）。
- `<small>`：表示细则、免责声明（默认较小字体）。

#### 上下标

- `<sup>`（上标，如指数 `x²`）、`<sub>`（下标，如化学式 `H₂O`）。

#### `<time>`（HTML5 引入，但常作为基础补充）

- 表示时间或日期，`datetime` 属性提供机器可读格式（如 `<time datetime="2026-06-04">2026年6月4日</time>`）。

---

### 3. 链接与锚点

#### `<a>`

- `href`：目标 URL（绝对/相对路径、锚点 `#id`、协议 `mailto:` / `tel:`）。
- `target`：
  - `_self`（当前窗口）
  - `_blank`（新窗口/标签页，**安全性建议**：同时加 `rel="noopener noreferrer"`）
  - `_parent` / `_top`（框架相关）
- `title`：鼠标悬停提示。
- `download`：指示浏览器下载而不是导航（仅同源或某些条件）。
- `rel`：定义当前文档与链接文档的关系（如 `nofollow`、`noopener`、`noreferrer`）。

#### 锚点跳转

- 通过 `<a href="#section-id">` 跳转到页面内 `id="section-id"` 的元素。
- 也可通过元素自身 `id` 配合 URL 哈希直接访问。
- 平滑滚动可通过 CSS `scroll-behavior: smooth;`（较新）或 JS。

---

### 4. 列表

#### 无序列表 `<ul>` + `<li>`

- 项目符号（`disc`、`circle`、`square`）已由 CSS `list-style-type` 控制。

#### 有序列表 `<ol>`

- 属性（HTML 支持，但推荐 CSS）：
  - `type`：`1`（数字）、`A`（大写字母）、`a`（小写）、`I`（罗马）、`i`（小写罗马）
  - `start`：起始序号（如 `start="3"`）
  - `reversed`：倒序（HTML5 属性，支持度良好）。

#### 定义列表 `<dl>`、`<dt>`、`<dd>`

- 用于术语-描述对（如词汇表、元数据）。
- `<dt>` 术语名，`<dd>` 描述内容（一个术语可有多个 `<dd>`）。

---

### 5. 表格

#### 基本结构

```html
<table>
  <caption>
    表格标题
  </caption>
  <thead>
    <tr>
      <th>表头1</th>
      <th>表头2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>数据1</td>
      <td>数据2</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">汇总</td>
    </tr>
  </tfoot>
</table>
```

#### 合并单元格

- `colspan="n"`：水平合并 n 列。
- `rowspan="n"`：垂直合并 n 行。

#### 表格可访问性

- 使用 `<th>` 明确表头（`scope="col"` / `scope="row"`）。
- `<caption>` 提供表格标题。

#### 边框控制

- 传统 `border` 属性，现用 CSS `border-collapse`、`border-spacing`。

---

### 6. 表单（HTML5 之前）

#### `<form>`

- `action`：提交的 URL。
- `method`：`GET`（数据附加在 URL 上，适合非敏感查询） / `POST`（请求体传递，适合修改数据）。
- `enctype`：
  - `application/x-www-form-urlencoded`（默认）
  - `multipart/form-data`（文件上传时必须）
  - `text/plain`（不常用）
- `target`：类似 `<a>`，指定响应显示位置。

#### `<input>`

- 早期类型：`text`、`password`、`hidden`、`submit`、`reset`、`button`、`radio`、`checkbox`、`file`。
- `name`：提交时的键名，重要。
- `value`：提交的值。
- `checked`（radio/checkbox 默认选中）。
- `disabled` / `readonly`。

#### `<textarea>`

- `rows`、`cols` 控制大小，建议 CSS 控制宽高。
- `wrap` 属性（软换行/硬换行）。

#### `<select>` + `<option>`

- `multiple`：多选列表。
- `size`：可见行数。
- `<option>` 的 `selected` 属性默认选中，`value` 提交值（无 value 则提交文本）。

#### `<button>`

- `type` 属性：`submit`（表单提交）、`reset`（重置表单）、`button`（无默认行为）。**默认 type 在 `<form>` 内为 `submit`**，易被忽略导致意外提交。

#### `<label>`

- 关联控件方式：
  - 隐式：`<label><input type="checkbox"> 记住我</label>`
  - 显式：`<label for="userName">用户名：</label><input id="userName">`
- 提升可访问性（点击标签聚焦/选中控件）。

#### `<fieldset>` + `<legend>`

- 对一组表单控件分组，`<legend>` 提供组标题（如“个人信息”）。

---

### 7. 嵌入内容

#### `<img>`

- 必需属性：`src`、`alt`（替代文本，用于无障碍和图片加载失败）。
- 宽高属性：`width`、`height`（单位像素，但建议 CSS 控制响应式，而保留宽高属性可避免布局偏移）。
- 事件：`onload`、`onerror`（可处理加载失败）。
- 图片地图：`usemap="#map-name"` 配合 `<map>` 和 `<area>`。

#### `<iframe>`

- `src` 嵌入页面 URL。
- `width`、`height`。
- `name` 作为链接的 `target` 值。
- **安全性**：`sandbox` 属性（HTML5）限制脚本、表单、顶层导航等。
- 现代写法：`loading="lazy"`（HTML5 懒加载）。

#### `<object>` 与 `<embed>`

- 早期用于 Flash、PDF 等插件，现多被 `<video>`、`<iframe>` 或 JS API 替代。`<embed>` 简化但非 W3C 标准早期元素。

#### `<map>` + `<area>`

- 定义图片热区，`<area>` 支持形状（`rect`、`circle`、`poly`）和链接。

---

### 8. 其他基础元素

#### `<div>` 与 `<span>`

- `<div>` 块级，无语义容器；`<span>` 行内容器。
- 仅用于布局或样式挂钩，优先使用语义化元素（如 `header`、`section` 等 HTML5 元素）。

#### 注释 `<!-- -->`

- 不会显示，可隐藏大量内容，但不应用于生产代码（可被查看）。

#### 字符实体

- 常用：`&lt;`（<）、`&gt;`（>）、`&amp;`（&）、`&nbsp;`（不换行空格）、`&copy;`（©）、`&reg;`（®）。
- 数字实体：`&#169;` 也是 ©。
- 保留字符必须转义，避免解析冲突。

---

## 二、面试题及最佳回答范例（针对 HTML 核心基础）

### 面试题 1：`<!DOCTYPE html>` 的作用是什么？如果不写会发生什么？

**最佳回答**：

- **作用**：`<!DOCTYPE html>` 告知浏览器以标准模式（Standards Mode）解析当前 HTML 文档，而不是使用兼容旧版网页的“怪异模式”（Quirks Mode）。它会触发浏览器使用最新的渲染引擎规范。
- **不写的后果**：浏览器进入“怪异模式”。例如，IE 会模拟 IE5 的盒模型（宽度不包括 padding 和 border），导致布局混乱；CSS 解析规则异常，如块级元素高度计算、表格样式等。页面在不同浏览器间表现不一致，难以调试。
- **注意**：HTML5 的 DOCTYPE 不区分大小写，且无需 DTD 引用。

---

### 面试题 2：`<img>` 标签的 `alt` 属性有什么作用？它是必需的吗？

**最佳回答**：

- **作用**：
  1. **可访问性**：屏幕阅读器会朗读 `alt` 内容，帮助视障用户理解图像内容。
  2. **图片加载失败时**：浏览器显示 `alt` 文本（或加红色边框等样式），替代缺失图像。
  3. **SEO**：搜索引擎利用 `alt` 理解图片内容，辅助图像搜索排名。
- **是否必需**：根据 HTML 规范，`<img>` 必须设置 `alt` 属性。但如果图像仅为装饰且无信息价值，可以写 `alt=""`（空字符串），这样屏幕阅读器会忽略它。不建议省略 `alt` 属性，否则部分无障碍工具会朗读文件名或 `src` 路径，造成干扰。

---

### 面试题 3：`<a>` 标签的 `target="_blank"` 有什么安全风险？如何解决？

**最佳回答**：

- **风险**：当 `<a href="..." target="_blank">` 打开新标签页时，新页面可以通过 `window.opener` 对象访问原始页面的 `window`。恶意网站可以利用此对象进行 **反向标签劫持（tabnabbing）**，例如将原始页面重定向到钓鱼网站。
- **解决方案**：给所有 `target="_blank"` 的链接添加 `rel="noopener noreferrer"`。
  - `noopener`：阻止新页面访问 `window.opener`。
  - `noreferrer`：禁止发送 `Referer` 头（同时隐含 `noopener` 效果）。
- **最佳实践**：使用 `<a href="..." target="_blank" rel="noopener noreferrer">`。现代浏览器对于 `target="_blank"` 已默认行为接近 `noopener`（较新版本），但显式添加仍是最安全写法。

---

### 面试题 4：`<form>` 中 `GET` 和 `POST` 的区别？何时使用？

**最佳回答**：

| 特性         | GET                                            | POST                                           |
| ------------ | ---------------------------------------------- | ---------------------------------------------- |
| 数据位置     | URL 查询字符串（?key=value）                   | 请求体（Body）                                 |
| 数据长度限制 | 受浏览器/服务器 URL 长度限制（通常 2KB ~ 8KB） | 理论无限制，服务器配置决定                     |
| 安全性       | 低（数据暴露在地址栏、历史记录、服务器日志）   | 较高（数据不在 URL 中，但仍需 HTTPS 加密传输） |
| 缓存         | 可被浏览器缓存，可作为书签保存                 | 不会被缓存，不能加书签                         |
| 幂等性       | 幂等（多次请求结果相同，适合查询）             | 非幂等（可能改变服务器状态）                   |
| 编码         | 仅支持 ASCII                                   | 支持二进制（文件上传需 `multipart/form-data`） |

**使用场景**：

- **GET**：搜索、筛选、分页等不修改数据的操作，参数可分享。
- **POST**：登录、注册、提交订单、文件上传、修改数据等会对服务器产生副作用或包含敏感信息的操作。

---

### 面试题 5：块级元素与行内元素的区别？举例说明。

**最佳回答**：

- **块级元素**（如 `<div>`、`<p>`、`<h1>`、`<ul>`、`<li>`）：
  - 独占一行，默认宽度为父容器 100%。
  - 可以设置 `width`、`height`、`margin`、`padding` 各方向生效。
  - 可容纳块级和行内元素。
- **行内元素**（如 `<span>`、`<a>`、`<strong>`、`<em>`、`<img>`）：
  - 与其他行内元素共占一行，宽度由内容撑开。
  - `width`、`height` 设置无效（`img` 例外，它是可替换行内元素，可以设置尺寸）。
  - 上下 `margin` 和 `padding` 可能无效或影响行高（视情况）。
  - 只能容纳行内元素或文本，不能嵌套块级元素（特殊如 `<a>` 在 HTML5 中可以包裹块级，但不推荐）。
- **补充**：通过 CSS `display: block` / `inline` / `inline-block` 可以改变元素表现。

---

### 面试题 6：什么是 HTML 字符实体？列举五个常用的。

**最佳回答**：

- **定义**：字符实体是一种以 `&` 开头、`;` 结尾的编码，用于在 HTML 中表示保留字符（如 `<`、`>`）或不可见字符（如不换行空格）以及特殊符号。
- **常用实体**：
  1. `&lt;` → `<`
  2. `&gt;` → `>`
  3. `&amp;` → `&`
  4. `&nbsp;` → 不换行空格（常用于保持间距，避免自动换行）
  5. `&copy;` → `©`
  6. `&reg;` → `®`
  7. `&quot;` → `"`

---

### 面试题 7：说说 `<label>` 的作用和用法。

**最佳回答**：

- **作用**：`<label>` 为表单控件提供可点击的标签，提升易用性和可访问性。点击 `<label>` 时，浏览器会自动将焦点转移到关联的输入控件（或切换复选框/单选按钮状态）。
- **用法**：
  1. **隐式关联**：将 `<input>` 放在 `<label>` 内部。
     ```html
     <label><input type="checkbox" /> 同意条款</label>
     ```
  2. **显式关联**：使用 `for` 属性指向控件的 `id`。
     ```html
     <label for="email">邮箱：</label> <input type="email" id="email" />
     ```
- **优势**：扩大可点击区域（尤其是单选、复选框），对触屏和鼠标用户友好，同时屏幕阅读器会正确朗读标签内容。

---

### 面试题 8：`<script>` 标签的 `async` 和 `defer` 属性有什么区别？（虽属 HTML5，但常与基础脚本加载一同考察）

**最佳回答**（简明）：

| 属性    | 加载时机                 | 执行时机                                                | 适用场景                                     |
| ------- | ------------------------ | ------------------------------------------------------- | -------------------------------------------- |
| 无      | 同步加载，阻塞 HTML 解析 | 立即执行                                                | 不推荐，除非必要                             |
| `defer` | 异步加载，不阻塞解析     | 在 HTML 解析完成后、`DOMContentLoaded` 事件前按顺序执行 | 依赖 DOM 就绪、有执行顺序要求的脚本          |
| `async` | 异步加载，不阻塞解析     | 下载完成后立即执行（可能打断 HTML 解析）                | 独立脚本（如统计、广告），不依赖其他脚本/DOM |

**注意**：`defer` 和 `async` 只对外部脚本（有 `src`）有效，内联脚本无效。

---

### 面试题 9：`<iframe>` 有哪些常见缺点？如何优化或替代？

**最佳回答**：

- **缺点**：
  1. 阻塞页面 `onload` 事件（直到所有 iframe 加载完成，可设置 `loading="lazy"` 缓解）。
  2. SEO 负面影响（搜索引擎对 iframe 内容索引不友好）。
  3. 安全性问题（嵌入恶意页面可发起点击劫持等），需使用 `sandbox` 属性限制。
  4. 内存和性能开销（每个 iframe 是独立文档环境）。
  5. 跨域通信复杂（需 `postMessage`）。
- **优化/替代**：
  - 使用 `sandbox="allow-same-origin allow-scripts"` 等精细权限。
  - 添加 `loading="lazy"` 懒加载。
  - 尽量使用现代 API（如 Web Components、AJAX 动态加载内容）代替 iframe 嵌入第三方内容。
  - 对于视频嵌入，使用 `<video>` 或原平台提供的专用嵌入代码（仍是 iframe，但可接受）。

---

### 面试题 10：列举几个 HTML 中语义化标签的例子，并说明为什么要语义化。

**最佳回答**：

- **例子**（此处可提 HTML5 语义标签，但基础部分也有 `<strong>`、`<em>`、`<blockquote>` 等）：
  - 基础语义：`<strong>`、`<em>`、`<blockquote>`、`<address>`
- **语义化的好处**：
  1. **可访问性**：屏幕阅读器根据标签含义提供不同的朗读模式（如 `<strong>` 加重语气）。
  2. **SEO**：搜索引擎更准确地识别内容结构、关键词重要性。
  3. **代码可维护性**：开发者能快速理解页面结构，便于团队协作。
  4. **跨平台**：其他设备（如阅读器模式、语音助手）能提取核心内容。
  5. **未来兼容**：遵循标准，浏览器会持续改进对语义标签的支持。

---

> 以上为针对“知识点一”的详细补充和常见面试题最佳回答。建议结合实际编码练习加深理解。
