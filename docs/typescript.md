
## 

这在 JavaScript 文件的 JSDoc 注释中尤其有用，因为否则无法导入类型：

```js
/** @type {import("webpack").Configuration} */
module.exports = {
  // ...
}
```

## 

环境模块声明与模块扩展


# 前端 TypeScript 知识点清单

## 一、基础类型系统

- **原始类型**：`string`、`number`、`boolean`、`symbol`、`bigint`
- **null 与 undefined**：默认是其他类型的子类型，严格模式下需明确标记
- **void**：无返回值函数的返回类型
- **never**：永不返回（抛出错误或无限循环）的类型
- **any**：任意类型，放弃类型检查
- **unknown**：安全的任意类型，需类型守卫后才能使用
- **类型字面量**：`'hello'`、`123`、`true` 作为具体值类型
- **数组类型**：`number[]`、`Array<string>`
- **元组**：`[string, number]`，固定长度和类型顺序
- **枚举**：数字枚举、字符串枚举、异构枚举、常量枚举 `const enum`
- **object**：非原始类型，区别于 `Object` 和 `{}`

## 二、类型注解与推断

- **类型注解**：`: type` 显式声明变量/参数/返回类型
- **类型推断**：根据初始值自动推导类型
- **上下文类型**：根据所在位置反向推断（如回调参数）
- **最佳通用类型**：从多个候选中推断最通用的类型

## 三、接口与类型别名

- **接口 `interface`**
  - 可选属性 `?:`
  - 只读属性 `readonly`
  - 索引签名 `[key: string]: any`
  - 函数类型调用签名 `(param: T): R`
  - 构造签名 `new (param: T): Obj`
  - 多余属性检查与绕过方法
  - 接口扩展 `extends`
  - 类实现接口 `implements`
- **类型别名 `type`**
  - 联合类型 `A | B`
  - 交叉类型 `A & B`
  - 映射类型、条件类型等高级类型
  - 与接口的区别：`type` 可表示任何类型（元组、联合、原始类型），不可重复定义；`interface` 可自动合并

## 四、函数

- **参数类型**：普通参数、可选参数 `?`、默认参数、剩余参数 `...rest: T[]`
- **返回值类型**：显式或推断
- **函数重载**：多个调用签名与实现签名
- **this 类型**：显式声明 `this: Type` 作为第一个参数
- **函数类型表达式**：`(a: number, b: number) => number`
- **泛型函数**：`<T>(arg: T): T`
- **函数上下文类型推断**：回调参数自动类型

## 五、泛型

- **泛型变量**：`<T>`, `<K extends keyof T>`
- **泛型函数**、**泛型接口**、**泛型类**
- **泛型约束**：`<T extends SomeType>`
- **默认泛型参数**：`<T = string>`
- **多个泛型参数**：`<T, U>`
- **泛型与条件类型结合**：`T extends U ? X : Y`

## 六、高级类型

- **联合类型**：`string | number`
- **交叉类型**：`A & B`
- **类型守卫**：
  - `typeof` 类型守卫
  - `instanceof` 守卫
  - `in` 操作符守卫
  - 自定义类型守卫 `x is T`
  - `asserts x is T` 断言函数
- **可辨识联合**：通过 `kind` 等公共字段区分联合成员
- **类型断言**：`as Type`、`<Type>`（旧语法，JSX 中不可用）
- **非空断言**：`!` 后缀，表示值非 null/undefined
- **索引类型**：
  - `keyof T`：获取 T 的键联合类型
  - `T[K]`：索引访问类型
  - 索引签名：`[key: string]: ValueType`
- **映射类型**：
  - `{ [P in K]: T[P] }`
  - 内置映射类型：`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `NonNullable`, `ReturnType`, `Parameters` 等
- **条件类型**：
  - `T extends U ? X : Y`
  - 分布式条件类型（联合类型自动分发）
  - `infer` 关键字：在条件类型中提取类型变量
- **模板字面量类型**：`${'a'|'b'}-${number}`
- **类型查询**：`typeof variable` 获取变量类型
- **类型兼容性**：结构化类型系统（鸭子类型）、协变与逆变、函数参数双向协变（严格模式下是逆变的）

## 七、类（Class）

- **类成员**：属性、方法、构造函数
- **访问修饰符**：`public`、`private`、`protected`、`readonly`
- **参数属性**：构造函数参数直接声明成员 `constructor(public name: string) {}`
- **抽象类**：`abstract class` 与抽象方法
- **类类型**：类本身也是一种类型
- **类表达式**
- **实现接口**：`class C implements I`
- **继承**：`extends`，重写方法时使用 `super`
- **this 类型**：多态 `this` 指向当前类实例
- **静态成员**：`static`，可拥有类型和访问修饰符

## 八、模块与命名空间

- **ES 模块**：`import` / `export` 类型与值
- **类型导入/导出**：`import type { SomeType }`、`export type`
- **默认导入**：与值的默认导入语法相同，类型单独导出
- **命名空间**：`namespace`（不推荐，建议用模块）
- **三斜线指令**：`/// <reference path="..." />`（旧式）
- **模块解析策略**：Node / Classic、`baseUrl`、`paths`、`rootDirs`

## 九、装饰器（实验性，但 Angular 等常用）

- **类装饰器**：修改类定义
- **方法装饰器**：修改方法
- **访问器装饰器**：`get`/`set`
- **属性装饰器**
- **参数装饰器**
- **装饰器工厂**：返回装饰器函数的函数
- **装饰器执行顺序**
- **元数据反射**：`reflect-metadata`

## 十、类型声明与声明文件

- **`.d.ts` 声明文件**：为无类型的 JS 库提供类型
- **`declare` 关键字**：声明全局变量、函数、模块、类
- **`export as namespace`**：导出全局命名空间
- **模块增强**：为已有模块添加额外成员
- **全局增强**：为全局作用域添加成员
- **`@types/` 与 DefinitelyTyped**
- **编写声明文件的最佳实践**
- **`/// <reference types="..." />`**：引用内置类型定义

## 十一、类型操作工具

- **内置映射类型**：`Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T,K>`, `Omit<T,K>`, `Record<K,T>`
- **条件类型工具**：`Exclude<T,U>`, `Extract<T,U>`, `NonNullable<T>`, `ReturnType<T>`, `Parameters<T>`, `ConstructorParameters<T>`, `InstanceType<T>`
- **字符串操作类型**：`Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`
- **`Awaited<T>`**：解包 Promise 类型
- **`ThisType<T>`**：为对象方法指定 `this` 类型（用于 `noImplicitThis`）

## 十二、TypeScript 与前端框架

### React
- **函数组件类型**：`React.FC<P>` 或直接 `(props: P) => JSX.Element`
- **Props 类型定义**：接口或类型别名
- **默认 props**：利用默认参数或 `defaultProps`
- **Hooks 类型**：
  - `useState<T>`：自动推断或显式泛型
  - `useRef<T>`：可变与不可变 ref 的区别（`{ current: T }` vs `{ current: T | null }`）
  - `useReducer<State, Action>`
  - `useContext<MyContext>`
  - 自定义 Hook 的类型签名
- **事件类型**：`React.ChangeEvent<HTMLInputElement>`、`React.MouseEvent<HTMLButtonElement>`、`React.FormEvent<HTMLFormElement>` 等
- **样式对象类型**：`React.CSSProperties`
- **高阶组件类型**：`ComponentType<P>`、`PropsWithChildren<P>`
- **泛型组件**：`<T>(props: Props<T>) => JSX.Element`
- **React.memo 与 forwardRef 的类型**：使用泛型 `React.forwardRef<T, P>`

### Vue
- **Vue 2 + class-component**：`@Component` 装饰器，`Vue` 类型扩展
- **Vue 3 + Composition API**：
  - `defineComponent` 自动类型推断
  - `ref<T>`、`reactive<T>`
  - `computed<T>`
  - `props` 类型声明（基于接口或运行时）
  - `emits` 类型声明
  - `provide` / `inject` 类型标记
- **Vue 单文件组件 (SFC)**：`<script setup lang="ts">` 中自动类型推导
- **全局类型定义**：为 `vue` 模块增强或 `*.vue` 文件类型声明

### Angular
- **组件、指令、服务、管道**：装饰器参数中的类型声明
- **依赖注入**：`@Injectable()` 配合类型标记
- **HttpClient**：泛型请求方法 `get<T>(url)`
- **RxJS**：`Observable<T>`、`Subject<T>` 等
- **模板类型检查**：Angular 编译模板时对绑定表达式的类型检查

## 十三、配置文件与编译选项

- **`tsconfig.json`** 核心字段：
  - `compilerOptions`：
    - `target`：输出 JS 版本
    - `module`：模块系统（CommonJS, ESNext 等）
    - `lib`：包含的内置类型（DOM, ES2015 等）
    - `jsx`：JSX 支持模式（react, react-jsx, preserve 等）
    - `strict` 家族：`strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict`
    - `moduleResolution`：模块解析策略
    - `esModuleInterop`：兼容 CommonJS 与 ES 模块
    - `allowSyntheticDefaultImports`
    - `skipLibCheck`
    - `forceConsistentCasingInFileNames`
    - `outDir`, `rootDir`
    - `sourceMap`, `declaration`, `declarationMap`
    - `paths`, `baseUrl`
    - `types` 与 `typeRoots`
  - `include`, `exclude`, `files`
  - `extends`：继承其他配置
  - `references`：项目引用（monorepo 场景）

## 十四、类型扩展与增强

- **模块扩展**：使用 `declare module 'some-module'` 添加成员
- **全局扩展**：在全局作用域 `declare global` 内添加成员
- **接口合并**：重复声明同一接口自动合并成员
- **命名空间合并**：函数/类与命名空间合并
- **`globalThis`**：跨环境全局对象类型

## 十五、错误处理与调试

- **常见类型错误**：类型不兼容、无法推断、多余属性等
- **类型断言错误**：不正确的断言导致运行时问题
- **`@ts-ignore`**、**`@ts-expect-error`** 注释
- **`// @ts-nocheck`** 跳过文件检查
- **`unknown` vs `any`** 避免使用 `any`
- **利用 `never` 进行穷举检查**
- **IDE 集成**：VSCode 类型提示、错误波浪线、快速修复
- **类型追踪**：`tsc --traceResolution` 等选项

## 十六、工具链与生态

- **ts-node**：直接执行 TypeScript
- **ts-loader**（Webpack）与 **@babel/preset-typescript**
- **esbuild** 与 **swc** 的 TypeScript 支持
- **Vite** 内置 TypeScript 支持
- **Jest + ts-jest** 或 **@jest/transform** 配合 Babel
- **ESLint + @typescript-eslint** 配置
- **Prettier** 格式化 TypeScript
- **TypeDoc**：从注释生成 API 文档
- **tsc --watch** 增量编译
- **项目引用**（`composite`）提升构建效率

## 十七、与 JavaScript 互操作

- **JSDoc 类型注解**：`@type`、`@param`、`@returns` 等，让 JS 文件获得类型检查
- **`allowJs`** 与 **`checkJs`** 选项
- **从 JS 迁移到 TS** 的策略
- **混合项目**：部分文件 `.ts`、部分 `.js`
- **声明文件自动生成** (`declaration: true`)

## 十八、性能与最佳实践

- **避免 `any`**：使用 `unknown` 代替
- **优先使用 `interface` 声明对象形状**，必要时用 `type`
- **利用 `const` 断言**：`as const` 生成字面量类型
- **使用 `Record<Keys, Type>` 代替索引签名（当键值已知时）**
- **使用 `readonly` 预防意外修改**
- **利用内置工具类型减少重复代码**
- **为错误处理定义自定义错误类型**
- **使用 `never` 实现编译时穷举检查**
- **泛型命名**：单字母或语义化（`TData`、`TError`）
- **开启 `strict` 模式获得最大类型安全**
- **避免过度使用装饰器**（性能与复杂度）
- **合理拆分声明文件**（`*.d.ts` 与实现分离）
- **利用 `satisfies` 操作符**（TS 4.9+）保留精确类型的同时进行类型检查
- **使用 `in` 操作符进行类型细化**替代类型断言

## 十九、前沿与最新特性（TS 4.x ~ 5.x）

- **`satisfies` 操作符**：表达式 `expr satisfies Type`
- **`using` 声明**：显式资源管理（`Symbol.dispose`）
- **`import type` 和 `export type`**
- **递归条件类型**：深度递归操作类型
- **`--moduleResolution bundler`**：现代打包器解析策略
- **`isolatedDeclarations`**：为独立编译生成声明文件
- **`const` 类型参数**：`<const T>` 让泛型自动捕获字面量类型
- **`--noPropertyAccessFromIndexSignature`**：禁止通过点号访问索引签名属性
- **`exactOptionalPropertyTypes`**：更精确的可选属性检查

以上知识点覆盖了前端开发中 TypeScript 的主要使用场景，从基础类型到框架集成、配置最佳实践。根据实际项目需求，可以进一步深入每个主题。