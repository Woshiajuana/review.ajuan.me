# 基础

- 练习题参考： https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

## 知识点

### 日常类型

```typescript
let str: string = "hello";
let num: number = 42; // 整数、浮点数、NaN、Infinity
let bool: boolean = true;
let sym: symbol = Symbol("id");
let big: bigint = 100n; // ES2020 大整数
```

- `string`、`number`、`boolean` 支持字面量类型（见下文）。
- `symbol` 具有唯一性，常用于对象属性键。
- `bigint` 与 `number` 不兼容，不可混用。

---

### `null` 与 `undefined`

```typescript
let u: undefined = undefined;
let n: null = null;
```

- 默认情况下（`strictNullChecks: false`），`null` 和 `undefined` 是其他所有类型的子类型，可以赋给 `string`、`number` 等。
- 推荐开启 `strictNullChecks`，此时 `null` 和 `undefined` 只能赋给它们自身或 `any`/`unknown`。必须显式声明联合类型：`let name: string | null = null;`

---

### `void`

```typescript
function logMessage(msg: string): void {
  console.log(msg);
  // 无返回值（或 return;）
}
```

- `void` 表示函数没有返回值。变量声明为 `void` 类型没有意义（只能赋 `undefined` 或 `null`（如果 strictNullChecks 关闭））。

---

### `never`

```typescript
function throwError(msg: string): never {
  throw new Error(msg);
}

function infiniteLoop(): never {
  while (true) {}
}
```

- `never` 表示**永远不会产生值**的函数（抛出异常或无限循环）。
- `never` 是所有类型的子类型，但没有类型是 `never` 的子类型（除了 `never` 自身）。
- 常被用于**穷尽性检查**：

```typescript
type Color = "red" | "green" | "blue";
function getHex(c: Color): string {
  switch (c) {
    case "red":
      return "#FF0000";
    case "green":
      return "#00FF00";
    case "blue":
      return "#0000FF";
    default:
      const _exhaustive: never = c; // 若 Color 新增成员未处理，这里会报错
      return _exhaustive;
  }
}
```

---

### `any`

```typescript
let loose: any = 42;
loose = "string"; // 可以
loose.toFixed(); // 运行时可能崩溃，但 TS 不检查
```

- 放弃所有类型检查，使变量**恢复为纯 JavaScript 行为**。
- 尽量避免使用，它会破坏 TypeScript 的保护。

---

### `unknown`

```typescript
let safe: unknown = "hello";
// safe.toUpperCase();   // 错误：unknown 不能直接调用方法
if (typeof safe === "string") {
  safe.toUpperCase(); // 类型守卫后安全使用
}
```

- 安全的 `any`：任何值都可以赋给 `unknown`，但 `unknown` 不能直接赋给其他类型（除了 `any` 或 `unknown`），也不能直接调用属性/方法。
- 必须通过类型守卫或断言才能使用。

---

### 类型字面量（Literal Types）

```typescript
let direction: "left" | "right" = "left";
let numLiteral: 1 | 2 | 3 = 2;
let boolLiteral: true = true; // 只能是 true
```

- 具体值作为类型，常与联合类型组合使用。
- 与 `const` 断言结合可推导出更精确的类型：

```typescript
const obj = { name: "Alice" } as const;
// obj 的类型为 { readonly name: "Alice" }
```

---

### 数组类型

```typescript
let list1: number[] = [1, 2, 3];
let list2: Array<string> = ["a", "b"];
let readonlyArr: readonly number[] = [1, 2, 3]; // 不可修改
```

- 两种写法等价，推荐 `T[]`。
- `readonly` 修饰符可以防止数组内容被修改。

---

### 元组（Tuple）

```typescript
let tuple: [string, number] = ["Alice", 25];
tuple[0] = "Bob"; // 正确
// tuple[2] = 100;     // 错误，索引 2 不存在
```

- 固定长度、各位置类型已知。
- 可选元组：`[string, number?]`
- 剩余元组：`[string, ...number[]]`，表示第一个元素是 string，后面任意数量 number。
- 元组常用于函数的多返回值（`[string, number]` 模拟命名返回值）。

---

### 枚举（Enum）

**数字枚举**（默认从 0 开始）：

```typescript
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}
```

**字符串枚举**：

```typescript
enum Color {
  Red = "RED",
  Green = "GREEN",
}
```

**常量枚举**（编译时会被内联，不生成对象）：

```typescript
const enum Status {
  Success = 200,
  NotFound = 404,
}
console.log(Status.Success); // 编译为 200，不生成额外代码
```

**注意**：

- 数字枚举支持反向映射（`Direction[0] === "Up"`），字符串枚举不支持。
- 常量枚举只能使用常量表达式。
- 现代 TypeScript 推荐使用**字面量联合类型**代替枚举，除非需要迭代枚举值或反向映射。

---

### `object` 类型

```typescript
let obj: object = { name: "Alice" };
obj = [1, 2, 3]; // 数组也是对象
// obj.name = "Bob";   // 错误：object 类型无法直接访问属性
```

- `object` 表示非原始类型（不是 `string`、`number`、`boolean`、`symbol`、`bigint`、`null`、`undefined`）。
- 与 `Object` 或 `{}` 不同：`Object` 包含所有类型（包括原始类型），`{}` 表示空对象类型，两者都几乎无用且应避免使用。除非需要表示“任何非 null/undefined 的值”，可以用 `object` 或 `Record<string, unknown>`。

## 面试题

### TypeScript 解决了什么问题？

- TypeScript 是 Javascript 的超集
- 提供编译时静态类型检查和强大的开发体验
- 可以在编写代码时，提供错误信息和代码补全功能
- 编译后产出纯净、高效的 JavaScript
- 核心价值是提升大型项目的可维护性和开发效率

---

### TypeScript 的原始类型有哪些？

TypeScript 的**原始类型**（Primitive Types）直接对应 JavaScript 的七种原始数据类型：

- **`boolean`** - 布尔值，`true` 或 `false`
- **`number`** - 双精度浮点数，包括整数、小数、`NaN`、`Infinity` 等
- **`string`** - 字符串，支持单引号、双引号、模板字符串
- **`bigint`** - 大整数（ES2020），如 `100n`
- **`symbol`** - 唯一且不可变的值（ES2015），如 `Symbol('key')`
- **`undefined`** - 未定义，只有一个值 `undefined`
- **`null`** - 空值，只有一个值 `null`

---

### `never` 类型有什么用？请举例。

`never` 表示永远不会出现的值的类型。常见用途：

1. **函数永远不会正常返回**（抛出异常或无限循环）的返回类型。
2. **穷尽性检查**：在 switch 或 if-else 链的 default 分支中，将变量断言为 `never`，这样当联合类型新增成员而分支未处理时，会触发编译错误。

---

### 元组（Tuple）与数组（Array）有什么区别？

- **长度**：元组长度固定，数组长度可变。
- **元素类型**：元组中每个位置元素的类型可以不同，数组通常要求所有元素类型相同（除非是联合类型数组）。
- **访问**：元组超出越界访问会报错；数组可以动态添加/删除元素。
- **使用场景**：
  - 数组适合同类型列表（如一组数字）。
  - 元组适合表示固定格式的数据，如函数多返回值、CSV 行、坐标 `[x, y]`。

---

### 枚举（enum）有什么缺点？什么时候应该避免使用？

1. **编译后会产生额外的 JavaScript 代码**（除了 `const enum`），增加打包体积。
2. **数字枚举存在反向映射**可能导致意外使用（`Enum[0]` 得到键名），语义不够清晰。
3. **与类型系统结合不够自然**：枚举值不能在运行时动态定义，且与数字字面量类型兼容性容易引起混淆。
4. **`const enum` 虽然无运行时开销，但依赖编译常量折叠**，在某些构建工具（如非 TS 编译器处理的场景）下可能出问题。

**替代方案**：

- 推荐使用 **联合类型 + 字面量类型**：
  ```typescript
  type Direction = "Up" | "Down" | "Left" | "Right";
  ```
- 如果需要迭代枚举值或存储多个值，可以使用对象 `as const`：
  ```typescript
  const Colors = { Red: "RED", Green: "GREEN" } as const;
  type Color = (typeof Colors)[keyof typeof Colors]; // "RED" | "GREEN"
  ```

**何时可以使用枚举**：

- 团队规范一致且需要反向映射。
- 值需要动态计算（如计算后的常量）。
- 使用 `const enum` 并确保构建工具支持。

---

### `void` 和 `undefined` / `never` 的区别？

- `void` 表示函数没有显式返回值（或返回 `undefined`）。变量声明为 `void` 只能赋 `undefined`（`strictNullChecks` 开启时），基本无实用价值。
- `undefined` 是一个具体的值，表示“未定义”。变量可以是 `undefined` 类型。
- `never` 表示函数**永远无法正常结束**（抛错或无限循环），不返回任何值（包括 `undefined`）。它没有任何可分配的值（除了自身）。
- 区别示例：
  ```typescript
  function a(): void {} // 实际返回 undefined，符合 void
  function b(): undefined {
    return undefined;
  } // 必须显式返回 undefined
  function c(): never {
    throw new Error();
  } // 永不返回
  ```

---

### 如何理解 TypeScript 中的“类型字面量”？

类型字面量指的是将**具体的值**（字符串、数字、布尔值）作为一种类型。它限制了变量只能取该特定值。通常与联合类型组合使用，模拟枚举或精确字符串约束。

**示例**：

```typescript
let status: "success" | "error" = "success";
status = "error"; // OK
// status = "pending"; // 错误

// 配合 typeof 获取变量的字面量类型
const myConst = "hello"; // 字面量类型 "hello"
type MyType = typeof myConst; // "hello"
```

**与 `const` 断言结合**：

```typescript
const config = { size: 10, color: "red" } as const;
// config 的类型为 { readonly size: 10; readonly color: "red" }
```

**用途**：提供比 `string` 更精确的类型约束，用于函数参数限制、组件 Props 选项等。

---

### `object`、`{}`、`Object` 的区别？

这三者都用于表示“对象类型”，但语义差异很大：

1. **`object`** 表示**非原始类型**，即排除了 `string`、`number`、`boolean`、`symbol`、`bigint`、`null`、`undefined` 的所有值。它是我们表达“这是一个真正的对象/数组/函数”时的推荐类型。泛型约束中常用 `T extends object`。

2. **`{}`**（空对象类型）表示没有自身属性的对象，但由于 TypeScript 的结构化类型系统，实际上除了 `null` 和 `undefined` 之外的任何值（包括原始类型）都可以赋给 `{}`，因为它没有任何要求。这很容易导致类型检查失效，**应避免使用**。

3. **`Object`**（大写）是全局 `Object` 构造函数的类型，它包含了 `toString`、`valueOf` 等方法。它也允许原始类型（通过自动装箱），同样过宽泛，并且容易与 `object` 混淆，**也不推荐使用**。

**推荐做法**：

- 需要表示“任何非原始类型的值” → 使用 `object`。
- 需要表示“任何值” → 使用 `unknown`。
- 需要表示“具体的对象结构” → 使用接口 (`interface`) 或类型别名 (`type`)。
- 需要表示“空对象但无法确定属性” → 使用 `Record<string, never>` 或 `Record<PropertyKey, never>`，而不是 `{}`。

**示例**：

```typescript
// ❌ 不好的做法
let data: {} = "hello"; // 意外通过
let config: Object = 42; // 意外通过

// ✅ 好的做法
let data: unknown = "hello"; // 需要类型守卫
let config: object = { port: 3000 };
function clone<T extends object>(val: T): T {
  /* ... */
}
```
