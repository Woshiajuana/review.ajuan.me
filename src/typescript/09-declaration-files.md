# 类型声明与声明文件

## 知识点

### 声明文件（`.d.ts`）概述

声明文件以 `.d.ts` 为扩展名，只包含类型定义，不包含具体实现。它描述 JavaScript 库或模块的形状，使 TypeScript 能够进行类型检查和提供智能提示。

**作用**：

- 为纯 JavaScript 库提供类型信息。
- 为全局变量或非模块化代码添加类型。
- 拆分大型项目的类型定义。

**生成声明文件**：在 `tsconfig.json` 中设置 `"declaration": true`，TypeScript 编译器会自动为每个 `.ts` 文件生成对应的 `.d.ts` 文件。

---

### `declare` 关键字

`declare` 用于告诉 TypeScript 某个值已经在其他地方存在（由 JavaScript 运行时或外部库提供），不需要生成代码。

```typescript
// 声明全局变量
declare const VERSION: string;

// 声明全局函数
declare function log(message: string): void;

// 声明全局类
declare class User {
  name: string;
  constructor(name: string);
  greet(): void;
}

// 声明全局命名空间
declare namespace MyLib {
  function doSomething(): void;
  interface Options {
    timeout: number;
  }
}

// 声明模块
declare module "my-custom-module" {
  export const apiKey: string;
  export function fetchData(): Promise<any>;
}
```

---

### `export as namespace`

用于将模块（通常为 UMD 格式）暴露为全局变量，既支持 `import` 导入，又支持直接通过 `<script>` 标签加载后使用全局变量。

```typescript
// my-lib.d.ts
export function greet(name: string): void;
export as namespace MyLib;
```

**使用效果**：

```typescript
// 作为模块导入
import { greet } from "my-lib";
greet("Alice");

// 作为全局变量（script 标签加载后）
MyLib.greet("Alice");
```

---

### 模块增强（Module Augmentation）

在当前项目中为已有模块添加新的导出或扩展现有接口。

```typescript
// 为 express 的 Request 添加 user 属性
import { Request } from "express";

declare module "express" {
  interface Request {
    user?: { id: number; name: string };
  }
}
```

**注意**：模块增强必须位于**模块文件**（有 `import`/`export`）中，否则会变为全局增强。

---

### 全局增强（Global Augmentation）

在模块文件中扩展全局作用域的类型。

```typescript
// global-augmentation.ts
export {}; // 确保文件被视为模块

declare global {
  interface Array<T> {
    last(): T | undefined;
  }
  namespace NodeJS {
    interface ProcessEnv {
      MY_CUSTOM_VAR: string;
    }
  }
}
```

之后在整个项目中，`Array.prototype.last` 将有类型定义。

---

### `@types` 与 DefinitelyTyped

- **DefinitelyTyped**：社区维护的仓库，为没有内置类型的 npm 包提供类型定义。
- **`@types/<package-name>`**：通过 npm 安装的类型包，如 `@types/lodash`、`@types/react`。

**安装**：`npm install @types/package-name --save-dev`

**查找**：TypeScript 默认会查找 `node_modules/@types` 下的类型定义，无需额外配置。

---

### 编写声明文件的最佳实践

#### 为全局库编写声明

```typescript
// my-global-lib.d.ts
interface MyLibraryOptions {
  debug?: boolean;
}
declare function initMyLibrary(options: MyLibraryOptions): void;
declare const version: string;
```

#### 为模块化库编写声明

```typescript
// my-module.d.ts
export function add(a: number, b: number): number;
export function subtract(a: number, b: number): number;
export interface Calculator {
    result: number;
    clear(): void;
}
export default class AdvancedCalculator implements Calculator { ... }
```

#### 处理动态导出（如 jQuery 插件）

```typescript
declare module "jquery" {
  interface JQuery {
    myPlugin(options?: any): JQuery;
  }
}
```

#### 处理 CommonJS 模块（`module.exports = ...`）

```typescript
// 方式1：使用 export =
declare module "my-commonjs-lib" {
  function doSomething(): void;
  export = doSomething;
}

// 方式2：使用 namespace 和 export =（旧写法）
declare module "my-commonjs-lib" {
  namespace lib {
    function doSomething(): void;
  }
  export = lib;
}
```

#### 使用 `declare module` 通配符

```typescript
// 为所有 .css 文件声明类型
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// 为所有 .vue 文件声明类型
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

---

### `/// <reference types="..." />` 引用类型定义

三斜线指令的一种，用于显式引用 `@types` 包。通常不需要手动写，因为 TypeScript 会自动包含 `types` 字段或 `typeRoots` 中的类型。但在某些场景（如动态类型加载）可用。

```typescript
/// <reference types="node" />
```

---

### `typeRoots` 和 `types`

`tsconfig.json` 中控制类型查找的选项：

- **`typeRoots`**：指定类型定义的根目录列表，默认为 `node_modules/@types`。自定义后，TypeScript 只在这些目录中查找。
- **`types`**：指定要包含的类型包名称列表。如果设置，只包含列出的包，其他 `@types/*` 不会被自动包含。

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./node_modules/@types"],
    "types": ["node", "jest"]
  }
}
```

---

### 发布自己的类型定义

**方式一：与 npm 包一起发布**

- 在 `package.json` 中设置 `"types": "index.d.ts"`。
- 将 `.d.ts` 文件打包到 npm 包中。

**方式二：发布到 DefinitelyTyped**

- 将类型定义贡献到 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 仓库，通过 `@types/<package>` 发布。

**方式三：使用 `typesVersions` 按 TypeScript 版本提供不同类型**

```json
{
  "typesVersions": {
    ">=3.1": { "*": ["ts3.1/*"] },
    ">=4.0": { "*": ["ts4.0/*"] }
  }
}
```

---

## 面试题

### 什么是 `.d.ts` 文件？它和 `.ts` 文件有什么区别？

- **`.d.ts`** 是 TypeScript 声明文件，只包含类型信息（接口、类型别名、函数签名等），不包含具体实现代码。它用于描述 JavaScript 模块或全局变量的类型形状。
- **`.ts`** 是 TypeScript 源文件，包含可执行的 TypeScript 代码（逻辑+类型），编译后生成 JavaScript。

**区别**：
| 特性 | `.ts` | `.d.ts` |
|------|-------|---------|
| 包含实现 | ✅ 可以 | ❌ 不能 |
| 编译输出 | 生成 `.js` 和 `.d.ts`（如果配置） | 无输出（或作为类型输入） |
| 主要用途 | 编写应用/库逻辑 | 提供类型定义 |
| 能否被导入 | 可以（值为实现，类型为导出） | 只能导入类型，无实际值 |

**使用场景**：为无类型的 JS 库编写 `.d.ts`，或为大型项目分离类型（类似 C/C++ 的头文件）。

---

### 如何为没有类型声明的第三方库添加类型？有哪几种方式？

1. **查找 `@types` 包**：`npm install @types/package-name`，绝大多数流行库都有社区维护的类型。

2. **编写自定义声明文件**：在项目中创建 `types/package-name.d.ts`，使用 `declare module` 添加类型。

   ```typescript
   // types/my-untyped-lib.d.ts
   declare module "my-untyped-lib" {
     export function doSomething(input: string): number;
   }
   ```

3. **使用 `declare module` 通配符快速解决**：如果只在一处使用且不需要精确类型，可使用 `declare module 'my-untyped-lib';` 将其视为 `any`（不推荐）。

4. **使用 `// @ts-ignore` 或 `any` 断言**：临时绕过，但会丢失类型安全。

**最佳实践**：优先查找 `@types`；若没有，自己编写小范围的声明；如有精力，可贡献到 DefinitelyTyped。

---

### 什么是 `export as namespace`？何时使用？

`export as namespace` 用于在声明文件中指定模块的全局命名空间名称。它指示 TypeScript：该模块除了可以作为 ES 模块导入外，还可以在全局作用域下通过指定的变量名访问（通常用于 UMD 库）。

**使用场景**：当开发的库需要同时支持 `<script>` 标签引入（全局变量方式）和 `import` 导入（模块方式）时，需要在 `.d.ts` 中加上 `export as namespace`。

**示例**：

```typescript
// math-lib.d.ts
export function add(a: number, b: number): number;
export as namespace MathLib;
```

**效果**：

```html
<!-- 通过 script 加载后 -->
<script src="math-lib.js"></script>
<script>
  MathLib.add(1, 2); // 类型安全
</script>
```

---

### 模块增强（Module Augmentation）和全局增强（Global Augmentation）有什么区别？

- **模块增强**：在**当前文件**中为**特定模块**扩展其类型定义（如为 `express` 的 `Request` 接口添加属性）。必须位于模块文件中（即有 `import` 或 `export`），增强只在该模块作用域内生效？实际上模块增强会影响到整个项目中对该模块的使用，因为它是对模块声明的全局修改。

- **全局增强**：在模块文件中使用 `declare global` 扩展**全局作用域**的类型（如为 `Array` 添加方法，为 `Window` 添加属性）。同样需要在模块文件中（为了隔离），但增强的是全局命名空间，对整个项目有效。

**区别**：
| 增强类型 | 目标 | 语法 | 影响范围 |
|---------|------|------|----------|
| 模块增强 | 指定模块的接口 | `declare module 'module-name' { ... }` | 该模块的所有使用处 |
| 全局增强 | 全局对象/内置类型 | `declare global { ... }` | 全局作用域 |

**示例**：

```typescript
// 模块增强
declare module "axios" {
  interface AxiosRequestConfig {
    retry?: number;
  }
}

// 全局增强
declare global {
  interface String {
    truncate(len: number): string;
  }
}
```

---

### 如何编写一个声明文件来兼容 CommonJS 导出（`module.exports = function`）？

CommonJS 模块可能导出任意值（如函数、对象），而 TypeScript 的 ES 模块语法使用 `export default` 或 `export =` 来处理。推荐使用 `export =` 语法。

**示例**：假设有一个 CommonJS 模块 `logger.js`：

```js
module.exports = function log(msg) {
  console.log(msg);
};
```

其声明文件 `logger.d.ts` 应写为：

```typescript
declare function log(msg: string): void;
export = log;
```

或者将函数附加命名空间：

```typescript
declare function log(msg: string): void;
declare namespace log {
  const level: string;
}
export = log;
```

**使用**：

```typescript
import log = require("logger");
// 或
import * as log from "logger";
log("hello");
```

如果设置了 `esModuleInterop: true`，也可以使用 `import log from 'logger'`，但底层仍通过 `export =` 兼容。

---

### `types` 和 `typeRoots` 在 `tsconfig.json` 中有什么作用？

- **`typeRoots`**：指定一个或多个目录作为类型定义文件的根目录。默认值为 `["node_modules/@types"]`。如果自定义，TypeScript 将**只**在这些目录中查找类型包（不会回退到默认）。

- **`types`**：指定要包含的类型包名称列表。如果设置，只有列出的包会被 TypeScript 包含（其他 `@types/*` 包被忽略）。常用于控制大型项目中哪些类型被全局引入。

**示例**：

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./node_modules/@types"],
    "types": ["node", "jest"]
  }
}
```

**场景**：项目中有多个 `@types` 包，但只想包含 `node` 和 `jest`，避免类型冲突或减少编译内存占用。

---

### 如何在声明文件中表示一个可以 new 的类？如何使用 `declare class`？

使用 `declare class` 描述类的形状，包括构造函数、实例属性、方法和静态成员。

```typescript
declare class Person {
  // 构造函数
  constructor(name: string, age: number);
  // 实例属性
  name: string;
  age: number;
  // 实例方法
  greet(): string;
  // 静态属性
  static species: string;
  // 静态方法
  static createAnonymous(): Person;
}
```

使用后，TypeScript 认为 `Person` 是一个可构造的类型：

```typescript
const alice = new Person("Alice", 30);
```

如果构造函数被重载，可以写多个重载签名：

```typescript
declare class Animal {
  constructor();
  constructor(name: string);
}
```

---

### 如何为动态模块（如 `.vue`、`.css`、`.jpg`）添加类型声明？

使用通配符模块声明（`declare module '*.ext'`）。

**示例**：

```typescript
// images.d.ts
declare module "*.jpg" {
  const src: string;
  export default src;
}

// css.d.ts
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// vue.d.ts (Vue 2)
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

// vue.d.ts (Vue 3)
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

这些声明文件通常放在项目根目录的 `types` 文件夹下，并在 `tsconfig.json` 中通过 `include` 包含。

---

### TypeScript 如何查找类型定义？解析顺序是怎样的？

TypeScript 的类型解析顺序（以 `import { X } from 'my-package'` 为例）：

1. 检查 `my-package` 的 `package.json` 中的 `types` 或 `typings` 字段，指向的 `.d.ts` 文件。
2. 如果没有，则查找 `my-package` 下的 `index.d.ts`。
3. 再找不到，在 `node_modules/@types/my-package` 下查找。
4. 如果仍找不到且 `baseUrl` 和 `paths` 配置了映射，会尝试映射路径。
5. 如果所有尝试失败，报告错误（除非 `noImplicitAny` 关闭，类型变为 `any`）。

**全局类型查找**：

- `typeRoots` 目录下的所有包（或 `types` 指定的包）自动全局可用，无需导入。

**模块解析与类型解析并行**：TypeScript 既解析模块位置（寻找 `.ts`/`.js`），又解析类型位置（`.d.ts`）。

---

### 什么是 DefinitelyTyped？如何贡献一个类型定义？

**DefinitelyTyped** 是一个 GitHub 仓库，社区维护着数千个 npm 包的类型定义。通过 `@types/<package>` 包发布。

**贡献步骤**（简述）：

1. Fork [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 仓库。
2. 在 `types/<package-name>` 目录下创建或修改 `.d.ts` 文件。
3. 添加测试文件（通常位于 `types/<package-name>/<package-name>-tests.ts`）验证类型正确性。
4. 运行 `npm test` 确保没有错误。
5. 提交 Pull Request，遵循仓库的贡献指南（如需要添加版权头、更新 `index.d.ts` 等）。

**注意事项**：

- 类型定义必须严格匹配原库的行为。
- 不能改变 JavaScript 库的公开 API，不能添加不存在的方法。
- 需要保持与库的版本同步。
