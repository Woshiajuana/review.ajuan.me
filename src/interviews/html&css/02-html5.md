# HTML5 新特性

## 知识点二：HTML5 新增知识点详细补充

> 以下针对前面列出的 HTML5 各项新增特性进行详细展开，涵盖使用方式、注意事项及最佳实践。  
> 注：部分 API 虽不属于 HTML 语言规范，但通常统称为“HTML5 技术集”。

---

### 1. 语义化元素

#### 1.1 结构化元素

- `<header>`：表示一组引导性或导航性内容的容器，通常包含标题、Logo、搜索表单等。一个页面可有多个（如文章头部、区块头部）。
- `<footer>`：表示最近的章节或页面根元素的页脚，包含作者信息、版权声明、相关链接等。
- `<main>`：文档的主要内容，**应唯一**，不应包含侧边栏、导航、页眉页脚等重复内容。对无障碍友好（屏幕阅读器可直接跳转）。
- `<section>`：表示一个独立的章节，通常包含一个标题（`<h1>`~`<h6>`）。不要仅为样式而使用，应具有语义分区。
- `<article>`：表示独立、可复用的内容（如论坛帖子、新闻文章、用户评论）。可嵌套 `section`。
- `<nav>`：主要导航链接区域（全局导航、目录、面包屑）。并非所有链接组都要用 `<nav>`，只用于主要导航块。
- `<aside>`：表示与周围内容间接相关的内容（侧边栏、广告、引用、相关阅读）。

#### 1.2 内容分组与交互元素

- `<figure>` + `<figcaption>`：用于封装插图、图表、代码块、照片等。`<figcaption>` 作为标题/说明，可选，且必须是 `<figure>` 的第一个或最后一个子元素。
- `<mark>`：标记或高亮文本（如搜索结果关键词），默认背景黄色。
- `<details>` + `<summary>`：创建可展开/折叠的控件。`<summary>` 提供可见标签，点击切换 `<details>` 内部内容显示。可设置 `open` 属性默认展开。
- `<progress>`：表示任务完成进度（进度条）。有 `value` 和 `max` 属性。
- `<meter>`：表示已知范围内的标量值（如磁盘使用率、投票结果），有 `value`、`min`、`max`、`low`、`high`、`optimum` 属性。
- `<dialog>`：表示对话框或交互式组件。可用 `open` 属性显示，也可通过 JS `showModal()` / `close()` 控制。与表单配合可做模态框。

#### 1.3 其他语义元素

- `<address>`：用于包含联系信息（作者、组织等），通常斜体显示。
- `<time>`：表示时间或日期，`datetime` 属性提供机器可读格式（如 `datetime="2026-06-04T10:30"`）。

---

### 2. 表单增强

#### 2.1 新增 Input 类型

- `email`：验证基本电子邮件格式（需包含 `@` 和域名），移动端键盘优化。
- `url`：验证 URL 格式，移动端键盘优化。
- `tel`：不自动验证格式，但移动端弹出数字键盘。
- `number`：仅接受数字，有上下箭头。支持 `min`、`max`、`step`。
- `range`：滑块控件，支持 `min`、`max`、`step`。
- `date`、`datetime-local`、`month`、`week`、`time`：日期时间选择器（各浏览器实现不同，可回退普通文本）。
- `color`：颜色选择器，返回十六进制值。
- `search`：搜索框，提供清除按钮样式（不同浏览器表现不同）。

#### 2.2 新增表单属性

- `placeholder`：占位提示文本，焦点输入时自动消失（不适合替代 `<label>`）。
- `required`：必填字段，提交时浏览器会提示并阻止。
- `autofocus`：页面加载时自动聚焦到该字段（只应用于一个元素）。
- `autocomplete`：控制自动填充（`on` / `off` / 具体字段名如 `username`）。
- `pattern`：自定义正则表达式验证（如 `pattern="[A-Za-z]{3}"`）。
- `min` / `max` / `step`：用于数值或日期范围。
- `multiple`：允许 `<input type="file">` 多文件选择，或 `<input type="email">` 多个邮箱（逗号分隔）。
- `formaction`、`formenctype`、`formmethod`、`formtarget`：覆盖 `<form>` 的对应属性，适用于不同提交按钮。
- `list`：与 `<datalist>` 关联，提供预定义选项的自动补全。

#### 2.3 新元素

- `<datalist>`：为输入框提供下拉建议列表，通过 `id` 与 `<input list="id">` 关联。选项 `<option value="...">` 或带标签。
- `<output>`：用于显示计算结果（如两个输入框的和），通常配合 JS 更新其值。
- `<keygen>`（已废弃）：用于密钥对生成，现被安全原因移除，不再使用。

---

### 3. 多媒体

#### 3.1 `<video>` 元素

- 属性：`src`、`controls`（显示播放控件）、`autoplay`（注意：现代浏览器可能限制）、`loop`、`muted`（静音后 autoplay 更易生效）、`poster`（封面图片）、`width`/`height`。
- 支持格式：MP4（H.264 + AAC）、WebM（VP8/VP9 + Vorbis/Opus）、Ogg（Theora + Vorbis）。
- `<source>` 子元素提供多格式备选：`<source src="movie.webm" type="video/webm">`。
- `<track>` 添加字幕/章节：`kind="subtitles" src="subs.vtt" srclang="en" label="English"`（WebVTT 格式）。

#### 3.2 `<audio>` 元素

- 类似 `<video>`，但无画面。属性类似：`src`、`controls`、`autoplay`、`loop`、`muted`。
- 支持格式：MP3、WAV、Ogg。

#### 3.3 与多媒体相关的 JS API

- HTMLMediaElement 通用方法：`play()`、`pause()`、`load()`。
- 事件：`canplay`、`playing`、`ended`、`timeupdate` 等。

---

### 4. 图形与绘图

#### 4.1 `<canvas>`

- 通过 JS 绘制 2D 图形（位图）。
- 常用上下文：`canvas.getContext('2d')`。
- 主要 API：矩形（`fillRect`、`strokeRect`、`clearRect`）、路径（`beginPath`、`moveTo`、`lineTo`、`arc`）、样式（`fillStyle`、`strokeStyle`、`lineWidth`）、文字（`fillText`、`strokeText`）、图像（`drawImage`）、变换（`translate`、`rotate`、`scale`）、像素操作（`getImageData`、`putImageData`）。
- 注意：canvas 的尺寸通过 `width/height` 属性设置（非 CSS），否则缩放失真。

#### 4.2 SVG

- 可缩放矢量图形，基于 XML 语法，可直接嵌入 HTML。
- 示例：`<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>`。
- 优点：无损缩放、DOM 操作支持、CSS/JS 交互。

#### 4.3 响应式图片

- `<picture>` 元素：根据媒体条件切换不同图片源。
  ```html
  <picture>
    <source media="(min-width: 800px)" srcset="large.jpg" />
    <source media="(min-width: 400px)" srcset="medium.jpg" />
    <img src="small.jpg" alt="..." />
  </picture>
  ```
- `<img srcset>` 配合 `sizes`：提供多个候选图片和尺寸条件，浏览器智能选择。
  ```html
  <img
    src="fallback.jpg"
    srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
    sizes="(max-width: 600px) 100vw, 800px"
    alt="..."
  />
  ```

---

### 5. 嵌入与交互

#### 5.1 `<iframe>` 增强属性

- `sandbox`：启用对嵌入内容的严格限制（可取值 `allow-same-origin`、`allow-scripts`、`allow-forms`、`allow-popups` 等，无值表示所有限制启用）。
- `srcdoc`：直接提供 HTML 内容字符串，而不是通过 `src` 加载外部 URL。
- `allow`：用于权限策略（如 `geolocation`、`microphone`、`camera`）。

#### 5.2 `<details>` / `<summary>`（已在上文提及）

- 用于简单折叠面板，无需 JS。

#### 5.3 `<menu>` 和 `<menuitem>`（基本废弃）

- 早期用于上下文菜单，现代使用自定义右键菜单或 `<dialog>`。

---

### 6. 离线与存储

#### 6.1 Web Storage

- **`localStorage`**：永久存储，清除浏览器数据前一直存在，同源共享，容量约 5-10MB。
- **`sessionStorage`**：标签页关闭即清除，仅当前会话有效。
- API：`setItem(key, value)`、`getItem(key)`、`removeItem(key)`、`clear()`。
- 注意：存储的值为字符串，需 `JSON.stringify/parse` 存取对象。

#### 6.2 IndexedDB

- 异步、事务型、支持索引、大容量（几百 MB 甚至更多）的 NoSQL 数据库。
- 基本操作：打开数据库（`indexedDB.open`）、创建对象存储空间（`createObjectStore`）、事务添加/读取/删除、使用游标。
- 现代封装库（如 Dexie.js）可简化使用。

#### 6.3 File API

- 通过 `<input type="file">` 获取 `FileList` 对象，可读取文件内容：
  - `FileReader`：`readAsText`、`readAsDataURL`、`readAsArrayBuffer`。
  - 事件：`onload`、`onerror`。
- 拖拽文件：监听 `dragover`、`drop` 事件，从 `dataTransfer.files` 获取文件。

#### 6.4 Drag & Drop API

- 让元素可拖拽：`draggable="true"`。
- 拖拽事件：`dragstart`、`dragend`、`dragover`、`drop`。
- 数据传递：`event.dataTransfer.setData(type, data)` 和 `getData`。
- 自定义拖拽图标：`setDragImage`。

#### 6.5 Application Cache（已废弃）

- 通过 manifest 文件缓存资源，已被 Service Worker + Cache API 取代。

---

### 7. 通信与网络

#### 7.1 WebSocket

- 全双工持久连接，适用于实时应用（聊天、游戏、推送）。
- 实例化：`new WebSocket('ws://...')`。
- 事件：`onopen`、`onmessage`、`onclose`、`onerror`。
- 发送：`send()`，接收：`event.data`。

#### 7.2 Server-Sent Events (SSE)

- 服务器单向推送事件到客户端（基于 HTTP）。
- 实例化：`new EventSource('/events')`。
- 监听：`onmessage` 或 `addEventListener('customEvent', ...)`。
- 服务器响应需设置 `Content-Type: text/event-stream`。

#### 7.3 XMLHttpRequest Level 2

- 支持跨域请求（配合 CORS）、进度事件（`onprogress`）、上传文件（`FormData`）、响应类型（`responseType = 'blob'` 等）。
- 使用 `xhr.withCredentials = true` 发送 Cookie。

#### 7.4 Fetch API

- 基于 Promise 的现代请求方法：`fetch(url, options)`。
- 优点：更简洁、支持流、默认无跨域 Cookie（需 `credentials: 'include'`）。
- 缺点：默认不 reject HTTP 错误状态（需手动检查 `response.ok`）。

---

### 8. 设备与硬件访问

#### 8.1 Geolocation API

- 获取用户地理位置（需用户授权）。
- `navigator.geolocation.getCurrentPosition(success, error, options)`
- `watchPosition` 持续监听位置变化。
- 返回 `coords.latitude`、`longitude`、`accuracy` 等。

#### 8.2 DeviceOrientation 事件

- `deviceorientation`：检测设备旋转（alpha、beta、gamma 角度），用于指南针、摇一摇。
- `devicemotion`：检测加速度和旋转速率，用于步数统计、游戏操控。

#### 8.3 getUserMedia / MediaDevices

- 访问摄像头、麦克风、屏幕共享。
- `navigator.mediaDevices.getUserMedia({ video: true, audio: true })` 返回 Promise。
- 获取 `MediaStream` 对象后可赋值给 `<video>` 元素的 `srcObject`。
- 录制可使用 `MediaRecorder` API。

#### 8.4 Vibration API（移动端）

- `navigator.vibrate(200)` 或 `vibrate([200, 100, 200])`。

#### 8.5 Battery API（已部分废弃，且非标准广泛支持）

- 获取电池状态：`navigator.getBattery()`。

---

### 9. 历史与导航

#### History API

- 用于单页应用（SPA）无刷新修改 URL 和页面状态。
- `history.pushState(state, title, url)`：添加新历史记录。
- `history.replaceState(state, title, url)`：替换当前历史。
- `popstate` 事件：用户点击后退/前进时触发，可获取 `event.state`。
- 注意：`pushState` 不会触发 `popstate`，不会刷新页面。

---

### 10. 其他 API

#### 10.1 Web Workers

- 在后台线程运行 JS，避免阻塞 UI。
- 实例：`new Worker('worker.js')`。
- 通信：`worker.postMessage(data)`，监听 `onmessage`。
- 限制：无法访问 DOM、`window`、`document`，不能使用某些 API。
- 类型：专用 Worker（Dedicated）、共享 Worker（Shared）、Service Worker。

#### 10.2 Notification API

- 桌面通知：需用户授权 `Notification.requestPermission()`。
- 创建通知：`new Notification(title, { body, icon, ... })`。

#### 10.3 Page Visibility API

- 检测页面是否可见（切换标签页、最小化时暂停动画/视频）。
- 属性：`document.visibilityState`（`'visible'` / `'hidden'`）。
- 事件：`visibilitychange`。

#### 10.4 Fullscreen API

- 使元素全屏：`element.requestFullscreen()`。
- 退出：`document.exitFullscreen()`。
- 事件：`fullscreenchange`、`fullscreenerror`。
- 前缀差异（早期浏览器需 `webkitRequestFullscreen` 等）。

#### 10.5 Clipboard API

- 读取/写入剪贴板（需用户交互或权限）。
- `navigator.clipboard.writeText(text)`、`readText()`。
- 支持图片等其他数据格式（`ClipboardItem`）。

#### 10.6 `requestAnimationFrame`

- 用于高效动画，与浏览器刷新率同步（通常 60fps）。
- 递归调用：`function animate() { ...; requestAnimationFrame(animate); }`。
- 相比 `setInterval` 更省电、不卡顿。

#### 10.7 微数据（Microdata）

- 添加结构化数据（如 `itemscope`、`itemtype`、`itemprop`），主要供搜索引擎理解（Schema.org）。
- 示例：`<div itemscope itemtype="https://schema.org/Person"><span itemprop="name">张三</span></div>`。
- 现多被 JSON-LD 替代，但仍有部分场景使用。

#### 10.8 `<template>` 元素

- 声明 HTML 片段，但页面加载时不渲染，可用于 JS 动态实例化。
- 获取 `template.content`（`DocumentFragment`），然后 `cloneNode(true)` 插入 DOM。

#### 10.9 `data-*` 自定义属性

- 存储额外数据，可使用 `dataset` 访问：`element.dataset.userId = '123'` 对应 `data-user-id="123"`。

---

## 面试题及最佳回答范例（针对 HTML5）

### 面试题 1：HTML5 新增了哪些语义化标签？使用它们的好处是什么？

**最佳回答**：

**新增语义化标签**：

- 结构类：`<header>`、`<footer>`、`main`、`<section>`、`<article>`、`<nav>`、`<aside>`
- 文本类：`<mark>`、`<time>`、`<figure>` + `<figcaption>`
- 交互类：`<details>` + `<summary>`、`<dialog>`

**好处**：

1. **可访问性**：屏幕阅读器等辅助设备能准确理解页面结构，例如跳转到 `<main>` 直接获取核心内容。
2. **SEO**：搜索引擎更准确识别内容的重要性（如 `<article>` 代表独立内容），提升排名。
3. **代码可读性**：开发者可直观了解布局意图（`<header>` 比 `<div class="header">` 更明确），降低维护成本。
4. **跨平台兼容**：不同的浏览器、阅读模式、语音助手都能利用语义做结构化提取。
5. **未来兼容**：遵循标准，浏览器未来优化会自然受益。

**注意**：不要为语义而滥用，例如只有全局导航才用 `<nav>`，一组链接不足以构成导航。

---

### 面试题 2：`<canvas>` 和 SVG 有什么区别？各自适用场景是什么？

**最佳回答**：

| 特性     | Canvas                                       | SVG                                                      |
| -------- | -------------------------------------------- | -------------------------------------------------------- |
| 图形类型 | 位图（基于像素）                             | 矢量图（基于数学描述）                                   |
| 缩放     | 缩放会模糊/锯齿                              | 无损缩放                                                 |
| DOM 操作 | 无，一旦绘制即成为像素，无法修改具体图形     | 每个元素都是 DOM 节点，可绑定事件、修改属性              |
| 性能     | 大量简单图形绘制快                           | 大量节点消耗高                                           |
| 适用场景 | 实时动画、图像处理（滤镜）、游戏、像素级绘制 | 静态图表（线图、饼图）、图标、可交互地图、高保真缩放需求 |
| 事件交互 | 需要根据坐标手动判断点击区域                 | 可直接在图形上绑定事件                                   |
| 修改方式 | 必须重绘（清除后重新绘制）                   | 直接修改 SVG 属性或 CSS                                  |

**典型示例**：

- Canvas：画板应用、粒子特效、图像灰度化。
- SVG：企业 Logo、流程图、数据可视化（如 D3.js 常结合 SVG）。

---

### 面试题 3：解释 `localStorage`、`sessionStorage` 和 `Cookie` 的区别。

**最佳回答**：

| 特性         | localStorage                                   | sessionStorage        | Cookie                                                                        |
| ------------ | ---------------------------------------------- | --------------------- | ----------------------------------------------------------------------------- |
| 生命周期     | 永久（需手动清除或代码删除）                   | 标签页/窗口关闭即清除 | 可设置过期时间（`Expires`/`Max-Age`），未设置则为会话级                       |
| 容量         | 约 5-10MB                                      | 约 5MB                | 4KB                                                                           |
| 与服务器交互 | 不自动发送                                     | 不自动发送            | 随同请求自动发送（`Cookie` 头）                                               |
| API 便捷性   | `setItem`/`getItem` 简单                       | 同左                  | `document.cookie` 解析麻烦                                                    |
| 安全性       | 易受 XSS 攻击（通过 JS 读取）                  | 同左                  | 可设置 `HttpOnly`（防 XSS 读取），`Secure`（仅 HTTPS），`SameSite`（防 CSRF） |
| 用途         | 存储大量客户端数据（主题、用户偏好、离线应用） | 临时数据，如表单暂存  | 会话管理（登录态）、追踪、跨请求数据传递                                      |

**注意**：不要用 Cookie 存储大量数据，每次请求都会携带，浪费带宽。

---

### 面试题 4：什么是 Web Worker？如何使用？有什么限制？

**最佳回答**：

**定义**：Web Worker 允许在浏览器后台线程中运行 JavaScript 代码，与主线程（UI 线程）互不阻塞。

**使用方法**：

1. 创建 Worker 脚本文件（如 `worker.js`）：
   ```javascript
   // worker.js
   self.onmessage = function (e) {
     const result = e.data.num * 2; // 复杂计算
     self.postMessage(result);
   };
   ```
2. 主线程中：
   ```javascript
   const worker = new Worker('worker.js');
   worker.postMessage({ num: 10 });
   worker.onmessage = function(e) {
     console.log('结果：', e.data);
   };
   worker.onerror = function(err) { ... };
   ```

**限制**：

- 不能访问 DOM、`window`、`document`、`parent` 等对象。
- 不能使用某些 API（如 `alert`、`localStorage` 部分可用但限制）。
- 同源策略限制 Worker 脚本。
- 通过 `postMessage` 传递的数据采用结构化克隆（或 Transferable 对象），大对象有复制开销。

**适用场景**：密集计算（如大数据排序、图像滤镜、加密解密）、实时数据流处理，避免界面卡顿。

---

### 面试题 5：`<picture>` 元素和 `srcset` 属性如何实现响应式图片？两者关系是什么？

**最佳回答**：

**`srcset` + `sizes`**：

- 为浏览器提供多个图片候选以及每个图片的宽度描述符（`w`）或像素密度（`x`）。
- `sizes` 定义在不同视口宽度下图片占据的 CSS 宽度，帮助浏览器选择最合适的候选。
- 示例：
  ```html
  <img
    src="fallback.jpg"
    srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 800px"
  />
  ```

**`<picture>` 元素**：

- 提供基于媒体条件的图像切换（更强大的艺术指导），比如不同宽高比、不同裁剪区域、支持不同格式（WebP、AVIF）。
- 内部使用 `<source>` 的 `media` 和 `type` 属性，最后由 `<img>` 作为回退。
- 示例：
  ```html
  <picture>
    <source media="(max-width: 600px)" srcset="small.jpg" />
    <source media="(max-width: 1200px)" srcset="medium.jpg" />
    <source type="image/webp" srcset="image.webp" />
    <img src="fallback.jpg" alt="..." />
  </picture>
  ```

**关系**：

- `srcset` 更适合分辨率切换（同一张图的不同尺寸），`<picture>` 更适合完全不同的图像内容或格式降级。
- 二者可以配合使用（`<source srcset>` 内再写 `srcset` 和 `sizes`）。

---

### 面试题 6：简述 `requestAnimationFrame` 的作用及优势。

**最佳回答**：

**作用**：告诉浏览器在下次重绘之前执行指定的回调函数，常用于实现流畅的 JavaScript 动画。

**优势**：

1. **与屏幕刷新率同步**：通常 60Hz 显示器下每秒 60 次（帧），避免过度绘制（比 `setInterval` 16.6ms 更精确）。
2. **节能**：当页面切换至后台（不可见）时，`requestAnimationFrame` 会暂停，节省 CPU/GPU 资源；而 `setInterval` 仍在后台运行。
3. **减少丢帧**：浏览器可合并多次修改 DOM 样式的操作，在重绘前统一处理。
4. **精度高**：回调参数提供高精度时间戳（`DOMHighResTimeStamp`），方便计算动画进度。

**示例**：

```javascript
function animate(timestamp) {
  // 更新动画属性
  if (继续动画) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

**注意**：`requestAnimationFrame` 并不适合固定时间间隔的代码（如每隔 1 秒更新倒计时），应使用 `setInterval` 或 `setTimeout`。

---

### 面试题 7：History API 如何实现单页应用（SPA）的路由？`pushState` 和 `replaceState` 有何区别？

**最佳回答**：

**实现原理**：

- 监听 `popstate` 事件（用户点击前进/后退时触发）。
- 当用户点击内链时，使用 `history.pushState` 改变 URL，并通过 AJAX/Fetch 加载对应内容，无刷新更新页面。
- `replaceState` 类似，但不增加历史记录（用于重定向或修改当前状态）。

**区别**：

| 方法           | 是否增加历史记录 | 影响后退/前进              | 典型场景                               |
| -------------- | ---------------- | -------------------------- | -------------------------------------- |
| `pushState`    | 是               | 可后退到之前状态           | 正常页面导航                           |
| `replaceState` | 否               | 替换当前历史条目，后退跳过 | 重定向、修正 URL（如分页时替换当前页） |

**注意**：

- 调用 `pushState` 不会触发 `popstate`，需手动更新视图。
- 服务器应配置所有前端路由 URL 都返回同一个 HTML（如 `index.html`），否则刷新 404。

**示例**：

```javascript
// 导航到 /about
function navigate(url) {
  history.pushState({ page: url }, "", url);
  loadContent(url); // 异步加载内容
}

window.addEventListener("popstate", function (event) {
  loadContent(location.pathname);
});
```

---

### 面试题 8：HTML5 中如何实现跨文档通信？`postMessage` 的用法和安全性？

**最佳回答**：

**跨文档通信**：`window.postMessage` 方法允许来自不同源的脚本进行安全的通信（例如页面与嵌入的 `<iframe>`、父页面与弹出窗口）。

**用法**：

```javascript
// 发送消息
targetWindow.postMessage(message, targetOrigin);
// targetWindow 可以是 iframe.contentWindow、window.opener、父窗口 window.parent
// targetOrigin 指定允许接收消息的源（'https://example.com' 或 '*' 不推荐）

// 接收消息
window.addEventListener("message", function (event) {
  if (event.origin !== "https://trusted.com") return; // 验证源
  console.log(event.data, event.source);
});
```

**安全性**：

- **必须验证 `event.origin`**：避免恶意网站伪造消息，只处理信任的源。
- **避免使用 `'*'`**：除非明确需要任意源，且不传输敏感数据。
- **不要使用 `eval` 或内联脚本执行接收到的消息内容**，防止 XSS。
- 发送敏感信息时确保目标源可信。

---

### 面试题 9：`<video>` 元素如何实现自定义控件？怎么实现自动播放策略的兼容？

**最佳回答**：

**自定义控件**：

1. 设置 `<video>` 的 `controls` 属性为 `false`。
2. 用 HTML+CSS 创建播放/暂停、进度条、音量、全屏等按钮。
3. 通过 JS 调用 video 的 API：
   - `play()` / `pause()`
   - 监听 `timeupdate` 更新进度条
   - 设置 `currentTime` 跳转
   - `requestFullscreen()` 全屏
   - 修改 `volume`、`muted`

**自动播放策略兼容**：

- 现代浏览器（Chrome、Safari 等）限制自动播放：必须满足以下之一：
  1. 视频静音 (`muted`) 时允许 `autoplay`。
  2. 用户已与页面交互（点击、触摸等）后可播放有声视频。
- 最佳实践：
  - 使用 `<video autoplay muted>` 实现静音自动播放。
  - 监听 `canplay` 事件后再调用 `play()`，捕获 Promise 拒绝：
    ```javascript
    video.play().catch((e) => {
      // 显示播放按钮，引导用户点击
    });
    ```

---

### 面试题 10：HTML5 的 `draggable` 如何实现拖拽？有哪些事件？

**最佳回答**：

**实现步骤**：

1. 给元素设置 `draggable="true"`（图片和链接默认可拖拽）。
2. 监听 `dragstart` 事件，通过 `event.dataTransfer.setData(type, data)` 存储拖拽数据，也可设置 `setDragImage` 和拖拽效果。
3. 拖拽目标元素需监听 `dragover` 事件并调用 `event.preventDefault()`（允许放置）。
4. 监听 `drop` 事件，通过 `event.dataTransfer.getData(type)` 获取数据，完成移动/复制逻辑。

**拖拽事件**（按顺序）：

- 拖拽元素：`dragstart` → `drag` → `dragend`
- 目标元素：`dragenter` → `dragover` → `dragleave`（可选） → `drop`

**示例**：

```html
<div draggable="true" ondragstart="drag(event)" id="source">拖我</div>
<div ondrop="drop(event)" ondragover="allowDrop(event)" id="target">放这里</div>

<script>
  function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const draggedEl = document.getElementById(data);
    ev.target.appendChild(draggedEl);
  }
</script>
```

---

以上是针对“知识点二（HTML5 新增知识点）”的详细补充及常见面试题最佳回答。建议结合代码实践深入理解各 API 的兼容性与限制。
