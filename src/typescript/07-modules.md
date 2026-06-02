# 模块

## 知识点

### ES 模块基础

TypeScript 支持 ES 模块语法，与 JavaScript 模块保持一致。

```typescript
// 导出
export const PI = 3.14159;
export function add(a: number, b: number) { return a + b; }
export class Calculator { ... }

// 默认导出
export default class Main { ... }

// 导入
import { PI, add } from './math';
import * as math from './math';
import Main from './Main';
```

---

### 类型导入与导出

使用 `import type` 和 `export type` 明确导入/导出类型，在编译后可被删除。

```typescript
// math.ts
export type Vector = { x: number; y: number; };
export interface Matrix { ... }

// app.ts
import type { Vector } from './math';
import { type Vector as Vec } from './math';  // 混合导入
```

**优势**：明确区分值与类型，有助于工具链优化，避免循环依赖问题。

---

### 默认导入与命名空间导入

- **默认导入**：`import X from 'module'`
- **命名空间导入**：`import * as X from 'module'`
- **混合导入**：`import X, { Y, Z } from 'module'`

TypeScript 需要确保 `esModuleInterop` 标志来处理 CommonJS 模块的默认导入。

---

### 模块解析策略

`tsconfig.json` 中的 `moduleResolution` 选项：

- **Node**：模仿 Node.js 的模块解析（查找 `node_modules`、`package.json` 的 `main`、文件扩展名补全等）。
- **Classic**：TypeScript 旧版解析策略（仅用于向后兼容）。
- **Bundler**（TS 5.0+）：针对现代打包器（Vite、esbuild、Webpack）的解析策略，支持 `exports` 条件导出。

**路径映射**（`paths` 和 `baseUrl`）：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@utils/*": ["src/utils/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

---

### 三斜线指令（Triple-Slash Directives）

三斜线指令是包含单个 XML 标签的注释，用于在旧项目中声明依赖关系。**现代项目中不推荐使用**，优先使用 ES 模块。

```typescript
/// <reference path="..." />      // 引入其他声明文件
/// <reference types="..." />     // 引入内置类型定义（如 @types/node）
/// <reference lib="..." />       // 引入内置库（如 lib: "es2015"）
```

---

### 命名空间（Namespace）

命名空间是 TypeScript 早期用于组织代码的方式，编译后生成全局变量。**在模块化时代不推荐使用**，但可能维护旧项目时需要了解。

```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  export const lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return Validation.lettersRegexp.test(s);
    }
  }
}
// 使用
let validator = new Validation.LettersOnlyValidator();
```

**多文件命名空间**（使用三斜线指令引用）：

```typescript
/// <reference path="Validation.ts" />
namespace Validation {
  // 扩展定义
}
```

**注意**：命名空间可以跨文件合并，但容易导致命名冲突和全局污染。推荐使用 ES 模块替代。

---

### 全局模块与模块增强

#### 全局增强

在模块文件中，可以使用 `declare global` 扩展全局作用域。

```typescript
// global.d.ts
declare global {
  interface Array<T> {
    last(): T | undefined;
  }
}
export {}; // 确保文件作为模块处理
```

#### 模块增强

为已有模块添加额外的导出或扩展其类型。

```typescript
// 扩展第三方模块
import { Observable } from "rxjs";
declare module "rxjs" {
  interface Observable<T> {
    mapAsync<R>(fn: (value: T) => Promise<R>): Observable<R>;
  }
}
```

---

### 类型声明文件（`.d.ts`）

为 JavaScript 库提供类型定义。编写声明文件常用语法：

- `declare var` / `declare let` / `declare const`：声明全局变量
- `declare function`：声明全局函数
- `declare class`：声明全局类
- `declare namespace`：声明命名空间
- `declare module`：声明模块
- `export` / `export default`：导出类型
- `export as namespace`：将模块暴露为全局变量

**示例**：为第三方库 `my-lib` 编写声明

```typescript
// my-lib.d.ts
declare module "my-lib" {
  export function doSomething(input: string): number;
  export const version: string;
}
```

**`@types` 与 DefinitelyTyped**：

- 常见库的类型定义在 `@types/<package-name>` 中，可通过 `npm install @types/package` 安装。
- 没有官方类型定义时，可自行编写 `.d.ts` 或使用 `declare module 'module-name'` 临时声明。

---

### 模块解析与编译选项

- **`module`**：决定输出模块格式（`CommonJS`, `ESNext`, `ES2020`, `AMD`, `UMD`, `System` 等）
- **`target`**：决定输出 JS 版本
- **`esModuleInterop`**：简化 CommonJS 与 ES 模块互操作，自动添加辅助代码
- **`allowSyntheticDefaultImports`**：允许默认导入没有默认导出的模块（仅类型检查，需要打包器支持）
- **`isolatedModules`**：确保每个文件可以作为独立模块转译（用于 Babel、esbuild 等）
- **`resolveJsonModule`**：允许导入 `.json` 文件
- **`declaration`**：生成 `.d.ts` 声明文件
- **`declarationMap`**：生成 `.d.ts.map` 源映射

---

### 项目引用（Project References）

用于大型项目（monorepo）优化构建，将项目分为多个子项目，支持增量构建。

```json
// tsconfig.json (根)
{
  "references": [{ "path": "./packages/core" }, { "path": "./packages/utils" }]
}
```

子项目需设置 `composite: true`。

---

## 面试题

### TypeScript 中模块（Module）和命名空间（Namespace）有什么区别？应该使用哪个？

- **模块**：遵循 ES 模块标准，每个文件是一个独立模块，通过 `import`/`export` 导入导出。模块具有文件作用域，不会污染全局。现代 TypeScript 项目应**始终使用模块**。
- **命名空间**：旧有的组织代码方式，编译后产生全局变量，可以跨文件合并。命名空间容易造成全局命名冲突，且不支持动态导入、树摇等现代特性。

**区别**：
| 特性 | 模块 | 命名空间 |
|------|------|----------|
| 作用域 | 文件级 | 全局（可嵌套） |
| 导入导出 | `import/export` | `namespace` + `export`，通过三斜线指令引用 |
| 合并 | 不支持文件级合并（但支持声明合并） | 支持跨文件合并 |
| 动态导入 | 支持 `import()` | 不支持 |
| 推荐程度 | ✅ 强烈推荐 | ❌ 不推荐（仅维护旧项目） |

**结论**：新项目一律使用 ES 模块；命名空间只用于全局脚本（如非模块化的纯 JS 类型定义）或遗留代码。

---

### `import type` 和普通 `import` 有什么区别？什么时候使用？

- **普通 `import`**：导入值（函数、变量、类）和类型（接口、类型别名）。编译后，导入的值会保留为模块依赖，导入的类型会被删除。
- **`import type`**：只导入类型，编译后完全删除。它强制确保只导入类型，不能导入值。

**区别**：

```typescript
// 普通 import 可以导入值和类型
import { Component, Props } from "library";

// import type 只能导入类型
import type { Props } from "library";
import { type Props } from "library"; // 混合导入
```

**使用场景**：

- 当只需要类型时，使用 `import type` 可以避免潜在的循环依赖（因为不产生运行时引用）。
- 明确区分类型和值，提高代码可读性。
- 配合 `isolatedModules` 标志，某些转译器需要知道哪些是纯类型导入。

**最佳实践**：如果只用到类型，一律使用 `import type`；如果同时需要类型和值，使用混合导入或普通导入。

---

### 如何为 JavaScript 库编写 TypeScript 声明文件？简述步骤。

**步骤**：

1. 创建一个 `.d.ts` 文件（如 `my-library.d.ts`）。
2. 使用 `declare module 'module-name'` 包裹类型定义。
3. 在内部使用 `export` 导出函数、类、接口等。
4. 如果需要支持全局变量（UMD 库），使用 `export as namespace`。

**示例**：

```typescript
// my-math.d.ts
declare module "my-math" {
  export function add(a: number, b: number): number;
  export function multiply(a: number, b: number): number;
  export const PI: number;
  export default function compute(x: number): number;
}
```

**发布声明文件**：

- 如果维护库本身，在 `package.json` 中设置 `"types": "index.d.ts"`。
- 如果是第三方库，可以将 `.d.ts` 提交到 DefinitelyTyped（通过 `@types/` 发布），或发布自己的类型包 `@types/my-library`。

**快速生成**：使用 `tsc --declarationOnly` 从 TypeScript 源码自动生成。

---

### `tsconfig.json` 中 `module` 和 `target` 选项的作用是什么？如何配置？

- **`target`**：指定编译后的 JavaScript 版本（如 `ES5`, `ES2015`, `ES2020`, `ESNext`）。它决定 TypeScript 降级哪些 ES 新特性（如箭头函数、类、`async/await`）。
- **`module`**：指定输出模块格式（如 `CommonJS`, `ESNext`, `ES2020`, `AMD`, `UMD`, `System`）。它决定模块导入导出语句转换为哪种格式。

**常见配置场景**：

- **Node.js 项目**：`target: "ES2020"`, `module: "CommonJS"`（或 `ESNext` 配合 `type: module`）
- **现代浏览器/打包器（Vite）**：`target: "ES2020"`, `module: "ESNext"`
- **旧浏览器兼容**：`target: "ES5"`, `module: "ESNext"`（由打包器处理模块）
- **库发布**：`target: "ES2015"`, `module: "CommonJS"` 并提供 `.mjs` 双输出

**注意**：`target` 不影响模块格式；`module` 影响输出模块语法。例如 `target: "ES5"` 且 `module: "ESNext"` 时，类会转换为 ES5 函数，但 `import/export` 保持不变。

---

### 什么是模块解析策略（Module Resolution）？Node 和 Classic 策略有什么区别？

模块解析策略决定 TypeScript 如何根据模块路径（如 `import { X } from 'module'`）找到对应的文件（`.ts`, `.tsx`, `.d.ts` 或 `.js`）。

- **Classic**：旧版策略，仅用于向后兼容。解析顺序简单：相对路径找文件，非相对路径在包含当前文件的目录中查找，然后向上遍历到根。不推荐使用。
- **Node**：模仿 Node.js 的 `require` 解析算法：
  - 相对路径：尝试 `.ts`, `.tsx`, `.d.ts`，然后找 `package.json` 的 `types` 和 `main`。
  - 非相对路径：在 `node_modules` 中查找（向上遍历），处理 `package.json` 的 `exports`/`imports` 条件。
- **Bundler**（TS 5.0+）：针对现代打包器（Vite, Webpack, esbuild）的解析，支持条件导出和更宽松的扩展名解析。

**实际选择**：大多数项目使用 `"moduleResolution": "node"`，使用打包器时可用 `"bundler"`。

---

### 如何扩展第三方模块的类型？请举例。

使用**模块增强（Module Augmentation）**。在同一项目中（或全局声明文件），使用 `declare module 'module-name'` 在模块作用域内添加或修改类型。

**示例**：为 `express` 的 `Request` 对象添加 `user` 属性

```typescript
// types/express-augmentation.d.ts
import { User } from "../models/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
```

**注意事项**：

- 该文件必须是模块（即有 `import`/`export`），否则会成为全局增强。
- 增强的类型会在整个项目生效。
- 模块增强不能用于添加新的顶级导出（只能扩展现有接口/类型）。

**替代方案**：如果模块作者未预留扩展点，可以使用交叉类型包装或写一个 wrapper 模块。

---

### 什么是三斜线指令？现在还需要使用吗？

三斜线指令是包含单个 XML 标签的注释，用于在 TypeScript 旧版本中指示文件之间的依赖关系。常见的有：

- `/// <reference path="..." />`：引用另一个文件（通常用于声明文件或命名空间）。
- `/// <reference types="..." />`：引用 `@types` 声明。
- `/// <reference lib="..." />`：引用内置库（如 `"dom"`, "es2015"）。

**现状**：在现代 ES 模块项目中，**不需要也不应该使用三斜线指令**，因为 `import/export` 可以完全替代它。只在以下场景可能遇到：

- 维护旧项目（使用命名空间和全局脚本）。
- 全局脚本（非模块）中引入声明文件。
- 生成 `.d.ts` 文件时，工具链可能自动插入（但开发者无需手动写）。

**建议**：新项目完全避免三斜线指令。

---

### `export as namespace` 有什么作用？何时使用？

`export as namespace` 用于创建一个 UMD 模块类型定义，使得该模块既可以作为 ES 模块导入，也可以作为全局变量（通过 `<script>` 标签）使用。

**示例**：

```typescript
// my-lib.d.ts
export function greet(name: string): void;
export as namespace MyLib;
```

这样，使用者既可以：

```typescript
import { greet } from "my-lib"; // ES 模块
greet("Alice");
```

也可以（全局模式）：

```html
<script src="my-lib.js"></script>
<script>
  MyLib.greet("Alice"); // 全局变量
</script>
```

**使用场景**：当编写一个既支持模块化又支持直接通过 `<script>` 加载的库时，需要在声明文件中使用 `export as namespace` 定义全局命名空间。

---

### TypeScript 项目引用（Project References）解决了什么问题？如何使用？

**解决的问题**：大型 monorepo 项目中，多个子项目相互依赖，每次编译需重新编译整个项目，速度慢。项目引用允许将项目拆分为多个可独立构建的子项目，实现增量构建和更快的编译。

**使用方法**：

1. 在子项目的 `tsconfig.json` 中设置 `"composite": true`。
2. 在根 `tsconfig.json` 中，使用 `references` 数组指向子项目路径。
3. 使用 `tsc --build` 命令构建所有项目，它会自动按依赖顺序构建。

**示例**：

```json
// packages/core/tsconfig.json
{
  "compilerOptions": { "composite": true, "outDir": "./dist" },
  "include": ["src"]
}

// packages/app/tsconfig.json
{
  "extends": "../../tsconfig.base",
  "references": [{ "path": "../core" }]
}

// 根 tsconfig.json
{
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/app" }
  ]
}
```

**优点**：

- 增量编译：只重编译变更的子项目。
- 类型安全：确保依赖关系正确。
- 编辑器支持：跳转和自动导入工作正常。
