# 前沿与最新特性

## 知识点

TypeScript 从 4.0 到 5.x 版本引入了大量新特性，提升了类型系统的表现力、开发体验和性能。以下按版本梳理核心特性。

### 一、TypeScript 4.0

#### 1. 可变元组类型（Variadic Tuple Types）

允许在元组中使用 `...` 展开，实现元组的拼接、前置、后置等操作。

```typescript
type Tuple = [number, string];
type Expanded = [...Tuple, boolean]; // [number, string, boolean]

function concat<T extends unknown[], U extends unknown[]>(
  arr1: T,
  arr2: U
): [...T, ...U] {
  return [...arr1, ...arr2];
}
```

#### 2. 标记元组元素（Labeled Tuple Elements）

为元组元素添加标签，提高可读性。

```typescript
type Point = [x: number, y: number];
function move(point: Point, dx: number, dy: number): Point {
  return [point[0] + dx, point[1] + dy];
}
```

#### 3. 构造器简写（`constructor` 中的 `this` 类型推断改进）

#### 4. `catch` 参数类型化为 `unknown`（可选）

```typescript
try {
  /* ... */
} catch (e: unknown) {}
```

### 二、TypeScript 4.1

#### 1. 模板字面量类型（Template Literal Types）

基于字符串字面量拼接生成新类型。

```typescript
type Event = `on${Capitalize<string>}`; // "onClick", "onChange" 等
type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";
type Position = `${Vertical}-${Horizontal}`; // "top-left" | "top-right" | ...
```

#### 2. 映射类型键重映射（Key Remapping in Mapped Types）

通过 `as` 子句重新生成键名。

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
// { name: string } -> { getName: () => string }
```

#### 3. 递归条件类型（Recursive Conditional Types）

允许条件类型内部引用自身，用于深层类型操作（如解包嵌套 Promise）。

```typescript
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;
```

#### 4. `--noUncheckedIndexedAccess` 选项（之前版本已有但完善）

### 三、TypeScript 4.2

#### 1. 更智能的类型别名保留（Smarter Type Alias Preservation）

#### 2. 元组元素前导/中间剩余元素（Leading/Middle Rest Elements）

```typescript
type StringNumberBooleans = [string, ...number[], boolean];
let a: StringNumberBooleans = ["hello", 1, 2, 3, false];
```

#### 3. `abstract` 构造签名

```typescript
type AbstractConstructor = abstract new (...args: any) => any;
```

### 四、TypeScript 4.3

#### 1. 单独写入类型（Separate Write Types）—— `get` / `set` 不同类型

允许属性的读取和设置使用不同类型（通过 `get` 和 `set` 访问器）。

```typescript
class Thing {
  #size = 0;
  get size(): number {
    return this.#size;
  }
  set size(value: string | number | boolean) {
    this.#size = Number(value);
  }
}
```

#### 2. 泛型上下文中的 `static` 索引签名

#### 3. `override` 关键字

显式标记方法重写父类方法，防止误写。

```typescript
class Base {
  greet() {}
}
class Derived extends Base {
  override greet() {} // 若父类无 greet 则报错
}
```

### 五、TypeScript 4.4

#### 1. 别名条件类型控制流分析（Control Flow Analysis of Aliased Conditions）

#### 2. 符号和模板字符串模式索引签名（Symbol and Template String Pattern Index Signatures）

```typescript
interface Dict {
  [key: `${string}:${string}`]: string;
}
let d: Dict = { "a:b": "ok" };
```

#### 3. 捕获 `try` 中的 `unknown` 变量类型细化

### 六、TypeScript 4.5

#### 1. `Awaited` 类型和 `Promise` 改进

内置 `Awaited<T>` 类型，递归解包 `Promise`，用于 `async` 函数返回值推断。

```typescript
type Result = Awaited<Promise<Promise<number>>>; // number
```

#### 2. `--module es2022` 支持顶级 `await`

#### 3. 导入断言（Import Assertions）

```typescript
import obj from "./data.json" assert { type: "json" };
```

### 七、TypeScript 4.6

#### 1. 索引访问推断改进（Improved Indexed Access Inference）

#### 2. 递归条件类型深度限制增加

#### 3. 控制流分析中的 `--target es2022` 支持

### 八、TypeScript 4.7

#### 1. 可选 `???` 和 `??=` 的 `--target es2020` 支持

#### 2. Node.js ES 模块支持（`--module nodenext` 或 `node16`）

为 Node.js 原生的 ESM 提供正确解析逻辑，支持 `exports` 条件导出。

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

#### 3. `extends` 约束推断（Infer `extends` Constraints）

### 九、TypeScript 4.8

#### 1. 交叉类型与联合类型简化（Intersection Reduction）

#### 2. `--strictNullChecks` 下增强的 `--noUncheckedIndexedAccess`

### 十、TypeScript 4.9

#### 1. `satisfies` 操作符

允许表达式满足某个类型，同时保留其最精确的类型（不丢失字面量信息）。

```typescript
type Colors = "red" | "green" | "blue";
const config = {
  color: "red",
  size: 10,
} satisfies { color: Colors; size: number };
// config.color 类型为 "red" 而非 Colors
```

#### 2. `in` 操作符类型细化增强

#### 3. `--removeUnusedImports` 和 `--preserveValueImports` 等

### 十一、TypeScript 5.0

#### 1. 装饰器（标准 Stage 3 版本）

完全重写装饰器实现，遵循 TC39 最新提案，不再实验性（但旧版实验性装饰器仍可用）。

```typescript
function logged(value: Function, context: ClassMethodDecoratorContext) {
  const method = value;
  return function (this: any, ...args: any[]) {
    console.log(`Calling ${String(context.name)}`);
    return method.call(this, ...args);
  };
}
class Example {
  @logged
  greet() {
    console.log("hello");
  }
}
```

#### 2. `const` 类型参数（`const` Type Parameters）

在泛型调用时添加 `const` 修饰符，使类型推断为最具体的字面量类型（类似 `as const`）。

```typescript
function identity<const T>(x: T): T {
  return x;
}
const res = identity({ name: "Alice" }); // 类型为 { readonly name: "Alice" }
```

#### 3. 枚举（Enum）改进：支持联合类型和字面量类型的更精确检查

#### 4. 模块解析策略 `bundler`

针对打包器优化的新解析策略（前面已提）。

#### 5. 性能优化：`--moduleResolution bundler`、更快的 `--build` 模式

### 十二、TypeScript 5.1

#### 1. 更轻松的隐式返回 `undefined` 函数（允许 `undefined` 返回值）

#### 2. 解构类型中的可选属性与剩余元素互通

#### 3. `--noImplicitOverride` 选项

要求子类重写方法时必须使用 `override` 关键字。

```json
{
  "compilerOptions": {
    "noImplicitOverride": true
  }
}
```

### 十三、TypeScript 5.2

#### 1. `using` 声明（显式资源管理）

基于 `Symbol.dispose` 和 `Symbol.asyncDispose`，自动释放资源（如文件句柄、数据库连接）。

```typescript
{
    using file = await openFile("data.txt");
    // ... 使用 file
} // 自动调用 file[Symbol.dispose]()
```

#### 2. 装饰器元数据（Decorator Metadata）

允许装饰器添加元数据，通过 `Symbol.metadata` 访问。

#### 3. 命名空间枚举（Namespace Enum）改进

### 十四、TypeScript 5.3

#### 1. 导入属性（Import Attributes，替代导入断言）

```typescript
import json from "./data.json" with { type: "json" };
```

#### 2. `--moduleResolution bundler` 支持更多场景

#### 3. `instanceof` 类型细化改进

### 十五、TypeScript 5.4

#### 1. `NoInfer` 工具类型

阻止泛型推断时从特定位置推断类型。

```typescript
declare function createLogger<T>(name: T, options?: NoInfer<Options>): Logger;
```

#### 2. `--isolatedDeclarations` 选项

允许隔离的声明生成（适用于独立编译工具）。

### 十六、TypeScript 5.5（最新，写作时）

#### 1. `--isolatedDeclarations` 稳定

#### 2. 正则表达式语法检查

#### 3. 推断类型谓词（Inferred Type Predicates）

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}
// TypeScript 现在可以自动推断这类返回类型为类型谓词
```

#### 4. `--module nodenext` 支持 `--outFile`

## 涉及到的面试题与最佳回答

### `satisfies` 操作符是什么？与类型注解 `:` 有什么区别？

`satisfies` 是 TypeScript 4.9 引入的操作符，用于**检查表达式的类型是否符合某个类型，同时保留表达式的最精确类型**（不将其收窄为指定的类型）。

**区别**：

- 使用 `: Type` 注解时，变量被**强制声明**为该类型，会丢失原始字面量信息。
- 使用 `satisfies Type` 时，类型检查通过后，变量的类型仍然是**原始推导类型**（更精确）。

**示例**：

```typescript
type Colors = "red" | "green" | "blue";
// 使用类型注解
const config1: { color: Colors } = { color: "red" };
config1.color; // 类型为 Colors（"red" 被收窄为 "red" | "green" | "blue"）

// 使用 satisfies
const config2 = { color: "red" } satisfies { color: Colors };
config2.color; // 类型为 "red"（保留字面量）
```

**适用场景**：需要确保对象符合某个宽类型，但又希望保留精确类型以供后续推断（如对象字面量传递给函数时保留字面量类型）。

---

### TypeScript 5.0 引入的 `const` 类型参数是什么？如何使用？

`const` 类型参数允许在调用泛型函数时，添加 `const` 修饰符，使类型推断推断出最具体的字面量类型（类似于对参数应用 `as const`）。

**示例**：

```typescript
// 普通泛型
function identity<T>(x: T): T {
  return x;
}
const res1 = identity({ name: "Alice" }); // 类型为 { name: string }

// const 类型参数
function constIdentity<const T>(x: T): T {
  return x;
}
const res2 = constIdentity({ name: "Alice" }); // 类型为 { readonly name: "Alice" }
```

**效果**：

- 对象属性变为 `readonly`。
- 字面量类型不会被扩大（如字符串保持为字面量而非 `string`）。

**适用场景**：构建类型安全的工厂函数、需要精确追踪字面量类型的场景（如事件派发器、UI 组件属性映射）。

---

### 标准装饰器（Stage 3）与 TypeScript 实验性装饰器有什么核心区别？迁移需要注意什么？

**核心区别**：

| 特性     | 实验性装饰器（TS 4.x）            | 标准装饰器（TS 5.0+）                                  |
| -------- | --------------------------------- | ------------------------------------------------------ |
| 参数     | 目标、名称、描述符（属性描述符）  | 值、上下文（context）对象                              |
| 返回值   | 可替换描述符或类                  | 返回新值或 `undefined`                                 |
| 支持成员 | 类、方法、访问器、属性、参数      | 类、方法、访问器、字段、自动访问器（不支持参数装饰器） |
| 元数据   | 需 `emitDecoratorMetadata`        | 支持 `Symbol.metadata`                                 |
| 执行时机 | 类定义时                          | 类定义时，但更严格的顺序                               |
| 可访问性 | 可访问私有成员（需要 `#` 字段？） | 不能直接访问私有字段                                   |

**迁移注意事项**：

- 参数装饰器不再支持，需改用其他方式（如工厂函数包裹）。
- 旧装饰器的 `descriptor` 操作需改为使用 `context` 中的 `addInitializer`、`kind` 等属性。
- 依赖装饰器元数据的库（如 Angular、TypeORM）需要升级到支持标准装饰器的版本。
- 目前 Angular 仍默认使用实验性装饰器，但已逐步迁移。

---

### `using` 声明是什么？与 `using` 关键字的其他语言类似物有何关系？

`using` 是 TypeScript 5.2 引入的显式资源管理特性，基于 JavaScript 的 `Symbol.dispose` 提案。它允许在块作用域结束时自动调用对象的 `dispose` 方法（同步）或 `asyncDispose`（异步），用于释放文件句柄、数据库连接、定时器等资源。

**示例**：

```typescript
{
    using file = await openFile("data.txt");
    // 使用 file
} // 自动调用 file[Symbol.dispose]()
```

**与 `try-finally` 对比**：

- 减少样板代码，自动处理释放顺序（以反序释放）。
- 支持异步资源（`await using`）。

**与其他语言**：类似 C# 的 `using`、Python 的 `with`、Java 的 `try-with-resources`。TypeScript/JavaScript 通过符号实现，具有动态特性。

---

### `NoInfer` 工具类型的作用是什么？如何使用？

`NoInfer<T>` 是 TypeScript 5.4 引入的工具类型，用于阻止 TypeScript 从该位置的参数推断泛型类型。通常用于函数有多个参数，而你希望只从一个参数推断泛型，另一个参数只做类型检查。

**示例**：

```typescript
declare function createLogger<T>(name: T, options?: NoInfer<Options>): Logger;

// 调用时
createLogger("app", { level: "info" });
// T 只从第一个参数 "app" 推断为 "app"，而不是从 options 中的某个属性推断。
```

**适用场景**：当第二个参数的复杂类型会影响泛型推断，导致不符合预期时，用 `NoInfer` 强制忽略。

---

### TypeScript 5.0 中的 `--moduleResolution bundler` 解决了什么问题？与 `node` 策略有何不同？

`bundler` 策略是为现代打包器（Vite、Webpack、esbuild、rollup）设计的模块解析规则，它与 `node` 策略的主要区别：

1. **支持 `exports` 条件导出**：能正确读取 `package.json` 中的 `exports` 字段，按条件（如 `import`、`require`、`types`）解析。
2. **无扩展名解析更宽松**：允许省略 `.ts`、`.tsx`、`.d.ts` 等扩展名，匹配打包器的行为。
3. **忽略 `main` 字段**：优先使用 `exports`，与打包器一致。
4. **允许导入 `*.vue`、`*.css` 等非标准扩展名**（配合类型声明）。

**解决的问题**：

- 旧版 `node` 策略无法处理 `exports`，导致使用打包器的项目类型解析与运行时行为不一致。
- 解决了 monorepo 中使用路径映射和条件导出的类型查找问题。

**建议**：现代前端项目使用打包器时，设置 `"moduleResolution": "bundler"`（TS 5.0+）。

---

### `import assertions`（断言）与 `import attributes`（属性）有什么区别？为何废弃断言？

- **导入断言（Import Assertions）**：TS 4.5 引入，语法为 `import json from "./data.json" assert { type: "json" };`。目的是验证导入模块的类型。
- **导入属性（Import Attributes）**：TS 5.3 引入，语法为 `import json from "./data.json" with { type: "json" };`。语义上强调“属性”而非“断言”，更符合标准提案。

**区别**：

- 断言是“声明”，告诉引擎模块应该具有某种类型；属性是“附加信息”，不影响模块解析的核心逻辑。
- 标准提案已从 `assert` 改为 `with`，以避免混淆（断言暗示检查失败应报错，但属性可能被忽略）。

**当前状态**：推荐使用 `with` 语法；`assert` 仍然支持但标记为废弃。

---

### `Awaited<T>` 类型是什么？它和直接 `T extends Promise<infer U> ? U : T` 有什么区别？

`Awaited<T>` 是 TypeScript 4.5 内置的工具类型，用于递归解包 `Promise` 类型，类似 `await` 对值的操作。

**实现**（简化）：

```typescript
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaited<V>
    : never
  : T;
```

**与简单条件类型的区别**：

- 简单 `T extends Promise<infer U> ? U : T` 只能解包一层。
- `Awaited<T>` 递归解包，直到不是 `Promise` 为止：`Awaited<Promise<Promise<number>>>` 结果是 `number`。

**使用场景**：`async` 函数返回值类型推断、`Promise.all`/`Promise.race` 的类型推导等。

---

### `isolatedDeclarations` 选项的作用是什么？何时需要？

`isolatedDeclarations` 是 TypeScript 5.4 引入的编译选项（5.5 稳定），用于确保声明文件（`.d.ts`）可以在“隔离”模式下正确生成，而不需要全局类型信息。它会对代码施加限制，例如：

- 导出函数的参数和返回值必须有明确类型注解（不能依赖推断）。
- 导出变量必须有明确类型。

**作用**：使独立的转译工具（如 `tsc --emitDeclarationOnly`、`@babel/preset-typescript`、`esbuild`）能够安全地生成声明文件，无需解析整个项目的类型上下文。

**何时需要**：

- 使用 `esbuild`、`swc`、`Babel` 等工具进行转译，但需要生成 `.d.ts`。
- Monorepo 中需要隔离构建声明文件。

---

### TypeScript 5.5 中推断类型谓词（Inferred Type Predicates）改进了什么？

之前，编写一个返回 `value is Type` 的类型守卫函数需要手动注解返回类型。TS 5.5 改进了控制流分析，可以自动推断出某些函数返回的是类型谓词。

**示例**：

```typescript
// 现在可以自动推断返回类型为 value is string
function isString(value: unknown) {
  return typeof value === "string";
}
// 之前需要显式写 : value is string
```

**条件**：函数体必须是简单的 `return` 语句，且表达式为类型检查模式（如 `typeof`、`instanceof`、`in` 等）。这减少了手写类型谓词的样板，同时保持类型安全。
