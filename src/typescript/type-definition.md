# 类型定义

## 知识点

### 类型注解（Type Annotation）

类型注解是显式告诉 TypeScript 变量、参数、返回值等的类型。

```typescript
let age: number = 30; // 变量注解
function greet(name: string): string {
  // 参数和返回值注解
  return `Hello ${name}`;
}
```

- **必要性**：当 TypeScript 无法推断类型，或为了强制类型约束时使用。
- **规则**：一旦注解了类型，赋其他类型值会报错。

---

### 类型推断（Type Inference）

TypeScript 会根据初始化值自动推导类型，无需显式注解。

```typescript
let message = "hello"; // 推断为 string
let count = 42; // 推断为 number
let isValid = true; // 推断为 boolean
// message = 123;              // 错误：不能将 number 赋给 string
```

**推断发生的情况**：

- 变量初始化
- 函数默认参数
- 函数返回值（根据 return 语句）
- 数组元素类型
- 对象属性类型

---

### 上下文类型（Contextual Typing）

TypeScript 根据所在位置（上下文）反向推断表达式类型。

```typescript
// 回调参数的类型由上下文决定
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button); // mouseEvent 自动推断为 MouseEvent
};
```

**注意**：上下文类型依赖类型信息（如函数声明的参数位置、赋值目标类型）。如果类型信息不足，可能会推断为 `any`。

---

### 最佳通用类型（Best Common Type）

当从多个表达式推断类型时，TypeScript 会计算一个“兼容所有候选”的类型。

```typescript
let arr = [1, 2, null]; // 推断为 (number | null)[]
let mixed = [1, "a", true]; // 推断为 (string | number | boolean)[]
// 如果没有最佳通用类型，默认为联合类型
```

**控制最佳通用类型**：可以使用类型断言或显式注解影响推断结果。

```typescript
let zoo = [new Rhino(), new Elephant(), new Snake()];
// 默认推断为 (Rhino | Elephant | Snake)[]
// 但可以指定通用类型为 Animal
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```

---

### 类型断言（Type Assertion）

告诉编译器“我知道类型”，在编译时使用，运行时无影响。

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length; // as 语法
let strLength2: number = (<string>someValue).length; // 尖括号语法（JSX 中不可用）
```

**使用场景**：

- 将 `any` 或 `unknown` 转为具体类型
- 处理 DOM 元素：`const input = document.getElementById('myInput') as HTMLInputElement`
- 绕过类型系统（谨慎）

**注意**：类型断言不会转换实际数据，只是“欺骗”编译器。不正确的断言可能导致运行时错误。

---

### 非空断言（Non-null Assertion）`!`

后缀 `!` 告诉 TypeScript 该值不为 `null` 或 `undefined`。

```typescript
function process(x: string | null) {
  // 假设我们知道 x 不为 null
  const upper = x!.toUpperCase();
}
```

**用途**：在明确知道某个值存在但类型系统无法确认时使用，如 DOM 操作、从 Map 中获取确定存在的值。

---

### 确定赋值断言（Definite Assignment Assertion）`!`

在类的实例属性后加 `!`，告诉 TypeScript 该属性会被初始化（尽管不在构造函数中）。

```typescript
class MyClass {
  name!: string; // 确定赋值断言，跳过严格属性初始化检查
  // 实际在某处初始化，如 init() 方法
}
```

---

### 接口（Interface）

接口定义对象的形状（shape），是 TypeScript 的核心设计契约。

#### 基本语法

```typescript
interface Person {
  name: string;
  age: number;
}
const alice: Person = { name: "Alice", age: 30 };
```

#### 可选属性 `?`

```typescript
interface Config {
  url: string;
  timeout?: number; // 可选
}
```

#### 只读属性 `readonly`

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
let p: Point = { x: 10, y: 20 };
// p.x = 5;   // 错误
```

#### 索引签名（Index Signature）

用于描述动态属性名的对象。

```typescript
interface StringDictionary {
  [key: string]: string; // 任意字符串键对应 string 值
}
```

**混合签名**：同时支持索引签名和明确属性。

```typescript
interface NumberOrStringDict {
  [index: string]: number | string;
  length: number; // 必须兼容索引返回类型
  name: string; // OK
}
```

#### 函数类型接口

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc = function (src, sub) {
  return src.includes(sub);
};
```

#### 可调用接口与构造签名

```typescript
// 可调用
interface Callable {
  (x: number): number;
}
// 可构造
interface Constructor {
  new (x: number, y: number): Point;
}
```

#### 接口扩展（Extends）

```typescript
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
// 多继承
interface Circle extends Shape, Area {
  radius: number;
}
```

#### 类实现接口（Implements）

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}
class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}
```

#### 接口自动合并（Declaration Merging）

重复声明同一接口会自动合并成员。

```typescript
interface Box {
  height: number;
}
interface Box {
  width: number;
}
// 最终 Box 包含 height 和 width
```

**应用**：扩展全局类型、第三方模块类型。

---

### 类型别名（Type Alias）

`type` 为任何类型创建名称。

```typescript
type MyString = string;
type Point = { x: number; y: number };
type ID = string | number; // 联合类型
type Callback = (data: string) => void;
```

**类型别名可以表示的类型**：

- 原始类型
- 联合类型
- 交叉类型
- 元组
- 字面量类型
- 映射类型、条件类型等高级类型

---

### 类型别名 vs 接口

| 特性                   | 接口 `interface`                  | 类型别名 `type`                      |
| ---------------------- | --------------------------------- | ------------------------------------ |
| **扩展性**             | `extends` 扩展，可被 `implements` | 交叉类型 `&` 实现类似扩展            |
| **声明合并**           | ✅ 支持（同名接口自动合并）       | ❌ 不支持（同名报错）                |
| **表示元组/联合/原始** | ❌ 不能                           | ✅ 可以                              |
| **递归定义**           | ✅ 可以（但不如 `type` 直观）     | ✅ 可以（需注意递归深度）            |
| **性能**               | 较快（缓存）                      | 较慢（尤其在大型条件类型中）         |
| **使用场景**           | 描述对象形状/类契约；开放扩展     | 需要联合、元组、映射类型、工具类型时 |

**最佳实践**：

- 默认优先使用 `interface` 描述对象形状，因为它更直观、可扩展、报错信息更清晰。
- 当需要联合类型、元组、函数类型别名，或使用高级类型（映射、条件）时使用 `type`。
- 在库的公共 API 中优先使用 `interface`，以便用户可以声明合并扩展。

---

### 多余属性检查（Excess Property Checking）

当对象字面量直接赋值给接口类型时，TypeScript 会检查是否存在“多余”属性（未在接口中定义）。

```typescript
interface Person {
  name: string;
}
let p: Person = { name: "Alice", age: 25 }; // 错误：多余属性 age
```

**绕过方法**：

1. 使用类型断言：`{ name: "Alice", age: 25 } as Person`
2. 赋给临时变量：`let temp = { name: "Alice", age: 25 }; let p: Person = temp;`
3. 使用索引签名：`interface Person { name: string; [prop: string]: any; }`

---

### 交叉类型（Intersection Types）`&`

将多个类型合并为一个新类型，包含所有成员。

```typescript
type A = { a: number };
type B = { b: string };
type C = A & B; // { a: number; b: string }
```

**注意**：交叉属性冲突可能导致 `never`，如 `string & number` 为 `never`。

---

### 接口与类型别名的递归

```typescript
// 接口递归
interface TreeNode {
  value: number;
  children?: TreeNode[];
}

// 类型别名递归
type Tree = {
  value: number;
  children?: Tree[];
};
```

## 面试题

### TypeScript 中的类型推断和类型注解有什么区别？什么情况下必须使用注解？

- **类型推断**：TypeScript 编译器根据初始值或上下文自动推导类型，无需开发者显式写出。例如 `let x = 5;` 自动推断 `x` 为 `number`。
- **类型注解**：开发者显式声明类型，如 `let x: number = 5;`。

**必须使用注解的情况**：

1. 变量声明时没有初始值（如 `let x: number;` 然后稍后赋值）。
2. 函数参数（参数没有初始值，无法推断）。
3. 函数返回值类型不确定或需要强制约束（例如返回 `void` 但可能意外返回某值）。
4. 当推断出的类型不是预期类型时（如数组推断为 `(string|number)[]`，但我们需要 `string[]`）。
5. 定义对象字面量时防止多余属性检查（实际是使用注解强制类型）。
6. 使用 `any` 或 `unknown` 后需要转回具体类型（用断言，但也是一种“注解”）。

**例子**：

```typescript
// 必须注解：无初始值
let id: number;
id = 10;

// 必须注解：函数参数
function square(x: number) {
  return x * x;
}

// 推断不够精确
let arr = [1, "a"]; // (string|number)[]
// 强制为更精确类型
let arr2: (string | number)[] = [1, "a"]; // 其实一样，但有时需要只接受 number[]
```

---

### 解释 TypeScript 中的上下文类型（Contextual Typing）并举例。

上下文类型是 TypeScript 根据表达式的“目标类型”或“周围上下文”来推断表达式类型的能力。它通常发生在回调函数、赋值语句、对象字面量等位置。

**示例**：

```typescript
// 1. 回调参数类型由上下文决定
window.onclick = (event) => {
  console.log(event.button); // event 被自动推断为 MouseEvent
};

// 2. 数组方法回调
const numbers = [1, 2, 3];
numbers.forEach((item, index) => {
  // item 推断为 number，index 推断为 number
  console.log(item + index);
});

// 3. 对象字面量上下文
interface Point {
  x: number;
  y: number;
}
function draw(point: Point) {}
draw({ x: 10, y: 20 }); // 字面量符合 Point 类型，没有多余属性
// draw({ x: 10, y: 20, z: 30 });  // 错误，多余属性 z（多余属性检查也属于上下文类型的一种）
```

**注意**：上下文类型是双向的。如果没有足够的上下文信息，则参数会隐式变为 `any`（如果开启了 `noImplicitAny` 则报错）。

---

### 接口 `interface` 和类型别名 `type` 的区别是什么？在实际项目中如何选择？

**主要区别**：

1. **声明合并**：接口支持声明合并，多次定义同名接口会合并所有成员；类型别名不支持，同名会报错。
2. **扩展方式**：接口使用 `extends`，类型别名使用交叉类型 `&`。
3. **表示能力**：类型别名可以表示联合类型、元组、原始类型、映射类型等，接口无法表示这些（除了对象形状）。
4. **实现**：类可以实现（`implements`）接口，但不能实现类型别名（虽然可以 `implements` 一个包含类形状的类型别名，但这不是设计目的）。
5. **性能**：接口在某些情况下性能更好（缓存），类型别名特别是条件类型可能更慢。

**选择策略**：

- **优先使用 `interface`** 定义对象类型（如 Props、State、API 响应体、模型），因为它提供了更好的错误信息、更直观的扩展性，并且支持声明合并便于扩展第三方类型。
- **使用 `type`** 当需要：
  - 联合类型：`type Status = "success" | "error"`
  - 元组类型：`type Point = [number, number]`
  - 函数类型别名：`type Callback = (data: string) => void`
  - 映射类型或条件类型：`type Nullable<T> = T | null`
  - 工具类型：`type Partial<T> = { [P in keyof T]?: T[P] }`

**示例**：

```typescript
// 用 interface 定义对象形状
interface User {
  id: number;
  name: string;
}

// 用 type 定义联合
type UserRole = "admin" | "user" | "guest";

// 混合使用
type UserResponse = User & { role: UserRole };
```

---

### 什么是多余属性检查？为什么要存在？如何绕过？

**多余属性检查**：当对象字面量直接赋值给一个接口类型时，TypeScript 会检查该字面量是否包含接口中未定义的属性。如果包含，则报错。

```typescript
interface Person {
  name: string;
}
let p: Person = { name: "Alice", age: 25 }; // 错误：对象字面量只能指定已知属性
```

**为什么存在**：防止由于拼写错误或使用废弃属性导致的意外错误。对于函数接收对象参数时，如果不加检查，多余的属性可能会被静默忽略，导致潜在 bug。

**绕过方法**：

1. **类型断言**：`let p = { name: "Alice", age: 25 } as Person;`
2. **赋值给临时变量**：`let temp = { name: "Alice", age: 25 }; let p: Person = temp;`
3. **添加索引签名**：`interface Person { name: string; [prop: string]: any; }`
4. **使用交叉类型**：`let p: Person & { age: number } = { name: "Alice", age: 25 };`（但此时类型已不同）

**最佳实践**：除非明确需要额外属性（比如参数透传），否则不要绕过。绕过会失去检查保护。

---

### 如何理解 TypeScript 中的类型守卫与类型推断的关系？请举例自定义类型守卫。

（注：知识点 2、3 中未重点涉及类型守卫，但面试可能关联，这里简单补充）

**最佳回答**：

类型守卫是辅助类型推断的表达式，在代码块内缩小变量类型范围。

**内置守卫**：`typeof`、`instanceof`、`in`。

**自定义类型守卫**：函数返回类型为 `parameterName is Type`。

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

类型推断在守卫块内自动生效：

```typescript
if (isFish(pet)) {
  pet.swim(); // pet 被推断为 Fish
} else {
  pet.fly(); // pet 被推断为 Bird
}
```

这与“类型注解和推断”紧密相关：守卫提供了更精确的上下文信息，使编译器能够做更细粒度的类型推断。
