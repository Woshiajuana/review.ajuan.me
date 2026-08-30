# 函数

## 知识点

### 函数类型表达式

函数类型表达式用于描述函数的形状（参数列表和返回值类型）。

```typescript
// 函数类型表达式：(参数列表) => 返回值类型
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => `Hello ${name}`;
```

- 参数名可以省略（类型检查只关心类型），但通常保留以便阅读。
- 可用于接口中定义方法，也可独立作为类型别名。

---

### 参数类型注解

每个参数都需要显式注解类型（除非能通过上下文推断）。

```typescript
function add(x: number, y: number): number {
  return x + y;
}
```

---

### 返回值类型注解

可以显式注解，也可以依赖推断。推荐显式注解公共 API 的返回类型，以便捕获实现错误。

```typescript
// 显式注解
function getUser(id: number): User { ... }

// 推断返回类型
function multiply(a: number, b: number) {
    return a * b;   // 推断为 number
}
```

**注意**：如果函数没有返回值，应标注 `: void`；如果永不返回（抛出异常或无限循环），标注 `: never`。

---

### 可选参数（Optional Parameters）

使用 `?` 标记参数可选，可选参数必须放在必选参数之后。

```typescript
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

buildName("Alice"); // OK
buildName("Alice", "Smith"); // OK
```

---

### 默认参数（Default Parameters）

默认参数直接提供初始值，类型可推断也可注解。

```typescript
function greet(name: string = "Guest"): string {
  return `Hello ${name}`;
}
```

- 默认参数自动变为可选（不需要 `?`），但仍遵守位置顺序。
- 带默认值的参数可以放在必选参数之前，但调用时必须显式传入 `undefined` 才能触发默认值。

```typescript
function log(level: string = "info", message: string) {}
log(undefined, "Started"); // level 使用默认值 "info"
```

---

### 剩余参数（Rest Parameters）

使用 `...rest: Type[]` 收集剩余参数为一个数组。

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4); // 10
```

- 剩余参数必须是最后一个参数，类型通常为数组或元组。

**元组剩余参数**（TS 3.0+）：

```typescript
function introduce(name: string, ...rest: [age: number, city: string]) {
  console.log(`${name}, ${rest[0]} years old, from ${rest[1]}`);
}
introduce("Alice", 25, "Beijing");
```

---

### 函数重载（Function Overloads）

TypeScript 允许定义多个调用签名，然后在实现签名中处理不同情况。

```typescript
// 重载签名（通常 2+ 个）
function reverse(str: string): string;
function reverse(arr: any[]): any[];

// 实现签名（必须兼容所有重载签名）
function reverse(x: string | any[]): string | any[] {
  if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
  return x.slice().reverse();
}

// 调用
reverse("hello"); // 使用第一个重载
reverse([1, 2, 3]); // 使用第二个重载
```

**要点**：

- 重载签名没有函数体，实现签名必须包含所有参数和返回类型的联合。
- 调用时根据传入参数类型匹配最合适的重载签名。
- 建议保持重载数量适中，复杂逻辑可使用联合类型代替部分重载。

---

### `this` 类型

TypeScript 可以显式声明函数内 `this` 的类型，作为第一个假参数。

```typescript
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
  info: string;
  onClick(this: Handler, e: Event) {
    console.log(this.info);
  }
}

let handler = new Handler();
// 下面的调用会报错：this 上下文不匹配
// someElement.addEventListener("click", handler.onClick);
// 修复：使用箭头函数或 bind
someElement.addEventListener("click", (e) => handler.onClick(e));
```

**常用场景**：

- 避免回调函数中 `this` 指向意外变化。
- 标注 `this: void` 表示函数不应该使用 `this`。

---

### 函数重载的最佳实践与注意事项

- **优先使用联合类型**：如果重载签名仅仅是为了区分参数类型数量，联合类型往往更简洁。
- **重载顺序**：精确的签名放在前面，宽泛的放在后面，否则可能匹配不到期望的签名。
- **实现签名对外不可见**：只能通过重载签名调用函数。

---

### 泛型函数

详见知识点 5，简单示例：

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

---

### 函数上下文类型推断

当把函数赋值给类型为函数类型的变量时，参数类型自动推断。

```typescript
type F = (x: number) => number;
let f: F = (x) => x * 2; // x 推断为 number
```

---

### 构造签名（Construct Signatures）

用于描述可以用 `new` 调用的构造函数。

```typescript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
```

## 面试题

### TypeScript 中函数重载是什么？它与联合类型有什么区别？什么时候用重载？

**函数重载**是指为同一个函数定义多个调用签名，用于描述参数类型或数量不同时返回不同类型。TypeScript 会根据传入参数匹配最合适的签名。

**与联合类型的区别**：

- 联合类型是在参数或返回值上使用 `|`，适合参数类型不同但处理逻辑相似、返回值类型统一的情况。
- 重载更适合参数组合导致返回值类型**不同**，且逻辑分支较多的场景。

**使用重载的场景**：

1. 返回值类型依赖于参数类型（且不是简单的联合类型能表达）。
2. 不同参数数量对应不同返回值类型。
3. 参数之间存在互斥关系（如要么传 `string`，要么传 `number[]`，但不能混合）。

**示例**：

```typescript
// 使用联合类型（简单情况）
function toArray(x: string | number): (string | number)[] {
  return [x];
}

// 使用重载（更精确）
function toArray(x: string): string[];
function toArray(x: number): number[];
function toArray(x: string | number): (string | number)[] {
  return [x];
}
const a = toArray("hi"); // string[]
const b = toArray(123); // number[]
```

**结论**：能用联合类型解决就不必用重载；需要精确返回类型时使用重载。

---

### 可选参数和默认参数有什么区别？使用上有什么注意事项？

**区别**：

- **可选参数**（`?`）：调用时可以省略该参数，省略时值为 `undefined`。必须放在必选参数之后。
- **默认参数**（`= value`）：调用时可省略或传 `undefined`，此时参数使用默认值。默认参数不一定放在最后（但建议放在最后），如果放在前面，则调用时需传 `undefined` 以跳过。

**注意事项**：

1. 可选参数的类型自动包含 `undefined`，例如 `age?: number` 实际类型为 `number | undefined`。
2. 默认参数的类型由默认值推断，也可显式注解。
3. 可选参数和默认参数不能同时使用（即不能写 `age?: number = 18`，虽然不报错但冗余）。
4. 当默认参数在前时，调用者必须显式传 `undefined` 才能使用默认值，这容易造成困惑，因此实践中尽量将默认参数放在最后。

**示例**：

```typescript
// 可选参数
function f1(a: number, b?: number) {
  return a + (b ?? 0);
}
f1(5); // b 为 undefined
f1(5, 10);

// 默认参数
function f2(a: number, b: number = 0) {
  return a + b;
}
f2(5); // b 使用默认值 0
f2(5, undefined); // 同样使用默认值
```

---

### 如何正确处理函数中的 `this` 类型？为什么会出现 `this` 类型丢失的问题？

在 TypeScript 中，函数内部 `this` 的类型默认是 `any`（除非开启 `noImplicitThis`）。`this` 指向取决于函数的调用方式（谁调用，`this` 就指向谁）。在回调函数、事件处理器等场景中，`this` 很容易丢失预期的上下文。

**处理 `this` 的方法**：

1. **箭头函数**：箭头函数不绑定自己的 `this`，而是捕获定义时的 `this`。

   ```typescript
   class Handler {
     onClick = () => {
       console.log(this); // 始终指向 Handler 实例
     };
   }
   ```

2. **显式声明 `this` 参数类型**（作为第一个假参数）：

   ```typescript
   function onClick(this: HTMLElement, e: Event) {
     console.log(this.id);
   }
   ```

3. **使用 `bind`**：在调用前绑定 `this`。

**为什么 `this` 类型丢失**：

- 在 TypeScript 类中，方法默认是原型方法，当作为回调传递时（如 `setTimeout(this.method, 100)`），`this` 会变成全局对象或 `undefined`（严格模式）。
- 因为没有在类型层面标注 `this` 的预期类型，TypeScript 无法检查。

**最佳实践**：在类中定义事件处理器时，使用箭头函数属性或构造器中 `bind`；在普通函数中显式注解 `this`。

---

### 剩余参数（Rest Parameters）与 `arguments` 对象有什么区别？TypeScript 中如何为剩余参数指定元组类型？

**区别**：

- `arguments` 是类数组对象，没有数组方法（如 `map`、`reduce`），且只能在普通函数内使用，箭头函数没有 `arguments`。
- 剩余参数是真正的数组，可以直接调用数组方法，且类型清晰。

**TypeScript 中剩余参数的元组类型**：

```typescript
// 普通剩余参数：类型为 number[]
function sum(...nums: number[]): number { ... }

// 元组剩余参数：每个元素有特定类型
function logPair(name: string, ...rest: [age: number, city: string]) {
    console.log(`${name}, ${rest[0]}, ${rest[1]}`);
}
logPair("Alice", 25, "Beijing"); // 必须传入恰好两个额外参数
```

**注意**：元组剩余参数限制了剩余参数的长度和类型，调用时必须提供精确数量的参数，否则会报错。

---

### 函数类型表达式和接口中的方法签名有什么区别？什么时候用哪种？

**函数类型表达式**直接描述函数形状：`(params) => returnType`。  
**接口中的方法签名**有两种写法：

```typescript
// 函数类型表达式作为属性
interface F1 {
  (x: number): number;
}

// 方法简写
interface F2 {
  func(x: number): number;
}
```

**区别**：

- 函数类型表达式（作为属性）定义的接口可以被任何函数对象赋值，不限定方法名。
- 方法简写定义的接口要求对象有一个特定的方法名。
- 在类型兼容性和重载上存在细微差别（方法简写支持 `this` 类型标注，函数类型表达式不支持）。

**使用场景**：

- 当你需要描述一个**可调用对象**（如一个函数变量、回调类型）时，使用函数类型表达式。
- 当你需要描述一个**对象的方法**时，使用接口方法简写。

```typescript
// 函数类型表达式 - 适用于回调类型
type Callback = (err: Error | null, data: any) => void;

// 接口方法 - 适用于定义类的实例方法
interface Greetable {
  greet(name: string): string;
}
```

---

### `void` 和 `never` 作为函数返回值类型有什么区别？举例说明。

- **`void`**：表示函数正常执行完毕，但没有显式返回一个值（实际上会返回 `undefined`）。调用者可以接收返回值（值为 `undefined`），但不能依赖它进行后续操作。
- **`never`**：表示函数永远不会正常结束，要么抛出错误，要么进入无限循环。调用者不能接收返回值，并且函数之后的代码被认为是不可达的。

**示例**：

```typescript
function log(msg: string): void {
  console.log(msg);
  // 隐式 return undefined
}

function throwError(msg: string): never {
  throw new Error(msg);
  // 之后的代码不会执行
}

function infinite(): never {
  while (true) {}
}
```

**区别**：

- `void` 类型的函数可以返回 `undefined` 或 `null`（严格模式下仅 `undefined`），`never` 类型函数不能有任何返回。
- `never` 是所有类型的子类型，可以赋值给任何类型；`void` 只能赋值给 `void` 或 `any`。
- 在条件分支中，`never` 可用于穷尽性检查。
