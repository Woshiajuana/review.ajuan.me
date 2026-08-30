# 类

## 知识点

### 类的基本语法

TypeScript 类在 ES6 类语法基础上增加了类型注解和访问修饰符。

```typescript
class Person {
  name: string; // 属性类型声明
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    // 方法及其返回类型
    return `Hello, I'm ${this.name}`;
  }
}
```

---

### 类成员：属性、方法、构造函数

- **属性**：可以是实例属性或静态属性（`static`），需声明类型。
- **方法**：可以是实例方法或静态方法。
- **构造函数**：`constructor` 关键字，用于初始化实例。不能有返回值类型注解。

```typescript
class Rectangle {
  // 属性
  width: number;
  height: number;
  static defaultColor = "blue"; // 静态属性

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  // 实例方法
  area(): number {
    return this.width * this.height;
  }

  // 静态方法
  static createSquare(side: number): Rectangle {
    return new Rectangle(side, side);
  }
}
```

---

### 访问修饰符（Access Modifiers）

| 修饰符      | 访问范围                 |
| ----------- | ------------------------ |
| `public`    | 默认值，任何地方都可访问 |
| `private`   | 仅类内部可访问           |
| `protected` | 类内部及子类可访问       |

```typescript
class Animal {
  public name: string;
  private age: number;
  protected species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }
}

class Dog extends Animal {
  bark() {
    console.log(this.name); // ✅ public
    // console.log(this.age);    // ❌ private，不可访问
    console.log(this.species); // ✅ protected，子类可访问
  }
}
```

**ECMAScript 私有字段（`#`）**：TypeScript 3.8+ 支持真正的运行时私有字段。

```typescript
class WithHashPrivate {
  #secret = 42;
  getSecret() {
    return this.#secret;
  }
}
```

---

### 参数属性（Parameter Properties）

在构造函数参数前加上修饰符，TypeScript 会自动创建并初始化同名字段。

```typescript
class User {
  constructor(public id: number, public name: string, private email: string) {}
}
// 等价于：
class User {
  public id: number;
  public name: string;
  private email: string;
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
```

---

### 只读属性（`readonly`）

`readonly` 属性只能在声明时或构造函数中初始化，之后不可修改。

```typescript
class Point {
  readonly x: number;
  readonly y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
const p = new Point(10, 20);
// p.x = 30;  // 错误
```

---

### 抽象类（Abstract Class）

抽象类不能被实例化，只能被继承。可包含抽象方法（没有实现）和具体方法。

```typescript
abstract class Shape {
  abstract getArea(): number; // 抽象方法，子类必须实现

  printArea() {
    // 具体方法
    console.log(this.getArea());
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
// const s = new Shape(); // 错误：不能实例化抽象类
```

---

### 类类型（Class Types）

类本身既是值（构造函数）也是类型（实例类型）。

```typescript
class MyClass {}
let instance: MyClass = new MyClass(); // MyClass 作为类型
let constructorRef: typeof MyClass = MyClass; // typeof 获取构造函数类型
```

---

### 类表达式（Class Expressions）

类可以定义在表达式中，可以有名字或匿名。

```typescript
const Rectangle = class {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
};
```

---

### 实现接口（`implements`）

类可以声明实现一个或多个接口，要求类的公共成员满足接口形状。

```typescript
interface Printable {
  print(): void;
}
interface Serializable {
  serialize(): string;
}

class Document implements Printable, Serializable {
  print() {
    console.log("Printing...");
  }
  serialize() {
    return JSON.stringify(this);
  }
}
```

**注意**：`implements` 只检查类型，不提供默认实现。类可以拥有接口之外的额外成员。

---

### 继承（`extends`）

使用 `extends` 关键字实现继承。子类构造函数中必须调用 `super()` 才能使用 `this`。

```typescript
class Animal {
  constructor(public name: string) {}
  move(distance: number) {
    console.log(`${this.name} moved ${distance}m`);
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // 必须先调用 super
  }
  move(distance: number) {
    super.move(distance); // 调用父类方法
    console.log("Dog runs!");
  }
  bark() {
    console.log("Woof!");
  }
}
```

---

### `this` 类型（多态 `this`）

`this` 类型可以表示当前类或子类类型，在链式调用中非常有用。

```typescript
class Calculator {
  value: number = 0;
  add(n: number): this {
    this.value += n;
    return this;
  }
  multiply(n: number): this {
    this.value *= n;
    return this;
  }
}

class ScientificCalculator extends Calculator {
  sin(): this {
    this.value = Math.sin(this.value);
    return this;
  }
}
const calc = new ScientificCalculator().add(5).multiply(2).sin();
// 返回类型始终是子类实例，不会丢失类型信息
```

---

### 静态成员（Static Members）

静态属性/方法属于类本身而非实例，可通过类名访问。

```typescript
class MathUtils {
  static PI = 3.14159;
  static circleArea(radius: number): number {
    return this.PI * radius ** 2;
  }
}
console.log(MathUtils.PI);
```

静态成员也可以有访问修饰符（`public`/`private`/`protected`）。

---

### 成员可见性与 `protected` 进阶

TypeScript 的 `protected` 成员在派生类中可访问，但派生类的实例不能通过基类引用来访问受保护成员（某些语言中允许，TS 更严格）。

```typescript
class Base {
  protected x: number = 1;
}
class Derived extends Base {
  getX() {
    return this.x;
  } // OK
  getBaseX(base: Base) {
    // return base.x;              // 错误：不能通过基类实例访问
  }
}
```

---

### 类的类型兼容性

TypeScript 类类型兼容性基于结构（属性/方法），而非名义继承关系。

```typescript
class Point1 {
  x: number;
  y: number;
}
class Point2 {
  x: number;
  y: number;
}
let p1: Point1 = new Point2(); // ✅ 结构相同，兼容
```

但如果类有 `private` 或 `protected` 成员，则兼容性要求来自同一父类（名义化）。

```typescript
class A {
  private x: number;
}
class B {
  private x: number;
}
let a: A = new B(); // ❌ 私有成员不兼容，虽然结构相同
```

---

### 抽象构造签名

有时需要约束构造函数返回抽象类型，可使用抽象构造签名。

```typescript
function createInstance<T>(ctor: new (...args: any[]) => T, ...args: any[]): T {
  return new ctor(...args);
}
```

---

### 类与装饰器（详见知识点 9）

装饰器可以修改类、方法、属性、参数。例如 `@Component` 在 Angular 中。

## 面试题

### TypeScript 中 `public`、`private`、`protected` 修饰符的区别？与 JavaScript 的私有字段 `#` 有何不同？

**区别**：

- `public`：默认修饰符，任何地方都可访问。
- `private`：只能在声明它的类内部访问，子类也不能访问。
- `protected`：在类内部和子类中可访问，实例不可访问。

**与 JavaScript 私有字段 `#` 的区别**：

- `private`/`protected` 是 TypeScript 编译时类型检查，编译后 JavaScript 中没有这些修饰符，运行时仍然可访问（通过原型链）。
- `#` 是 ES2022 标准的运行时私有字段，语法级私有，编译后也无法从外部访问（除非使用特殊手段）。
- TypeScript 的 `private` 更适合开发时的类型安全，`#` 提供真正的封装。

**建议**：库开发或需要运行时强封装时使用 `#`；仅需编译时约束时使用 `private`。

---

### 抽象类（`abstract`）和接口（`interface`）有什么区别？何时使用抽象类？

| 特性       | 抽象类                               | 接口                                             |
| ---------- | ------------------------------------ | ------------------------------------------------ |
| 实例化     | 不能                                 | 不能                                             |
| 实现方法   | 可以提供具体实现                     | 不能（TS 接口不能有实现）                        |
| 继承       | 单继承（一个子类只能继承一个抽象类） | 多实现（一个类可实现多个接口）                   |
| 构造器     | 可以有                               | 没有                                             |
| 成员修饰符 | 支持 `private`/`protected`           | 默认 `public`（TS 中支持 `readonly` 但无修饰符） |

**何时使用抽象类**：

- 需要提供部分公共实现（避免重复代码）。
- 需要定义受保护的成员（`protected`）供子类使用。
- 需要构造函数初始化状态。
- 场景：模板方法模式、框架基类（如 React 的 `Component` 虽然是普通类，但抽象类常用于定义骨架）。

**何时使用接口**：

- 定义形状（type shape），不关心实现。
- 需要多类型兼容（类可以实现多个接口）。
- 需要描述函数类型、索引类型等。

---

### 参数属性（Parameter Properties）是什么？有什么优缺点？

参数属性是 TypeScript 的语法糖：在构造函数参数前加上访问修饰符（`public`/`private`/`protected`/`readonly`），TypeScript 会自动创建同名属性并赋值。

**示例**：

```typescript
class Person {
  constructor(public name: string, private age: number) {}
}
// 等价于
class Person {
  public name: string;
  private age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

**优点**：

- 减少样板代码，更简洁。
- 避免手动声明属性和赋值。

**缺点**：

- 可读性稍差（不熟悉的开发者可能困惑）。
- 当需要额外逻辑（如验证、转换）时无法使用，只能手动写。

**最佳实践**：简单 DTO 或简单类可以使用参数属性；有复杂初始化逻辑时避免。

---

### `this` 类型（多态 `this`）有什么用？请举例。

`this` 类型表示当前类或子类的实例类型，常用于链式调用（fluent interface），确保方法返回的是调用者的具体类型，而不是基类类型。

**示例**：

```typescript
class Animal {
  setName(name: string): this {
    this.name = name;
    return this;
  }
}
class Dog extends Animal {
  bark(): this {
    console.log("Woof");
    return this;
  }
}
const dog = new Dog().setName("Buddy").bark(); // 类型为 Dog，而非 Animal
```

如果没有 `this` 类型（返回 `Animal`），则 `bark` 方法不可链式调用。`this` 类型保证了类型随继承而变。

**其他场景**：实现构建器模式、复制方法等。

---

### 如何理解 TypeScript 中类的类型兼容性？私有成员如何影响兼容性？

TypeScript 类采用结构化类型系统，即比较两个类是否兼容，看它们的成员结构是否匹配。

**基本规则**：如果类 `A` 的所有成员（属性、方法）在类 `B` 中都存在且类型兼容，则 `A` 可赋值给 `B`（忽略额外成员）。

```typescript
class Point {
  x: number;
  y: number;
}
class Vector {
  x: number;
  y: number;
}
let p: Point = new Vector(); // ✅ 兼容
```

**私有成员的影响**：当类包含 `private` 或 `protected` 成员时，兼容性要求这些成员必须来自同一个父类。实际上，私有成员使得两个类**名义化**——只有相同的类（或继承链）才兼容。

```typescript
class A {
  private x: number;
}
class B {
  private x: number;
}
let a: A = new B(); // ❌ 错误

class C extends A {}
let a2: A = new C(); // ✅ 子类兼容
```

**原因**：私有成员被视为类的“唯一标识”，防止意外兼容不同类。这是 TypeScript 为了安全而设计的“名义化”行为。

---

### `implements` 和 `extends` 的区别？一个类可以同时 `extends` 和 `implements` 吗？

- **`extends`**：继承另一个类（或抽象类）。子类获得父类的所有方法和属性，可以重写或扩展。只能单继承。
- **`implements`**：实现一个接口。类必须提供接口声明的所有成员的具体实现，但不继承实现代码。可以实现多个接口。

**可以同时使用**：

```typescript
interface Shape {
  area(): number;
}
class Base {
  color: string;
}
class Circle extends Base implements Shape {
  radius: number;
  area() {
    return Math.PI * this.radius ** 2;
  }
}
```

**注意**：如果接口中的方法在基类中已经存在且类型匹配，则无需重新实现。

**最佳实践**：使用 `extends` 实现代码复用，使用 `implements` 定义契约。二者解决不同问题。

---

### 抽象类中的抽象方法是否可以有实现？抽象类可以包含具体方法吗？

- **抽象方法**：不能有实现，只声明签名，以 `abstract` 关键字开头，结尾用 `;` 而不是 `{}`。派生类**必须**实现所有抽象方法（除非派生类也是抽象类）。
- **抽象类可以包含具体方法**：有完整实现的普通方法，子类可以继承或重写。

**示例**：

```typescript
abstract class Base {
  abstract doSomething(): void; // 无实现
  concreteMethod(): string {
    // 有实现
    return "default";
  }
}
```

抽象方法强制子类提供特定行为，具体方法提供公共默认行为。这是模板方法模式的基础。

---

### 如何限制类的构造函数签名？例如要求某个函数只能传入可构造的类。

使用**构造签名**：`new (...args: any[]) => T`。

```typescript
function createInstance<T>(ctor: new (...args: any[]) => T, ...args: any[]): T {
  return new ctor(...args);
}

class Person {
  constructor(public name: string) {}
}
const p = createInstance(Person, "Alice");
```

**更严格的约束**：使用泛型约束 `{ new(): T }` 或抽象构造签名：

```typescript
type Constructable<T> = new (...args: any[]) => T;
function factory<T>(C: Constructable<T>): T {
  return new C();
}
```

**注意**：不能直接约束 `new () => T` 是抽象类？抽象类无法实例化，TypeScript 会禁止。可以通过条件类型或禁止抽象类标记来处理。
