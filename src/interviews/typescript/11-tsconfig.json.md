# 配置文件与编译选项

## 知识点

### `tsconfig.json` 概述

`tsconfig.json` 是 TypeScript 项目的配置文件，位于项目根目录，用于指定编译选项、要包含/排除的文件、路径映射等。通过 `tsc` 命令自动识别。

生成配置文件：`tsc --init`

---

### 核心顶层字段

| 字段              | 说明                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `compilerOptions` | 编译器选项（最重要）                                                                        |
| `include`         | 指定要编译的文件/目录数组（支持 glob）                                                      |
| `exclude`         | 排除的文件/目录（默认排除 `node_modules`, `bower_components`, `jspm_packages` 及 `outDir`） |
| `files`           | 显式指定文件列表（优先级最高，常用于小项目）                                                |
| `extends`         | 继承另一个配置文件                                                                          |
| `references`      | 项目引用（monorepo 支持）                                                                   |
| `watchOptions`    | 监听模式配置（TS 3.8+）                                                                     |
| `typeAcquisition` | 控制自动类型获取（用于 JS 项目）                                                            |

---

### `compilerOptions` 详细说明

#### 基础选项

| 选项              | 类型       | 默认值                                                 | 说明                                                                                                   |
| ----------------- | ---------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `target`          | `string`   | `ES3`                                                  | 编译输出的 JavaScript 版本（`ES5`, `ES6`/`ES2015`, `ES2016`, …, `ESNext`）                             |
| `module`          | `string`   | 取决于 `target`（`ES6` 时默认 `ES6`，否则 `CommonJS`） | 生成的模块系统（`CommonJS`, `ES6`/`ES2015`, `ESNext`, `AMD`, `UMD`, `System`, `NodeNext`, `Preserve`） |
| `lib`             | `string[]` | 根据 `target` 推断                                     | 编译时包含的内置类型库（如 `DOM`, `ES2015`, `ES2020.Promise`）                                         |
| `outDir`          | `string`   | 未指定时与源文件同目录                                 | 输出目录                                                                                               |
| `rootDir`         | `string`   | 自动推断（所有输入文件的最长公共路径）                 | 控制输出目录结构的根目录                                                                               |
| `outFile`         | `string`   | 无                                                     | 将所有输出合并到一个文件（仅 `module` 为 `AMD` 或 `System`）                                           |
| `removeComments`  | `boolean`  | `false`                                                | 删除注释                                                                                               |
| `noEmit`          | `boolean`  | `false`                                                | 不生成输出文件（仅类型检查）                                                                           |
| `noEmitOnError`   | `boolean`  | `false`                                                | 有错误时不生成输出                                                                                     |
| `sourceMap`       | `boolean`  | `false`                                                | 生成 `.map` 源映射文件                                                                                 |
| `inlineSourceMap` | `boolean`  | `false`                                                | 源映射内联到输出文件中                                                                                 |
| `declaration`     | `boolean`  | `false`                                                | 生成 `.d.ts` 声明文件                                                                                  |
| `declarationMap`  | `boolean`  | `false`                                                | 为 `.d.ts` 生成源映射                                                                                  |
| `declarationDir`  | `string`   | 无                                                     | 声明文件的输出目录                                                                                     |

#### 严格模式（Strict）家族

| 选项                           | 说明                                                           | 推荐                   |
| ------------------------------ | -------------------------------------------------------------- | ---------------------- |
| `strict`                       | 启用所有严格类型检查选项（总开关）                             | ✅ 开启                |
| `strictNullChecks`             | 严格检查 `null` 和 `undefined`                                 | ✅                     |
| `noImplicitAny`                | 禁止隐式 `any`（参数、变量无类型时报错）                       | ✅                     |
| `strictFunctionTypes`          | 函数参数严格逆变检查                                           | ✅                     |
| `strictBindCallApply`          | 对 `bind`/`call`/`apply` 进行严格类型检查                      | ✅                     |
| `strictPropertyInitialization` | 类属性必须在构造函数中初始化（与 `strictNullChecks` 一起生效） | ✅                     |
| `noImplicitThis`               | 禁止隐式 `any` 类型的 `this`                                   | ✅                     |
| `alwaysStrict`                 | 输出文件添加 `"use strict"`                                    | ✅（由 `strict` 开启） |

#### 模块解析选项

| 选项                       | 说明                                                                  |
| -------------------------- | --------------------------------------------------------------------- |
| `moduleResolution`         | 模块解析策略：`node`（默认），`classic`（弃用），`bundler`（TS 5.0+） |
| `baseUrl`                  | 解析非相对模块的基础路径（如 `"baseUrl": "./src"`）                   |
| `paths`                    | 路径映射（相对于 `baseUrl`），如 `{"@utils/*": ["utils/*"]}`          |
| `rootDirs`                 | 多个虚拟根目录，用于将分散的目录视为一个公共根目录                    |
| `typeRoots`                | 类型定义根目录列表（默认为 `["node_modules/@types"]`）                |
| `types`                    | 要包含的类型包列表（如果指定，其他 `@types/*` 将被忽略）              |
| `allowUmdGlobalAccess`     | 允许从 UMD 模块访问全局变量（不需 `import`）                          |
| `resolveJsonModule`        | 允许导入 `.json` 文件，类型为 `any` 或派生类型                        |
| `allowArbitraryExtensions` | TS 5.0+，允许导入任意扩展名文件，配合 `.d.ts` 使用                    |

#### 互操作性选项

| 选项                               | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| `esModuleInterop`                  | 简化 CommonJS 与 ES 模块互操作，自动生成辅助代码             |
| `allowSyntheticDefaultImports`     | 允许默认导入没有默认导出的模块（仅类型检查，需要打包器支持） |
| `preserveSymlinks`                 | 保留符号链接路径（与 Node 的 `--preserve-symlinks` 类似）    |
| `forceConsistentCasingInFileNames` | 强制文件名大小写一致（跨平台）                               |

#### 输出检查与辅助

| 选项                           | 说明                                                 |
| ------------------------------ | ---------------------------------------------------- |
| `isolatedModules`              | 确保每个文件可被独立转译（用于 Babel、esbuild、swc） |
| `skipLibCheck`                 | 跳过声明文件的类型检查（加快编译，推荐开启）         |
| `suppressExcessPropertyErrors` | 禁止多余属性检查（不推荐）                           |
| `noFallthroughCasesInSwitch`   | 检查 switch 语句是否遗漏 `break`                     |
| `noImplicitReturns`            | 函数所有分支必须返回值                               |
| `noUnusedLocals`               | 禁止未使用的局部变量                                 |
| `noUnusedParameters`           | 禁止未使用的参数                                     |
| `noUncheckedIndexedAccess`     | 索引访问时自动添加 `undefined`（更安全）             |
| `exactOptionalPropertyTypes`   | 更严格区分可选属性和 `undefined`                     |

#### 实验性和高级选项

| 选项                     | 说明                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `experimentalDecorators` | 启用装饰器支持                                                                               |
| `emitDecoratorMetadata`  | 为装饰器生成元数据（需要 `reflect-metadata`）                                                |
| `jsx`                    | JSX 处理方式：`react`, `react-jsx`（自动运行时）, `react-jsxdev`, `preserve`, `react-native` |
| `jsxFactory`             | 指定 `React.createElement` 的替代函数                                                        |
| `jsxFragmentFactory`     | 指定 `Fragment` 的替代函数                                                                   |
| `jsxImportSource`        | 指定 JSX 运行时模块（用于 `react-jsx`）                                                      |
| `emitDeclarationOnly`    | 只生成 `.d.ts` 不生成 `.js`                                                                  |
| `incremental`            | 启用增量编译，保存 `.tsbuildinfo` 文件                                                       |
| `tsBuildInfoFile`        | 指定 `.tsbuildinfo` 文件位置                                                                 |

---

### `include` / `exclude` / `files` 示例

```json
{
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"],
  "files": ["src/index.ts", "src/core.ts"]
}
```

---

### `extends` 继承配置

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020"
  }
}
// tsconfig.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

---

### 项目引用（Project References）

用于 monorepo，需设置 `composite: true`。

```json
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  }
}
// tsconfig.json (根)
{
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/app" }
  ]
}
```

构建命令：`tsc --build`

---

### 常用配置模板

#### 前端应用（使用打包器，如 Vite）

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

#### Node.js 后端

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "declaration": true
  },
  "include": ["src"]
}
```

#### 库（发布 npm）

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "CommonJS",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./lib",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

同时提供 ES 模块版本（利用 `package.json` 的 `exports` 字段或双输出）。

---

### 环境配置分离

可以通过 `tsconfig.json` 的 `extends` 和不同文件区分开发/生产，或使用 `tsc --project tsconfig.prod.json`。

## 面试题

### `tsconfig.json` 中的 `target` 和 `module` 有什么区别？如何选择？

- **`target`**：指定编译后的 JavaScript 语言版本，控制语法降级（如箭头函数转普通函数、类转 ES5 函数等）。例如 `target: "ES5"` 会降级 `const` 为 `var`，`target: "ES2015"` 则保留 `const`。
- **`module`**：指定输出模块格式，控制 `import`/`export` 语句转换为哪种模块系统（`CommonJS`, `ES6`, `AMD` 等）。

**区别**：`target` 影响语言特性，`module` 影响模块组织方式。两者独立但有一定关联（例如 `target: "ES5"` 时 `module: "ES6"` 仍会输出 `import/export`，但需要打包器处理）。

**选择建议**：

- **前端项目（使用 Vite/Webpack）**：`target: "ES2020"` 或 `"ESNext"`，`module: "ESNext"`（打包器会进一步处理）。
- **Node.js 项目**：`target: "ES2022"`（或更高，取决于 Node 版本），`module: "CommonJS"`（如果使用 `"type": "module"` 则用 `ESNext`）。
- **库发布**：通常 `target: "ES2019"`，`module: "CommonJS"` 并提供 `.mjs` 双输出。

---

### `strict` 模式包含哪些检查？为什么要开启？

`"strict": true` 是以下所有选项的总开关（TS 2.3+）：

- `noImplicitAny`：禁止隐式 `any`
- `strictNullChecks`：严格区分 `null`/`undefined`
- `strictFunctionTypes`：函数参数逆变检查
- `strictBindCallApply`：`bind`/`call`/`apply` 类型严格
- `strictPropertyInitialization`：类属性必须初始化
- `noImplicitThis`：禁止隐式 `any` 的 `this`
- `alwaysStrict`：输出 `"use strict"`

**为什么要开启**：

- 捕获更多潜在错误，提高代码健壮性。
- 使代码更加自文档化，减少运行时意外。
- 符合 TypeScript 的设计理念（类型安全）。
- 大多数现代项目都推荐开启，除非需要快速迁移旧 JS 项目。

---

### `baseUrl` 和 `paths` 的作用是什么？如何配置模块别名？

- **`baseUrl`**：设置解析非相对模块的基础目录。例如 `"baseUrl": "./src"` 后，`import utils from "utils/helper"` 会从 `src/utils/helper` 查找。
- **`paths`**：路径映射，相对于 `baseUrl`，可以定义别名。常用于模拟打包器的别名（如 `@/` 指向 `src/`）。

**配置示例**：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"],
      "react": ["./node_modules/@types/react"]
    }
  }
}
```

**注意**：`paths` 只影响 TypeScript 编译时的类型解析和模块查找，**不影响运行时模块解析**。最终打包需要配置打包器（Webpack、Vite）的别名与之对应。

---

### `skipLibCheck` 的作用是什么？为什么通常建议开启？

`skipLibCheck` 跳过对所有声明文件（`.d.ts`）的类型检查，包括 `node_modules/@types` 中的类型定义。

**作用**：

- 大幅提升编译速度。
- 避免因第三方库类型定义中的小错误或不兼容而阻塞编译。
- 减少类型检查器在处理大型 `node_modules` 时的内存占用。

**为什么建议开启**：

- 第三方库的类型通常已经经过测试，不必在每次编译时重复检查。
- TypeScript 版本更新可能导致 `@types` 包中暂时出现不兼容，开启后可以绕过。
- 绝大多数实际项目中都开启此选项（如 create-react-app、Vite 模板默认开启）。

**潜在风险**：若第三方库类型存在严重错误可能会被忽略，但这种情况很少。推荐保持开启。

---

### `moduleResolution` 的 `node`、`classic`、`bundler` 有什么区别？何时使用 `bundler`？

- **`classic`**：TypeScript 1.6 之前的旧策略，仅向后兼容。不推荐使用。
- **`node`**：模仿 Node.js 的 `require` 解析算法（查找 `node_modules`、`package.json` 的 `main` 和 `types`、文件扩展名补全）。**大多数传统项目使用此策略**。
- **`bundler`**：TS 5.0+ 新增，针对现代打包器（Vite、Webpack、esbuild、rollup）的解析策略。它支持 `package.json` 的 `exports`/`imports` 条件导出，并允许无扩展名导入（如 `import "component"` 会尝试 `component.ts`、`component.tsx`、`component.d.ts` 等）。

**何时使用 `bundler`**：

- 项目使用打包器（且打包器支持 `exports` 和扩展名省略）。
- 需要利用 `package.json` 的条件导出。
- 希望 TypeScript 解析行为与实际打包器保持一致。

**注意**：`bundler` 假设所有模块将在打包器中运行，不能直接用于 Node.js（除非也配置了 `module: "NodeNext"` 等）。

---

### 如何配置 TypeScript 同时输出 CommonJS 和 ES Modules？为什么需要？

不能通过单次 `tsc` 编译同时输出两种格式，但可以通过**双配置**或**构建脚本**实现。

**方法一：使用两个 `tsconfig.json` 文件**

```json
// tsconfig.cjs.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "CommonJS",
    "outDir": "./dist/cjs"
  }
}
// tsconfig.esm.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "ESNext",
    "outDir": "./dist/esm"
  }
}
```

然后运行 `tsc -p tsconfig.cjs.json && tsc -p tsconfig.esm.json`。

**方法二：`package.json` 的 `exports` 字段**

```json
{
  "exports": {
    "require": "./dist/cjs/index.js",
    "import": "./dist/esm/index.js"
  }
}
```

**为什么需要**：让库同时支持 CommonJS（Node.js 传统环境）和 ES Modules（现代打包器、Node.js 的 `type: module` 或浏览器原生），提高兼容性。

---

### `isolatedModules` 的作用是什么？何时需要开启？

`isolatedModules` 要求每个文件都是独立的模块，且所有导入/导出必须正确标记（不允许隐式导入/导出）。它会禁止以下写法：

- 不导出任何内容的文件（但 `export {}` 可以）。
- `const enum`（因为跨文件内联需要全局知识）。
- 非模块文件（没有 `import`/`export` 的文件会被视为脚本，会产生全局污染）。

**何时开启**：

- 使用 Babel、esbuild、swc 等**单个文件转译器**时，这些工具没有全局类型信息，无法处理跨文件的 `const enum` 或非模块文件。开启 `isolatedModules` 可以让 TypeScript 预先检查出这些不兼容的写法。
- 在项目中使用 `create-react-app`、Vite 等默认开启。

**推荐**：现代前端项目建议开启，即使不使用独立转译器，它也能帮助写出更干净的模块化代码。

---

### 项目引用（Project References）解决了什么问题？如何配置？

**解决的问题**：

- 大型 monorepo 中，多个子项目相互依赖。没有项目引用时，每次编译都需要重新编译整个项目，速度慢，且无法按依赖顺序构建。
- 项目引用支持**增量构建**：只重新编译变更的子项目及依赖它的项目。
- 编辑器支持：跳转定义、自动导入可跨项目工作。

**配置步骤**：

1. 在每个子项目的 `tsconfig.json` 中设置 `"composite": true`。
2. 可选设置 `"declaration": true`（推荐）。
3. 在根 `tsconfig.json` 中使用 `references` 数组指定子项目路径。
4. 使用 `tsc --build` 命令构建（会按依赖顺序构建，并生成 `.tsbuildinfo` 文件）。

**示例**：

```json
// packages/core/tsconfig.json
{
  "compilerOptions": { "composite": true, "outDir": "./dist" }
}
// packages/app/tsconfig.json
{
  "extends": "../../tsconfig.base",
  "references": [{ "path": "../core" }]
}
// root tsconfig.json
{
  "files": [],
  "references": [
    { "path": "packages/core" },
    { "path": "packages/app" }
  ]
}
```

**注意**：`composite` 要求 `rootDir` 设置正确，且 `include` 不能包含 `outDir`。

---

### `noUncheckedIndexedAccess` 的作用是什么？为什么它能让代码更安全？

`noUncheckedIndexedAccess` 会为数组或对象的索引访问结果自动添加 `undefined` 类型，即 `T[key]` 变为 `T[key] | undefined`。这提醒开发者索引可能不存在（例如访问数组越界，或对象没有该键）。

**示例**：

```typescript
// 没有此选项
const arr = [1, 2, 3];
const item = arr[5]; // item 类型为 number，但实际为 undefined

// 开启后
const arr = [1, 2, 3];
const item = arr[5]; // item 类型为 number | undefined
// 必须检查后再使用
if (item !== undefined) {
  console.log(item.toFixed());
}
```

**为什么更安全**：避免运行时 `Cannot read property of undefined` 错误，强制开发者处理边界情况。

**适用场景**：所有需要严格空值安全的新项目。但对于已有大量索引访问的旧项目，开启可能导致大量错误，需评估。

---

### 如何为不同的环境（开发、生产）使用不同的 TypeScript 配置？

可以通过 `extends` 和覆盖实现。

**方法一：基础配置 + 环境特定配置**

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020"
  }
}
// tsconfig.dev.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "sourceMap": true,
    "noEmit": false,
    "outDir": "./dev-dist"
  }
}
// tsconfig.prod.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "outDir": "./dist"
  }
}
```

**方法二：使用环境变量**（通过 `tsconfig.json` 不支持，可用构建脚本动态生成或使用 `ts-patch` 等工具）。

**方法三：使用 `tsc --build` 与 `--config` 参数**：`tsc --project tsconfig.prod.json`

**常见实践**：开发时使用 `tsc --watch` 生成 source map；生产构建时使用独立的配置或通过打包器（Webpack/Vite）控制。
