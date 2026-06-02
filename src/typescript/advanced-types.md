# 高级类型

## 知识点

### 联合类型（Union Types）

联合类型表示一个值可以是多种类型中的一种，使用竖线 `|` 分隔。

```typescript
type Status = "success" | "error" | "loading";
type ID = string | number;

function printId(id: ID): void {
  console.log(id);
  // 不能直接调用 id.toUpperCase()，因为 number 没有这个方法
  // 需要类型守卫
}
```

**联合类型的属性访问**：只能访问所有类型的共有成员。

```typescript
interface Bird {
  fly(): void;
  layEggs(): void;
}
interface Fish {
  swim(): void;
  layEggs(): void;
}
type Pet = Bird | Fish;
let pet: Pet;
pet.layEggs(); // ✅ 共有方法
pet.fly(); // ❌ 不是所有类型都有 fly
```

---

### 交叉类型（Intersection Types）

交叉类型将多个类型合并成一个新类型，使用 `&` 符号。新类型包含所有类型的成员。

```typescript
type Person = { name: string };
type Employee = { id: number };
type Staff = Person & Employee; // { name: string; id: number }

function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}
```

**冲突处理**：相同属性但类型不兼容时，交叉类型可能产生 `never`。

```typescript
type Conflict = { x: string } & { x: number }; // x 为 never
```

---

### 类型守卫（Type Guards）

类型守卫是运行时检查，用于在代码块内缩小类型范围。

#### `typeof` 类型守卫（基本类型）

```typescript
function padLeft(value: string | number, padding: number): string {
  if (typeof value === "string") {
    return value.padStart(padding, " ");
  } else {
    return value.toString().padStart(padding, " ");
  }
}
```

#### `instanceof` 类型守卫（类实例）

```typescript
class Dog {
  bark() {}
}
class Cat {
  meow() {}
}
function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

#### `in` 操作符守卫（属性检查）

```typescript
interface Bird {
  fly(): void;
}
interface Fish {
  swim(): void;
}
function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

#### 自定义类型守卫（`is` 关键字）

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function feed(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // pet 被收窄为 Fish
  } else {
    pet.fly(); // pet 被收窄为 Bird
  }
}
```

#### 断言函数（`asserts`）

```typescript
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Not a string");
  }
}
function process(val: any) {
  assertIsString(val);
  val.toUpperCase(); // val 被收窄为 string
}
```

---

### 可辨识联合（Discriminated Unions）

可辨识联合是一种模式：联合类型的每个成员都有一个相同的字面量类型属性（**可辨识特征**），TypeScript 可以据此精确收窄类型。

```typescript
interface Square {
  kind: "square";
  size: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
interface Triangle {
  kind: "triangle";
  side: number;
}
type Shape = Square | Circle | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size ** 2;
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "triangle":
      return (Math.sqrt(3) / 4) * shape.side ** 2;
    default:
      const _exhaustive: never = shape; // 穷尽性检查
      return _exhaustive;
  }
}
```

**优点**：类型安全、易于扩展、编译时检查遗漏分支。

---

### 类型断言（Type Assertion）

告诉编译器“我知道这个值的类型”，不做运行时转换。

```typescript
let someValue: unknown = "hello";
let strLength: number = (someValue as string).length;
```

**双重断言**：当无法直接断言时，可以先断言为 `any` 再断言为目标类型（不推荐）。

```typescript
let x = "hello" as unknown as number; // 危险，但不报错
```

---

### 非空断言（Non-null Assertion）`!`

后缀 `!` 从类型中排除 `null` 和 `undefined`。

```typescript
function processInput(input: string | null) {
  // 假设我们知道 input 不为空
  const value = input!.toUpperCase();
}
```

---

### 索引类型（Index Types）

#### `keyof` 操作符

获取类型的所有公共属性键的联合类型。

```typescript
interface Person {
  name: string;
  age: number;
}
type PersonKeys = keyof Person; // "name" | "age"
```

#### 索引访问类型 `T[K]`

获取类型 T 的特定属性 K 的类型。

```typescript
type NameType = Person["name"]; // string
type AgeType = Person["age"]; // number
type Values = Person[keyof Person]; // string | number
```

#### 索引签名

描述对象的动态属性。

```typescript
interface StringMap {
  [key: string]: string;
}
```

---

### 映射类型（Mapped Types）

基于旧类型创建新类型，使用 `[P in K]` 语法。

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

**内置映射类型**：

- `Partial<T>`：所有属性可选
- `Required<T>`：所有属性必选
- `Readonly<T>`：所有属性只读
- `Pick<T, K>`：选取部分属性
- `Omit<T, K>`：排除部分属性
- `Record<K, T>`：创建键为 K、值为 T 的对象类型

**键重映射（TS 4.1+）**：

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
// 示例：{ name: string } -> { getName: () => string }
```

---

### 条件类型（Conditional Types）

根据类型关系选择不同的类型，语法：`T extends U ? X : Y`。

```typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<number>; // false
```

**分布式条件类型**：当 `T` 是联合类型时，条件类型会分发到每个成员。

```typescript
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]
```

**`infer` 关键字**：在条件类型中提取类型变量。

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type PromiseResolve<T> = T extends Promise<infer U> ? U : T;
```

**递归条件类型**：

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
```

---

### 模板字面量类型（Template Literal Types，TS 4.1+）

基于字符串字面量类型创建新字符串类型，语法同 ES6 模板字符串。

```typescript
type Direction = "top" | "bottom";
type Alignment = "left" | "right";
type Position = `${Direction}-${Alignment}`; // "top-left" | "top-right" | "bottom-left" | "bottom-right"

// 与映射类型结合，用于生成事件处理函数名
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"
```

**内置字符串操作类型**：

- `Uppercase<S>`：将字符串字面量转为大写
- `Lowercase<S>`：转小写
- `Capitalize<S>`：首字母大写
- `Uncapitalize<S>`：首字母小写

---

### 类型查询（`typeof`）

在类型上下文中获取变量或属性的类型。

```typescript
const config = { api: "https://example.com", port: 8080 };
type Config = typeof config; // { api: string; port: number; }

function getConfig(): Config {
  return config;
}
```

**注意**：`typeof` 在类型上下文和值上下文中的区别。

```typescript
let s = "hello"; // 值
type T = typeof s; // string 类型
```

---

### 类型兼容性（Type Compatibility）

TypeScript 采用结构化类型系统（structural typing），只要求成员兼容即可，不要求名义相同。

```typescript
interface Named {
  name: string;
}
class Person {
  name: string = "";
}
let p: Named = new Person(); // ✅ 结构兼容

// 函数类型兼容性：参数可以少但不能多（逆变）
let fn1 = (a: number, b: string) => {};
let fn2 = (a: number) => {};
fn1 = fn2; // ✅ 可赋值（参数少）
// fn2 = fn1; // ❌ 参数多不可赋值
```

**协变与逆变**：

- 返回值类型是协变的：子类可以返回更具体的类型。
- 参数类型是逆变的：子类可以接受更宽泛的类型（strictFunctionTypes 下）。

---

### 内置高级工具类型补充

| 工具类型                   | 作用                          |
| -------------------------- | ----------------------------- |
| `Exclude<T, U>`            | 从 T 中排除可赋值给 U 的类型  |
| `Extract<T, U>`            | 从 T 中提取可赋值给 U 的类型  |
| `NonNullable<T>`           | 从 T 中排除 null 和 undefined |
| `ReturnType<T>`            | 函数 T 的返回值类型           |
| `Parameters<T>`            | 函数 T 的参数类型元组         |
| `ConstructorParameters<T>` | 构造函数参数类型元组          |
| `InstanceType<T>`          | 构造函数实例类型              |
| `ThisParameterType<T>`     | 函数 this 参数类型            |
| `OmitThisParameter<T>`     | 移除函数 this 参数后的类型    |
| `Awaited<T>`               | 递归解包 Promise 类型         |

## 面试题

### 联合类型和交叉类型的区别是什么？分别适用于什么场景？

- **联合类型**（`A | B`）：表示值可能是 A 或 B 中的一种。只能访问 A 和 B 共有的成员。适用于一个值可以有多种不同类型的场景，如 API 响应可能是成功数据或错误信息，函数参数可以接受字符串或数字。

- **交叉类型**（`A & B`）：表示值必须同时满足 A 和 B 的所有成员。新类型拥有 A 和 B 的所有属性。适用于对象合并、混入（mixin）等场景，如将两个对象合并成一个。

**示例对比**：

```typescript
// 联合类型：ID 可以是字符串或数字
type ID = string | number;

// 交叉类型：一个有尺寸和颜色的矩形
type Colored = { color: string };
type Sized = { size: number };
type ColoredSized = Colored & Sized; // { color: string; size: number }
```

**关键区别**：联合是“或”，交叉是“且”。联合用于宽泛可能性，交叉用于组合必要性。

---

### 什么是可辨识联合（Discriminated Union）？它解决了什么问题？

可辨识联合是一种模式：联合类型的每个成员都包含一个共同的、字面量类型的属性（称为“可辨识特征”或“tag”），TypeScript 可以利用该属性进行类型收窄，实现类型安全的处理。

**解决的问题**：当联合类型成员有不同属性时，直接处理需要繁琐的类型守卫。可辨识联合通过一个公共字段区分成员，使得类型收窄简单可靠，并且可以利用 `switch` 做到穷尽性检查。

**示例**：

```typescript
type Action =
    | { type: "ADD"; payload: number }
    | { type: "REMOVE"; id: string }
    | { type: "RESET" };

function reducer(state: any, action: Action) {
    switch (action.type) {
        case "ADD": return state + action.payload;   // action 收窄为 ADD
        case "REMOVE": return state.filter(...);     // action 收窄为 REMOVE
        case "RESET": return 0;
        default:
            const _exhaustive: never = action;       // 若漏掉分支，编译报错
            return state;
    }
}
```

**优点**：类型安全、易于扩展、编译时检查遗漏情况。

---

### 自定义类型守卫（`is`）和断言函数（`asserts`）有什么区别？

- **自定义类型守卫**（`value is Type`）：返回布尔值，用于 `if` 条件中。如果返回 `true`，则传入的值在该作用域内被收窄为指定类型。

- **断言函数**（`asserts value is Type`）：不返回值（或返回 `void`）。如果条件不满足，抛出错误；如果正常返回，则 TypeScript 认为该值在后续代码中已被收窄为指定类型。常用于验证函数，无需 `if` 包裹。

**区别**：
| 特性 | `is` 守卫 | `asserts` 断言 |
|------|-----------|----------------|
| 返回值 | 布尔值 | void（或 never） |
| 使用方式 | 条件判断中 | 单独调用，不满足时抛错 |
| 控制流 | 创建分支 | 直接收窄（后续代码一定满足） |
| 适用场景 | 可恢复的检查 | 前置条件验证（如参数校验） |

**示例**：

```typescript
// is 守卫
function isString(val: unknown): val is string {
  return typeof val === "string";
}
function test1(val: unknown) {
  if (isString(val)) {
    val.toUpperCase(); // val 为 string
  }
}

// asserts 断言
function assertString(val: unknown): asserts val is string {
  if (typeof val !== "string") throw new Error("Not a string");
}
function test2(val: unknown) {
  assertString(val);
  val.toUpperCase(); // 直接使用，无需 if
}
```

---

### 映射类型和索引类型有什么区别？如何实现一个 `Readonly<T>` 和 `Partial<T>`？

- **索引类型**：指 `keyof` 和 `T[K]`，用于访问类型的键和属性值类型。是映射类型的基础。
- **映射类型**：基于旧类型创建新类型，使用 `[P in keyof T]` 遍历键，并可添加修饰符（`readonly`、`?`）。

**实现**：

```typescript
// Readonly<T>
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Partial<T>
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

**两者关系**：映射类型利用索引类型 `keyof T` 获得键集合，然后通过索引访问 `T[P]` 获取原属性类型。映射类型是更高层次的抽象，常用于创建工具类型。

---

### 什么是条件类型？解释分布式条件类型和 `infer` 的用法。

**条件类型**：`T extends U ? X : Y`，根据类型关系选择类型。它可以在类型层面实现逻辑判断。

**分布式条件类型**：当条件类型的 `T` 是联合类型时，条件会分发到每个成员，结果也是联合类型。

```typescript
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]（而非 (string|number)[]）
```

**`infer` 用法**：在条件类型的 `extends` 子句中声明待推断的类型变量，用于提取复杂类型的部分。

```typescript
// 提取 Promise 内部类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type T1 = UnwrapPromise<Promise<string>>; // string
type T2 = UnwrapPromise<number>; // number

// 递归提取
type DeepUnwrap<T> = T extends Promise<infer U> ? DeepUnwrap<U> : T;
```

**注意事项**：`infer` 只能在条件类型的 `true` 分支中使用，且每个类型变量只能推断一次。

---

### 模板字面量类型有什么用途？请结合事件处理函数场景举例。

模板字面量类型允许根据字符串字面量类型动态生成新的字符串字面量类型，常用于构建类型安全的字符串模式（如 CSS 类名、事件名、路由路径）。

**事件处理函数场景**：

```typescript
type EventName = "click" | "focus" | "blur";
type HandlerName = `on${Capitalize<EventName>}`; // "onClick" | "onFocus" | "onBlur"

interface EventMap {
  onClick: (e: MouseEvent) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
}

function addListener<K extends keyof EventMap>(name: K, handler: EventMap[K]) {
  /* ... */
}

addListener("onClick", (e) => {}); // e 自动为 MouseEvent
```

**其他用途**：

- 类型安全的 CSS 类名组合：`${BaseClass}--${Variant}`
- 路由参数匹配：`/users/${string}/posts/${string}`
- 构建 DSL（领域特定语言）类型。

---

### 如何理解 TypeScript 的结构化类型系统？与名义类型系统有何不同？

TypeScript 使用结构化类型系统（又称“鸭子类型”）：类型兼容性基于成员的实际结构，而不是类型的名称或声明位置。

**示例**：

```typescript
interface Point {
  x: number;
  y: number;
}
interface Vector {
  x: number;
  y: number;
}
let p: Point = { x: 1, y: 2 };
let v: Vector = p; // ✅ 结构相同，允许
```

**与名义类型系统对比**（如 Java、C#）：

- 名义系统要求类型名称相同或显式继承关系。
- 结构化系统更灵活，适合 JavaScript 的动态特性，但可能意外兼容（如上例）。

**如何模拟名义类型**（如果需要）：

```typescript
// 使用品牌/标签
interface NominalPoint {
  _brand: "point";
  x: number;
  y: number;
}
function createPoint(x: number, y: number): NominalPoint {
  return { _brand: "point", x, y };
}
// 现在不同标签的类型不兼容
```

结构化类型使得 TypeScript 能够很好地与无类型的 JavaScript 协作，但也需要开发者注意潜在的意外兼容。

---

### `Exclude<T, U>` 和 `Extract<T, U>` 是如何实现的？请手写。

利用条件类型的分布式特性实现：

```typescript
// Exclude: 从 T 中排除可赋值给 U 的类型
type Exclude<T, U> = T extends U ? never : T;

// Extract: 从 T 中提取可赋值给 U 的类型
type Extract<T, U> = T extends U ? T : never;
```

**示例**：

```typescript
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Extract<"a" | "b" | "c", "a" | "b">; // "a" | "b"
```

**原理**：联合类型分发，`never` 在联合中会被自动过滤掉。
