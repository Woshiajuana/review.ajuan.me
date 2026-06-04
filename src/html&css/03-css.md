# CSS 基础

## 知识点三：CSS 核心基础知识点详细补充（不含 CSS3）

> 以下针对前面列出的 CSS 核心基础（2.1 标准）逐项深入展开，涵盖常见细节、兼容性注意事项及最佳实践。

---

### 1. 基本语法与选择器

#### 1.1 规则集结构

```css
selector {
  property: value;
  /* 多个声明 */
}
```

- 区分大小写（属性名、值部分情况敏感，如 `url()` 中的路径）。
- 最后一条声明的分号可省略，但建议保留。
- 注释：`/* ... */`（不可嵌套）。

#### 1.2 基础选择器详解

| 选择器             | 格式      | 示例                                            | 优先级权重          |
| ------------------ | --------- | ----------------------------------------------- | ------------------- |
| 通用选择器         | `*`       | `* { margin: 0; }`                              | 0,0,0,0             |
| 类型选择器（元素） | `element` | `div { ... }`                                   | 0,0,0,1             |
| 类选择器           | `.class`  | `.box { ... }`                                  | 0,0,1,0             |
| ID 选择器          | `#id`     | `#header { ... }`                               | 0,1,0,0             |
| 属性选择器         | `[attr]`  | `[disabled] { ... }`<br>`[type="text"] { ... }` | 0,0,1,0（同 class） |

> 注：属性选择器的更高级匹配（如 `^=`、`$=`）属于 CSS3，基础仅包含存在性和精确相等。

#### 1.3 组合选择器

| 组合符   | 符号 | 示例      | 说明                                         |
| -------- | ---- | --------- | -------------------------------------------- |
| 后代     | 空格 | `div p`   | 所有后代，不限层级                           |
| 子元素   | `>`  | `div > p` | 仅直接子元素                                 |
| 相邻兄弟 | `+`  | `h1 + p`  | 紧邻的下一个兄弟                             |
| 通用兄弟 | `~`  | `h1 ~ p`  | 之后的所有兄弟（CSS2 已部分支持，CSS3 明确） |

#### 1.4 伪类（CSS2）

| 伪类           | 作用                 | 示例                                      |
| -------------- | -------------------- | ----------------------------------------- |
| `:link`        | 未访问的链接         | `a:link { color: blue; }`                 |
| `:visited`     | 已访问的链接         | `a:visited { color: purple; }`            |
| `:hover`       | 鼠标悬停             | `a:hover { text-decoration: underline; }` |
| `:active`      | 激活（鼠标按下）     | `a:active { color: red; }`                |
| `:focus`       | 获得焦点             | `input:focus { outline: none; }`          |
| `:first-child` | 父元素的第一个子元素 | `li:first-child { font-weight: bold; }`   |
| `:lang()`      | 匹配特定语言         | `p:lang(en) { quotes: '"' '"'; }`         |

**顺序要求**：对于链接 (`<a>`)，推荐顺序 LVHA：`:link` → `:visited` → `:hover` → `:active`。

#### 1.5 伪元素（CSS2）

| 伪元素          | 作用                     | 示例                                          |
| --------------- | ------------------------ | --------------------------------------------- |
| `:first-line`   | 块级元素的第一行         | `p:first-line { text-transform: uppercase; }` |
| `:first-letter` | 块级元素的第一个字母     | `p:first-letter { font-size: 200%; }`         |
| `:before`       | 在元素内容前插入生成内容 | `h1:before { content: "★ "; }`                |
| `:after`        | 在元素内容后插入生成内容 | `a:after { content: " →"; }`                  |

> CSS3 要求伪元素使用双冒号 (`::before`)，但为兼容旧浏览器，CSS2 的单冒号写法仍有效。

---

### 2. 盒模型

#### 2.1 标准盒模型（content-box）

- `width` / `height` **仅**作用于内容区域（content）。
- 实际占据宽度 = `width` + `padding-left` + `padding-right` + `border-left` + `border-right`
- 实际占据高度 = `height` + `padding-top` + `padding-bottom` + `border-top` + `border-bottom`

#### 2.2 属性详解

- `padding`：内边距，不可为负，可简写 1~4 值（上 右 下 左）。
- `border`：边框，可分别设置宽度、样式、颜色。样式必须指定（如 `solid`）才会显示。
- `margin`：外边距，可为负，可简写。**相邻垂直外边距可能合并（塌陷）**。
- `display` 基础值：
  - `block`：块级，独占一行，可设宽高。
  - `inline`：行内，宽高无效，左右 margin/padding 有效，上下无效。
  - `inline-block`：行内块，不换行但可设宽高。
  - `none`：不占据空间（区别于 `visibility: hidden`）。

#### 2.3 `visibility`

- `visible`（默认）、`hidden`（隐藏但占位）、`collapse`（用于表格行/列）。

---

### 3. 布局定位

#### 3.1 普通流（Normal Flow）

- 块级元素从上到下排列，行内元素从左到右排列（遇到边界换行）。

#### 3.2 浮动（Float）

- `float: left | right | none`
- 使元素脱离普通流，向左或向右移动，直到碰到父容器边界或其他浮动元素。
- 父元素会**高度塌陷**（不包含浮动子元素高度）。
- **清除浮动**：
  - `clear: left | right | both`：应用于后续元素，使其移到浮动下方。
  - 父元素使用 `overflow: auto/hidden` 触发 BFC。
  - 伪元素法：`clearfix::after { content: ""; display: table; clear: both; }`。

#### 3.3 定位（Position）

| 值         | 参考系                                                  | 是否脱离文档流 | 说明                                 |
| ---------- | ------------------------------------------------------- | -------------- | ------------------------------------ |
| `static`   | 无                                                      | 否             | 默认值，`top/right/bottom/left` 无效 |
| `relative` | 自身在普通流中的位置                                    | 否             | 保留原占位，偏移影响视觉位置         |
| `absolute` | 最近的已定位（非 static）祖先；若无则根元素（`<html>`） | 是             | 完全脱离，尺寸可自适应内容           |
| `fixed`    | 视口（viewport）                                        | 是             | 滚动时不移动，常用于固定导航         |
| `sticky`   | **CSS3 引入**（此处仅提一下，不属于 CSS2）              | 混合           | 相对定位和固定定位的混合             |

- `z-index`：仅在 `position` 非 `static` 时生效。数值越大越靠上，可为负数。形成**层叠上下文**。

#### 3.4 溢出 `overflow`

- `visible`（默认，溢出可见）
- `hidden`（溢出裁剪）
- `scroll`（总是显示滚动条）
- `auto`（需要时显示滚动条）

---

### 4. 文本与字体

#### 4.1 字体属性

- `font-family`：优先列表，用逗号分隔，如 `"Helvetica Neue", Arial, sans-serif`。通用字体族：`serif`、`sans-serif`、`monospace`。
- `font-size`：绝对单位（`px`、`pt`）或相对单位（`em`、`rem`、`%`）。浏览器默认一般为 `16px`。
- `font-weight`：`normal`（400）、`bold`（700）、`bolder`/`lighter` 相对父级，或数值 100~900。
- `font-style`：`normal`、`italic`、`oblique`。
- `font-variant`：`small-caps`（小型大写字母）。

#### 4.2 文本属性

- `line-height`：行高，可以是数字（相对于 `font-size`）、长度或百分比。常用于垂直居中（与 `height` 等高）。
- `text-align`：`left`、`right`、`center`、`justify`（两端对齐）。
- `text-decoration`：`none`、`underline`、`overline`、`line-through`。
- `text-indent`：首行缩进，可为负（悬挂缩进）。
- `text-transform`：`uppercase`、`lowercase`、`capitalize`。
- `letter-spacing`：字符间距。
- `word-spacing`：单词间距（对英文有效）。
- `vertical-align`：行内元素或表格单元格的垂直对齐（`top`、`middle`、`bottom`、`baseline` 等）。对块级元素无效。

#### 4.3 颜色

- 命名颜色：`red`、`blue`、`transparent`（CSS2 部分支持）等 16 种基本颜色。
- 十六进制：`#RRGGBB` 或 `#RGB`。
- RGB 函数：`rgb(255, 0, 0)`。
- 注意：`rgba()`、`hsl()` 属于 CSS3。

---

### 5. 背景（CSS2.1）

- `background-color`：背景颜色（会延伸到 border 下方，但透明边框可见）。
- `background-image`：`url('image.png')`，可设置多个？CSS2 只支持一个。
- `background-repeat`：`repeat`（默认）、`repeat-x`、`repeat-y`、`no-repeat`。
- `background-attachment`：`scroll`（随元素滚动）、`fixed`（背景固定于视口，不随元素滚动）。
- `background-position`：`top left`、`center`、`10px 20px` 等。

> CSS3 增加了 `background-size`、`background-origin`、`background-clip` 以及多背景。

---

### 6. 列表与表格

#### 6.1 列表样式

- `list-style-type`：`disc`、`circle`、`square`、`decimal`、`lower-roman` 等。
- `list-style-image`：`url('bullet.png')`。
- `list-style-position`：`inside`（项目标记在列表项内）、`outside`（默认）。
- 简写 `list-style`。

#### 6.2 表格样式

- `border-collapse`：`collapse`（合并相邻边框）、`separate`（默认分隔）。
- `border-spacing`：仅在 `separate` 时有效，设置单元格间距。
- `caption-side`：`top` 或 `bottom`。
- `empty-cells`：`show` 或 `hide`（是否显示空单元格边框）。
- `table-layout`：`auto`（自动布局，按内容计算）或 `fixed`（固定布局，按第一行列宽）。

---

### 7. 其他属性

- `cursor`：鼠标样式（`default`、`pointer`、`wait`、`help`、`crosshair` 等）。
- `outline`：轮廓，不占盒模型空间，常见于 `:focus` 状态（默认 `outline` 可移除但需提供替代焦点样式）。
- `white-space`：控制空白字符处理。常用值：
  - `normal`（合并空白，换行）
  - `nowrap`（合并空白，不换行）
  - `pre`（保留空白和换行，类似 `<pre>`）
  - `pre-wrap`、`pre-line`（CSS3 加入）。
- `content`：配合 `:before` / `:after` 伪元素生成内容，必须指定该属性（即使为空字符串）。

---

## 面试题及最佳回答范例（针对 CSS 核心基础）

### 面试题 1：请解释 CSS 的层叠、优先级和继承。

**最佳回答**：

**层叠（Cascading）**：浏览器合并多个样式来源并决定最终值的过程。顺序：

1. 浏览器默认样式（User Agent Stylesheet）
2. 用户普通样式
3. 作者样式（开发者定义的 CSS）
4. 作者 `!important`
5. 用户 `!important`（用户有最高控制权）

**优先级（Specificity）**：当多个规则作用于同一元素时，根据选择器的权重计算：

- 内联样式（`style` 属性）：1,0,0,0
- ID 选择器：0,1,0,0
- 类、属性、伪类：0,0,1,0
- 元素、伪元素：0,0,0,1
- 通用选择器、组合符（`>` `+` `~`）、否定伪类 `:not()` 本身无权重。
- 比较时从左到右，数值不进位。

**继承（Inheritance）**：某些属性（如 `color`、`font-family`、`line-height`）会从父元素传递给子元素。不可继承的属性（如 `border`、`margin`、`background`）可通过 `inherit` 强制继承。`initial` 恢复初始值。

---

### 面试题 2：`display: none` 和 `visibility: hidden` 的区别是什么？

**最佳回答**：

| 特性           | `display: none`                                     | `visibility: hidden`                                 |
| -------------- | --------------------------------------------------- | ---------------------------------------------------- |
| 是否占据空间   | 完全消失，不占位，后续元素上移                      | 占据原空间，留有空白区域                             |
| 子元素是否可见 | 所有子元素均不可见，且无法覆盖                      | 可单独设置子元素 `visibility: visible` 显示          |
| 渲染性能       | 导致重排（reflow）和重绘                            | 仅重绘（repaint），不重排                            |
| 对动画影响     | 无法过渡（transition），加 `display` 变化无过渡效果 | 支持过渡（如渐隐）                                   |
| 是否影响事件   | 元素不存在，事件无法触发                            | 元素仍在，但通常不响应鼠标事件（部分浏览器仍可触发） |

**使用建议**：需要彻底隐藏且不占位用 `display: none`；需要占位保留布局用 `visibility: hidden`。

---

### 面试题 3：什么是 BFC（块级格式化上下文）？如何触发？有什么作用？

**最佳回答**：

**定义**：BFC 是一个独立的渲染区域，内部元素的布局不会影响外部元素，反之亦然。

**触发条件**（满足任一即可）：

- 根元素（`<html>`）
- `float` 不为 `none`
- `position` 为 `absolute` 或 `fixed`
- `overflow` 不为 `visible`（如 `auto`、`hidden`、`scroll`）
- `display` 为 `inline-block`、`table-cell`、`table-caption`、`flex`、`grid`（后两者 CSS3）

**主要作用**：

1. **清除浮动**：父元素触发 BFC 后，内部包含浮动元素，防止高度塌陷。
2. **防止外边距折叠**：相邻两个块级元素上下 margin 会合并，分别触发 BFC 可避免。
3. **自适应两栏布局**：左侧浮动，右侧触发 BFC（`overflow: hidden`），则右侧不会环绕浮动元素。

**示例**：

```css
.clearfix {
  overflow: hidden; /* 触发 BFC，包含浮动子元素 */
}
```

---

### 面试题 4：浮动元素有哪些特征？如何清除浮动？

**最佳回答**：

**浮动特征**：

- 脱离普通文档流，向左或向右移动，直到碰到父容器边界或另一个浮动元素。
- 行内元素会环绕浮动元素（文字环绕效果）。
- 父元素高度塌陷（不计算浮动子元素的高度）。
- 浮动元素会自动变为块级（相当于 `display: block`）。

**清除浮动的方法**：

1. **额外标签法**（不推荐）：在浮动元素父级末尾添加 `<div style="clear: both;"></div>`。
2. **父元素 `overflow: auto/hidden`**：触发 BFC，但可能隐藏溢出内容。
3. **父元素也浮动**：不推荐，影响布局。
4. **伪元素清除法（最推荐）**：
   ```css
   .clearfix::after {
     content: "";
     display: table;
     clear: both;
   }
   /* 兼容旧浏览器 */
   .clearfix {
     *zoom: 1; /* 触发 hasLayout（IE 6/7） */
   }
   ```

---

### 面试题 5：`position: absolute` 和 `relative` 的区别？`absolute` 相对于谁定位？

**最佳回答**：

| 特点           | `relative`                               | `absolute`                                                                |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------------- |
| 参考系         | 自身在普通流中的原始位置                 | 最近的**已定位**（非 `static`）祖先，若没有则相对于初始包含块（`<html>`） |
| 是否脱离文档流 | 否（原占位保留）                         | 是（原占位消失）                                                          |
| 偏移效果       | 移动后原位置留有空白（其他元素不受影响） | 移动后其他元素会占据其原位置                                              |
| 对兄弟元素影响 | 无影响                                   | 后续元素会上移或环绕                                                      |
| `z-index`      | 生效（但需设置 `z-index` 且不为 `auto`） | 生效                                                                      |
| 常见用途       | 微调元素位置（如图标偏移）               | 悬浮层、弹窗、下拉菜单                                                    |

**示例**：`absolute` 定位的参考系确定：

```css
.parent {
  position: relative; /* 成为子元素的定位参考 */
}
.child {
  position: absolute;
  top: 0;
  left: 0; /* 相对于 .parent 左上角 */
}
```

---

### 面试题 6：什么是外边距塌陷（margin collapsing）？如何避免？

**最佳回答**：

**定义**：在普通文档流中，相邻块级元素的垂直外边距会合并为其中较大的一个，而非相加。

**发生场景**：

1. **相邻兄弟元素**：`<p>` 的 `margin-bottom` 和下一个 `<p>` 的 `margin-top` 会合并。
2. **父元素与首/末子元素**：若父元素没有边框、内边距、行内内容或 BFC，则子元素的 `margin-top` 会与父元素的 `margin-top` 合并；同理 `margin-bottom`。
3. **空块元素**：自身没有高度、内边距、边框，则上下 margin 会合并。

**避免方法**：

- 给父元素设置 `overflow: auto/hidden`（触发 BFC）。
- 给父元素设置 `border` 或 `padding`（至少 1px）。
- 使用 `display: flex` 或 `grid`（子元素不会塌陷）。
- 尽量只给一个方向设置 margin（如只使用 `margin-bottom` 或 `margin-top`）。
- 使用 `padding` 替代 `margin`（对于父子场景）。

**注意**：水平方向 margin 不会合并（只有垂直方向在块级格式化上下文中合并）。

---

### 面试题 7：行内元素和块级元素的区别？哪些是行内元素？能否设置宽高？

**最佳回答**：

| 对比项              | 块级元素                                      | 行内元素                                                                                          |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 常见元素            | `<div>`、`<p>`、`<h1>`~`<h6>`、`<ul>`、`<li>` | `<span>`、`<a>`、`<strong>`、`<em>`、`<img>`（特例）                                              |
| 默认排列            | 独占一行，垂直排列                            | 同行水平排列，超出换行                                                                            |
| 宽高                | 可设置 `width`/`height`                       | 设置无效（宽高由内容决定）。**例外**：`<img>`、`<input>`、`<canvas>` 等**可替换元素**可以设置宽高 |
| 上下 margin/padding | 上下左右均有效                                | 上下无效（`padding-top/bottom` 视觉上会撑开但不影响布局，`margin-top/bottom` 无效）               |
| 盒模型              | 完整盒模型                                    | 部分盒模型                                                                                        |

**改变显示方式**：通过 `display: block`、`inline`、`inline-block` 转换。

---

### 面试题 8：解释 `line-height` 的取值方式及其与 `height` 的关系。

**最佳回答**：

`line-height` 可取值：

- **normal**：取决于浏览器，一般约为 1.2。
- **数字**：如 `1.5`，表示 `font-size` 的 1.5 倍，**子元素继承该数字**（相对因子）。
- **长度**：如 `20px`，绝对长度，子元素继承绝对值。
- **百分比**：如 `150%`，相对于元素的 `font-size` 计算，子元素继承计算后的像素值。

**与 `height` 的关系**：

- 单行文本垂直居中：设置 `height` 等于 `line-height`，可使文本在元素中垂直居中（前提是 `line-height` 大于字体本身）。
- 多行文本：若 `height` 固定且小于 `line-height` \* 行数，内容会溢出。
- 若不设 `height`，容器高度由 `line-height` 累加决定。

**继承差异**：

```css
body {
  line-height: 1.5;
} /* 子元素继承 1.5，再乘以自身 font-size */
body {
  line-height: 150%;
} /* 子元素继承计算后的 px 值（基于父元素 font-size） */
```

---

### 面试题 9：`z-index` 什么情况下会失效？如何解决？

**最佳回答**：

**失效原因**：

1. **元素没有设置定位**：`z-index` 只对 `position` 值为 `relative`、`absolute`、`fixed`、`sticky` 的元素生效（`static` 无效）。
2. **父元素创建了层叠上下文且 `z-index` 较低**：子元素无论 `z-index` 多高，都无法超越父级兄弟元素。
   - 父元素有 `z-index` 且为 auto 以外的值时，会创建新的层叠上下文。
   - 父元素有 `opacity < 1`、`transform`、`filter` 等 CSS3 属性也会创建层叠上下文（但 CSS2 中较少）。
3. **层叠顺序**：非定位元素在定位元素下层。
4. **IE/Win 下 `z-index` 默认可能失效**（老 bug）。

**解决方案**：

- 确保元素设置了 `position`（`relative`、`absolute` 或 `fixed`）。
- 检查父元素的层叠上下文，提升父元素的 `z-index` 或移除其创建上下文的属性。
- 避免在多级嵌套中滥用 `z-index`，尽量保持扁平化。

---

### 面试题 10：`margin` 和 `padding` 的差异及使用场景。

**最佳回答**：

| 差异         | `margin`                         | `padding`                |
| ------------ | -------------------------------- | ------------------------ |
| 位置         | 边框外侧                         | 边框内侧，内容与边框之间 |
| 背景         | 背景不覆盖 margin 区域           | 背景覆盖 padding 区域    |
| 颜色         | 透明                             | 受元素背景影响           |
| 负值         | 允许，元素可移出父容器或覆盖兄弟 | 不允许                   |
| 合并（塌陷） | 垂直 margin 会合并               | 不会合并                 |
| 对父容器影响 | 可能溢出父容器（不撑开）         | 撑开父容器               |

**使用场景**：

- **margin**：用于元素之间的间距（如段落间隔、组件间距）。实现水平居中：`margin: 0 auto;`（块级元素有宽度）。
- **padding**：用于元素内容与边框的内边距（如按钮内填充、卡片内边距）。也用于扩大点击区域（如小图标的链接）。

**示例**：导航菜单项之间用 `margin-right`，菜单项内文字与边框用 `padding`。

---

以上是对“知识点三（CSS 核心基础）”的详细补充及常见面试题的最佳回答。建议结合代码练习理解盒模型、浮动与清除、定位机制等核心概念。
