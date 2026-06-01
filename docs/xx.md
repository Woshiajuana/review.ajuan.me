## `object`、`{}` 与 `Object` 的区别详解

在 TypeScript 中，`object`、`{}`（空对象类型）和 `Object` 看起来相似，但含义和行为有本质区别。理解它们对于写出准确、安全的类型非常重要。

---

### 1. `object` 类型

**定义**：表示**非原始类型**（non-primitive type）。即不是 `string`、`number`、`boolean`、`symbol`、`bigint`、`null`、`undefined` 的值。

```typescript
let obj: object;

obj = { name: "Alice" };   // ✅
obj = [1, 2, 3];           // ✅ 数组是对象
obj = new Date();          // ✅
obj = /regex/;             // ✅
obj = function() {};       // ✅

// ❌ 原始类型不允许
obj = "hello";     // 错误
obj = 42;          // 错误
obj = true;        // 错误
obj = null;        // 错误（严格模式下）
obj = undefined;   // 错误
```

**特点**：
- 不能直接访问或赋值任意属性（因为 `object` 自身不包含任何属性签名）。
- 通常与**索引签名**或**接口**配合使用，或作为泛型约束。

```typescript
let obj: object = { a: 1 };
// obj.a = 2;   // ❌ 错误：类型“object”上不存在属性“a”

function clone<T extends object>(source: T): T {
    return { ...source };
}
```

**最佳实践**：当你需要表示“任何非原始类型的值”且不需要具体属性时使用 `object`。例如：`Record<string, unknown>` 或泛型约束 `extends object`。

---

### 2. `{}` 空对象类型

**定义**：表示一个**没有自身属性**的对象。但有趣的是，除了 `null` 和 `undefined`，**几乎任何其他值都可以赋值给 `{}`**（包括原始类型），因为原始类型在 JavaScript 中可自动装箱为对象。

```typescript
let empty: {};

empty = { name: "Alice" };   // ✅
empty = 42;                  // ✅ 数字可以赋值给 {}
empty = "hello";             // ✅ 字符串也可以
empty = true;                // ✅ 布尔值也可以
empty = Symbol();            // ✅
empty = null;                // ❌ 严格模式下报错
empty = undefined;           // ❌ 严格模式下报错
```

**为什么原始类型可以赋给 `{}`？**  
TypeScript 的结构化类型系统认为：如果一个类型 `A` 的所有成员在类型 `B` 中都存在，则 `A` 可赋值给 `B`。对于 `{}`，它没有任何成员，所以任何类型（除了 `null` / `undefined`）都可以赋值给它（满足“鸭子类型”）。这实际上是 TypeScript 早期设计留下的“宽松行为”。

**访问属性**：
```typescript
empty.name;   // ❌ 类型“{}”上不存在属性“name”
```

**实际用途**：
- 几乎**不推荐直接使用 `{}`**，因为它会意外地接受原始类型，导致类型检查失效。
- 有时用于表示“除了 null/undefined 之外的任何值”，但更好的选择是 `object` 或 `unknown`。

---

### 3. `Object` 类型（大写 O）

**定义**：TypeScript 中 `Object` 是**全局 `Object` 构造函数**对应的类型，它包含所有 JavaScript 对象都具有的方法（`toString`、`valueOf`、`hasOwnProperty` 等）。

```typescript
let capitalO: Object;

capitalO = { name: "Alice" };   // ✅
capitalO = [1, 2];              // ✅
capitalO = 42;                  // ✅ 原始类型也会自动装箱
capitalO = "hello";             // ✅
capitalO = true;                // ✅
capitalO = null;                // ❌ 严格模式下报错
capitalO = undefined;           // ❌
```

**与 `{}` 类似**：`Object` 也允许原始类型（因为原始类型有对应的包装对象，且 TypeScript 认为原始类型兼容 `Object`）。

**区别**：
- `Object` 类型预定义了 `toString`、`valueOf` 等方法，因此可以安全调用它们：
  ```typescript
  let obj: Object = { a: 1 };
  obj.toString();   // ✅ 存在
  ```
- `{}` 类型上不存在任何方法（即使 `toString` 实际上在原型链上，但 TypeScript 的类型系统不自动包含）。

**最佳实践**：**永远不要使用 `Object`** 作为类型。它带来的混乱大于价值。如果需要表示“任何值”，用 `unknown`；如果需要表示“非原始类型”，用 `object`。

---

### 4. 对比总结表

| 类型        | 可赋值值（`strictNullChecks` 开启）                           | 可访问的成员            | 推荐使用场景                             |
| ----------- | ------------------------------------------------------------ | ----------------------- | ---------------------------------------- |
| `object`    | 仅非原始类型：对象、数组、函数、日期、正则等<br/>不包括 `string`, `number`, `boolean`, `symbol`, `bigint`, `null`, `undefined` | 无（需要类型断言或扩展） | 表示“非原始类型的值”，泛型约束             |
| `{}`        | 除 `null`/`undefined` 外的**任何值**（包括原始类型）           | 无任何属性（类型层面）   | ❌ 几乎不推荐使用                         |
| `Object`    | 除 `null`/`undefined` 外的**任何值**（包括原始类型）           | `toString`, `valueOf` 等 | ❌ 不推荐使用，历史遗留，容易被误用       |

---

### 5. 面试题与最佳回答

**面试题：请解释 TypeScript 中 `object`、`{}` 和 `Object` 的区别，并说明应该推荐使用哪一个？**

**最佳回答**：

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
let data: {} = "hello";        // 意外通过
let config: Object = 42;       // 意外通过

// ✅ 好的做法
let data: unknown = "hello";   // 需要类型守卫
let config: object = { port: 3000 };
function clone<T extends object>(val: T): T { /* ... */ }
```

这个回答既解释了区别，又给出了实践指导，是面试官期望的标准答案。