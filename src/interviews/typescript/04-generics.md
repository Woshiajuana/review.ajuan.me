# 泛型

## 知识点

### 泛型的基本概念

泛型允许在定义函数、接口、类时不预先指定具体类型，而在使用时再指定。它提供了**类型参数化**的能力，使组件可以支持多种类型，同时保留类型约束。

```typescript
// 一个简单的泛型函数
function identity<T>(arg: T): T {
  return arg;
}
// 使用时指定类型
let output = identity<string>("hello");
// 或利用类型推断
let output2 = identity("hello"); // 推断为 string
```

---

### 泛型变量（类型参数）

通常用单个大写字母表示类型参数，如 `<T>`、`<U>`、`<K>`、`<V>`。也可以使用有意义的名称（如 `TData`、`TError`）。

```typescript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // 可以访问 length，因为 T[] 已知有 length
  return arg;
}
```

---

### 泛型函数

泛型函数是在函数签名中声明类型参数的函数。

```typescript
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}
const merged = merge({ name: "Alice" }, { age: 25 }); // { name: string } & { age: number }
```

---

### 泛型接口

接口可以使用类型参数，使其变得通用。

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

**注意**：泛型接口可以全局参数化（接口名后跟 `<T>`），也可以在方法级别参数化。

---

### 泛型类

类名后跟类型参数，类内部所有成员都可以使用该类型参数。

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
```

- 泛型类只对实例成员有效，静态成员不能使用类的类型参数。

---

### 泛型约束（Generic Constraints）

使用 `extends` 关键字限制类型参数必须符合某个形状。

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK，字符串有 length
logLength([1, 2, 3]); // OK
logLength(123); // 错误，number 没有 length 属性
```

**多重约束**（通过交叉类型实现）：

```typescript
function combine<T extends { name: string } & { age: number }>(obj: T): T { ... }
```

---

### 默认泛型参数

可以为类型参数指定默认类型，当不显式指定时使用默认值。

```typescript
interface Event<T = string> {
  type: T;
  payload: any;
}
const strEvent: Event = { type: "click", payload: {} }; // T 默认为 string
const numEvent: Event<number> = { type: 101, payload: {} };
```

---

### 多个泛型参数

可以声明多个类型参数，用于不同位置的类型。

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
```

---

### 泛型与条件类型结合

条件类型可以根据泛型参数的不同产生不同的类型。

```typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<number>; // false
```

更复杂的结合：递归条件类型、`infer` 关键字等（详见高级类型部分）。

---

### 泛型中的 `keyof` 与索引类型

`keyof T` 获取 `T` 的所有键的联合类型，常与泛型约束一起使用。

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const person = { name: "Alice", age: 25 };
getProperty(person, "name"); // string
// getProperty(person, "gender"); // 错误，gender 不是 person 的键
```

---

### 泛型参数中的 `extends` 与类型推断

在条件类型中，可以使用 `infer` 提取类型变量。

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

---

### 泛型与 `new` 构造函数

约束泛型参数必须是可构造的。

```typescript
function create<T>(c: { new (): T }): T {
  return new c();
}
class Person {
  name: string = "";
}
const p = create(Person);
```

---

### 泛型工具类型（内置）

- `Partial<T>`：将 T 的所有属性变为可选。
- `Readonly<T>`：所有属性变为只读。
- `Pick<T, K>`：从 T 中挑选一组属性。
- `Record<K, T>`：创建一个对象类型，键为 K，值为 T。
- `Omit<T, K>`：从 T 中排除一组属性。
- `Exclude<T, U>`、`Extract<T, U>` 等。

这些工具类型大量使用了泛型和条件类型。

## 面试题

### 什么是泛型？为什么要使用泛型？请举例说明。

**定义**：泛型是 TypeScript 中的一种抽象能力，允许我们在定义函数、接口、类时不预先指定具体类型，而在使用时再指定，从而实现“类型参数化”。

**一句话**：泛型提供类型参数化，将类型从定义时推迟到使用时确定，解决组件可复用性与类型安全之间的矛盾。

**为什么要用**：

1. **复用性**：编写一次代码，支持多种类型，避免重复代码。
2. **类型安全**：保留类型信息，减少 `any` 的使用，编译时捕获类型错误。
3. **更好的抽象**：构建通用的组件和工具函数（如数组操作、Promise 等）。

**示例**：

```typescript
// 没有泛型：需要为每种类型写重复函数
function identityNumber(arg: number): number {
  return arg;
}
function identityString(arg: string): string {
  return arg;
}

// 有泛型：一个函数支持任意类型
function identity<T>(arg: T): T {
  return arg;
}
```

---

### 泛型约束（Generic Constraints）是什么？如何使用？

泛型约束使用 `extends` 关键字限制类型参数必须满足某个条件（即拥有某些属性或方法）。这样可以安全地访问特定属性。

**语法**：`<T extends SomeType>`

**示例**：

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length); // 现在可以安全访问 length
  return arg;
}

logLength("hello"); // ✅
logLength([1, 2, 3]); // ✅
logLength({ length: 10, value: 42 }); // ✅
// logLength(123);       // ❌ number 没有 length
```

**常用约束**：

- `T extends keyof U`：约束 T 必须是 U 的键。
- `T extends (...args: any[]) => any`：约束 T 是一个函数。
- `T extends Record<string, any>`：约束 T 是一个对象。

---

### `keyof` 操作符与泛型如何配合使用？请举例。

`keyof T` 返回类型 `T` 的所有公共属性键的联合类型。与泛型配合可以创建类型安全的属性访问器函数。

**示例**：

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice", age: 25 };

getProperty(user, "name"); // ✅ 返回 string
getProperty(user, "age"); // ✅ 返回 number
// getProperty(user, "email"); // ❌ 错误：email 不是 user 的键
```

**进阶用法**：结合映射类型创建对象属性批量修改函数：

```typescript
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}
const users = [{ name: "A" }, { name: "B" }];
const names = pluck(users, "name"); // string[]
```

---

### 泛型类与泛型接口有什么区别？何时使用？

**泛型接口**：描述对象或函数的形状，类型参数在接口级别声明，适用于定义通用的协议或契约。

**泛型类**：类型参数在类级别声明，实例成员可以使用该类型参数，但静态成员不能使用。

**区别**：

- 泛型接口可以用于函数类型、对象类型、类类型约束。
- 泛型类可以保持实例级别的类型一致性（例如一个 `Box<T>` 类，所有方法共享同一个 `T`）。
- 泛型接口更轻量，常用于定义通用函数签名或数据结构形状。

**使用场景**：

- **泛型接口**：定义通用的回调、仓库模式（Repository Pattern）、API 响应包装等。
- **泛型类**：实现数据结构（如栈、队列、列表），或管理某种类型的状态。

**示例**：

```typescript
// 泛型接口
interface Repository<T> {
  get(id: string): T;
  save(entity: T): void;
}

// 泛型类
class Stack<T> {
  private items: T[] = [];
  push(item: T) {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}
```

---

### 如何为泛型函数设置默认类型？有什么好处？

泛型参数的默认类型使用 `= DefaultType` 语法。当调用时不指定类型参数时，会使用默认类型。

**语法**：`<T = string>`

**示例**：

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

const strArr = createArray(3, "hello"); // 推断为 string[]
const numArr = createArray<number>(3, 42); // 显式指定 number[]
```

**好处**：

1. 为常用类型提供便利，减少重复的显式类型注解。
2. 向后兼容：在添加新类型参数时不影响现有调用。
3. 结合条件类型，可以创建灵活的工具类型。

**注意事项**：默认类型必须放在所有必需类型参数之后。

---

### 泛型与 `any` 有什么区别？为什么应该优先使用泛型？

| 维度       | 泛型                        | `any`                        |
| ---------- | --------------------------- | ---------------------------- |
| 类型安全   | ✅ 保留类型信息，编译时检查 | ❌ 关闭类型检查，不安全      |
| 返回值类型 | 与输入类型关联              | 可以随意改，丢失关联         |
| 代码意图   | 明确表达类型关系            | 模糊，滥用会退化到 JS        |
| 可维护性   | 高，重构时类型自动传播      | 低，类型错误可能推迟到运行时 |

**示例**：

```typescript
// 泛型：返回值类型与参数一致
function identity<T>(arg: T): T {
  return arg;
}
let a = identity("hello"); // a 为 string

// any：丢失类型信息
function identityAny(arg: any): any {
  return arg;
}
let b = identityAny("hello"); // b 为 any，后续调用任何方法都不报错
b.toFixed(); // 运行时错误，但 TS 不检查
```

**结论**：泛型在保留灵活性的同时保证类型安全，应始终优先于 `any`。只有当你确实无法确定类型结构且无法使用 `unknown` 时才考虑 `any`，但泛型几乎总能解决。

---

### 什么是“类型参数之间的约束”？如何实现一个类型安全的对象合并函数？

类型参数之间的约束是指一个类型参数依赖于另一个类型参数，例如 `U extends keyof T`。

**实现对象合并**：

```typescript
function mergeObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}
```

但这里 `T` 和 `U` 没有直接依赖。更复杂的例子：复制对象的部分属性：

```typescript
function pickProps<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}
```

这里 `K` 被约束为 `keyof T`，依赖于 `T`。

**类型参数之间的相互约束示例**（通过函数重载或条件类型实现更复杂的关系）：

```typescript
// 确保第二个参数的类型与第一个参数的某个属性匹配
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}
```

---

### 如何理解 `infer` 关键字在泛型条件类型中的作用？请举例。

`infer` 允许在条件类型中声明一个待推断的类型变量。它通常用于提取类型的一部分（如函数返回值、Promise 包装类型、数组元素类型等）。

**示例**：

```typescript
// 提取 Promise 的 resolved 类型
type Awaited<T> = T extends Promise<infer R> ? R : T;

type T1 = Awaited<Promise<string>>; // string
type T2 = Awaited<number>; // number

// 提取函数返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 提取数组元素类型
type ElementType<T> = T extends (infer U)[] ? U : T;
```

**使用限制**：

- `infer` 只能在条件类型的 `extends` 子句中使用。
- 同一个类型变量可以在多个位置使用（但必须一致）。

**高级用法**：递归提取深度嵌套的 Promise：

```typescript
type DeepAwaited<T> = T extends Promise<infer R> ? DeepAwaited<R> : T;
```
