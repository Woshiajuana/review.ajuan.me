# 装饰器

## 知识点

### 装饰器概述

装饰器是一种特殊声明，可以附加到类、方法、访问器、属性或参数上。它是一种**函数**，在运行时被调用，能够修改类或成员的行为。TypeScript 中的装饰器是**实验性功能**，需要在 `tsconfig.json` 中启用：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true // 可选，用于元数据反射
  }
}
```

> **注意**：装饰器目前处于 TC39 提案的 Stage 3，语法可能变化。TypeScript 实现的装饰器与标准提案略有不同（标准版基于 `accessor` 关键字等）。

---

### 装饰器工厂（Decorator Factory）

装饰器工厂是一个返回装饰器函数的函数，允许用户传参定制行为。

```typescript
function color(value: string) {
  return function (target: any) {
    // 这是真正的装饰器函数
    console.log(`Color: ${value}`);
  };
}
```

---

### 类装饰器（Class Decorator）

类装饰器应用于**类的构造函数**，用于监视、修改或替换类定义。参数为构造函数，返回类型可以是新构造函数或 `void`。

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}
```

**带工厂的类装饰器**：

```typescript
function report(verbose: boolean) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        if (verbose) {
          console.log(`Creating instance of ${constructor.name}`);
        }
      }
    };
  };
}
```

---

### 方法装饰器（Method Decorator）

方法装饰器应用于方法的属性描述符，可以修改方法实现。三个参数：

1. 对于静态成员：类的构造函数；对于实例成员：类的原型对象。
2. 成员名称（字符串或 symbol）。
3. 属性描述符（PropertyDescriptor）。

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

---

### 访问器装饰器（Accessor Decorator）

应用于 getter/setter，参数与方法装饰器相同。注意不能同时装饰 getter 和 setter，只能装饰其中一个。

```typescript
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

class Person {
  private _name: string;
  @enumerable(true)
  get name() {
    return this._name;
  }
  set name(val: string) {
    this._name = val;
  }
}
```

---

### 属性装饰器（Property Decorator）

应用于属性声明。两个参数：目标（构造函数的原型或构造函数自身）和属性名。没有属性描述符参数（因为属性初始化时无法直接获取描述符，需要配合 `Object.defineProperty` 手动处理）。

```typescript
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value: string;
    const getter = function () {
      return `${formatString}${value}`;
    };
    const setter = function (newVal: string) {
      value = newVal;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

class Greeting {
  @format("Hello, ")
  name: string;
}
```

---

### 参数装饰器（Parameter Decorator）

应用于方法参数。三个参数：目标、方法名、参数索引（数字）。常用于依赖注入（Angular）。

```typescript
function logParam(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter ${parameterIndex} of ${propertyKey} was decorated`);
}

class Service {
  greet(@logParam name: string) {
    console.log(`Hello ${name}`);
  }
}
```

---

### 装饰器组合与执行顺序

多个装饰器可以同时应用，执行顺序：

- **求值顺序**：装饰器表达式自上而下求值（工厂函数执行）。
- **调用顺序**：装饰器函数自下而上执行（即“返回的装饰器函数”从后往前执行）。

**示例**：

```typescript
function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}
function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}
class Example {
  @first()
  @second()
  method() {}
}
// 输出：
// first(): factory evaluated
// second(): factory evaluated
// second(): called
// first(): called
```

**同一目标上的装饰器顺序**（类装饰器除外，类装饰器在最后执行）：

- 参数装饰器 → 方法装饰器 → 访问器装饰器 → 属性装饰器 → 类装饰器

具体顺序参考 TypeScript 官方文档。

---

### 元数据反射（Metadata Reflection）

配合 `reflect-metadata` 库，可以在装饰器中添加和读取元数据。

安装：`npm install reflect-metadata`

启用：`"emitDecoratorMetadata": true`

```typescript
import "reflect-metadata";

class User {
  @Reflect.metadata("role", "admin")
  name: string = "Alice";
}

const metadata = Reflect.getMetadata("role", new User(), "name");
console.log(metadata); // "admin"
```

Angular 使用此机制实现依赖注入，自动获取构造函数参数类型。

---

### 常见装饰器示例

#### 节流 / 防抖装饰器

```typescript
function debounce(delay: number) {
  let timer: any;
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => original.apply(this, args), delay);
    };
  };
}
```

#### 权限控制装饰器

```typescript
function requiresAuth(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this.isAuthenticated) {
      throw new Error("Unauthorized");
    }
    return original.apply(this, args);
  };
}
```

---

### 注意事项与限制

- 装饰器目前是实验性功能，在未来的 TypeScript 版本中可能修改。
- 装饰器不能用于装饰函数声明（仅类及类成员）。
- 类装饰器不能用在声明文件（`.d.ts`）中。
- 装饰器作用于类的原型，对于实例属性需要额外处理。
- 标准装饰器提案与 TypeScript 实现有差异（标准版本使用 `@decorator` 搭配 `accessor` 等），迁移时需注意。

---

## 面试题

### 什么是 TypeScript 装饰器？它有什么用途？如何启用？

**最佳回答**：

装饰器是一种特殊的函数声明，可以附加到类、方法、访问器、属性或参数上，用于修改或增强这些成员的行为。它类似于其他语言（如 Python、Java 注解）中的修饰器。

**主要用途**：

- 日志记录、性能监控。
- 权限控制、认证。
- 依赖注入（Angular 的核心机制）。
- 数据验证（如 `@MaxLength`）。
- 序列化/反序列化（如 `@Expose`）。
- 节流、防抖等函数增强。

**启用方式**：在 `tsconfig.json` 中设置 `"experimentalDecorators": true`。如果需要元数据反射，还需要 `"emitDecoratorMetadata": true` 并安装 `reflect-metadata` 库。

---

### 解释装饰器工厂（Decorator Factory）及其与装饰器的区别。

**最佳回答**：

- **装饰器**是直接应用于类/方法等的函数。它的参数由 TypeScript 编译器自动提供（如目标、属性名、描述符等），不能额外传参。
- **装饰器工厂**是一个返回装饰器函数的函数。通过工厂，开发者可以传入自定义参数，实现可配置的装饰器。

**示例**：

```typescript
// 普通装饰器（无参数）
function log(target, name, descriptor) { ... }

// 装饰器工厂（可传参）
function logWithPrefix(prefix: string) {
    return function(target, name, descriptor) { ... }
}
@logWithPrefix("[DEBUG]")
class MyClass {}
```

**区别**：工厂在应用时会被立即调用（参数求值），返回的装饰器函数会在稍后由 TypeScript 调用。这是实现参数化装饰器的标准方式。

---

### 类装饰器、方法装饰器、属性装饰器、参数装饰器的参数分别是什么？它们之间的区别是什么？

**最佳回答**：

| 装饰器类型   | 参数 1                                     | 参数 2 | 参数 3                          |
| ------------ | ------------------------------------------ | ------ | ------------------------------- |
| 类装饰器     | 构造函数 (constructor)                     | -      | -                               |
| 方法装饰器   | 原型对象（实例成员）或构造函数（静态成员） | 方法名 | 属性描述符 (PropertyDescriptor) |
| 访问器装饰器 | 同上                                       | 同上   | 同上                            |
| 属性装饰器   | 原型对象或构造函数                         | 属性名 | -（无描述符）                   |
| 参数装饰器   | 原型对象或构造函数                         | 方法名 | 参数索引 (number)               |

**重要区别**：

- 类装饰器可以替换类定义（返回新构造函数）。
- 方法/访问器装饰器可以修改描述符，替换或包装原方法。
- 属性装饰器没有描述符参数，无法直接修改属性的初始化行为（但可以通过返回一个函数并手动操作 `Object.defineProperty` 实现）。
- 参数装饰器主要用于收集元数据（如 Angular 的 `@Inject`）。

---

### 多个装饰器的执行顺序是怎样的？请举例。

**最佳回答**：

执行顺序分为两个阶段：**求值**和**调用**。

1. **求值**：装饰器表达式（工厂函数）从上到下依次执行。
2. **调用**：装饰器函数（工厂返回的函数）从下到上依次执行。

**示例**：

```typescript
function f() {
  console.log("f(): evaluated");
  return function () {
    console.log("f(): called");
  };
}
function g() {
  console.log("g(): evaluated");
  return function () {
    console.log("g(): called");
  };
}

@f()
@g()
class C {}
// 输出：
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called
```

**对于同一成员上的多个装饰器**：先执行参数装饰器，然后方法/访问器，然后属性，最后类装饰器（但类装饰器在类定义完成后执行，实际上在所有成员装饰器之后）。

官方文档明确：参数装饰器 → 方法装饰器 → 访问器装饰器 → 属性装饰器 → 类装饰器。

---

### 如何实现一个日志装饰器，记录方法的输入和输出？

**最佳回答**：

使用**方法装饰器**，包装原始方法，在调用前后打印日志。

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(
      `[${new Date().toISOString()}] Calling ${propertyKey} with:`,
      args
    );
    const result = original.apply(this, args);
    console.log(
      `[${new Date().toISOString()}] ${propertyKey} returned:`,
      result
    );
    return result;
  };
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

**进阶**：使用装饰器工厂接收配置（如日志级别、是否打印参数等）。

---

### 解释 TypeScript 中元数据反射（Reflect Metadata）的作用，以及如何与装饰器结合使用。

**最佳回答**：

**元数据反射**允许在装饰器中添加和读取自定义元数据（metadata），从而在运行时获取类型信息或其他注解信息。它依赖于 `reflect-metadata` 库和 `emitDecoratorMetadata` 编译选项。

**主要作用**：

- 依赖注入框架（如 Angular）通过元数据获取构造函数参数类型，自动注入依赖。
- ORM 框架（如 TypeORM）通过装饰器（`@Column`、`@Entity`）定义实体映射。
- 验证框架根据属性类型自动校验。

**用法示例**：

```typescript
import "reflect-metadata";

// 设置元数据
Reflect.defineMetadata("role", "admin", target, "propertyKey");

// 读取元数据
const role = Reflect.getMetadata("role", target, "propertyKey");
```

**自动类型元数据**：当 `emitDecoratorMetadata` 开启时，TypeScript 会自动为装饰器附加参数类型、返回类型等信息：

```typescript
class Service {
    @Log
    handle(@Inject() param: UserService) { }
}
// TypeScript 会生成类似：
Reflect.metadata("design:type", Function)  // 方法类型
Reflect.metadata("design:paramtypes", [UserService]) // 参数类型
Reflect.metadata("design:returntype", void) // 返回值类型
```

这些信息可被框架利用实现自动装配。

---

### 装饰器可以实现类似其他语言中“注解”的所有功能吗？有什么限制？

**最佳回答**：

装饰器可以实现很多注解功能，但存在一些限制：

**可实现**：

- 标记元数据（如权限、路由）。
- 修改类行为（添加 mixin、代理方法）。
- 验证、日志、缓存等 AOP 功能。

**限制**：

1. **无法直接修改构造函数签名**：类装饰器可以返回新类，但需要小心类型兼容。
2. **属性装饰器不能直接修改属性的初始化值**：需要借助 getter/setter 或反射。
3. **不能用于函数声明**（独立函数），只支持类及类成员。
4. **实验性且未来可能变化**：标准装饰器提案与当前实现不兼容，将来需要迁移。
5. **执行时机**：在类定义时执行，而非运行时实例化时，因此某些动态场景不适用。
6. **无法直接访问实例属性**：因为装饰器运行时实例尚未创建。

尽管如此，在框架（Angular、NestJS、TypeORM）中，装饰器仍然是强大且实用的工具。

---

### 如何编写一个防抖（debounce）装饰器？

**最佳回答**：

使用方法装饰器，在内部存储计时器，延迟执行原方法。

```typescript
function debounce(delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        original.apply(this, args);
        timer = null;
      }, delay);
    };
    return descriptor;
  };
}

class SearchBox {
  @debounce(300)
  search(keyword: string) {
    console.log(`Searching for ${keyword}`);
  }
}
```

**注意**：该实现会在多次调用时重置计时器，适合输入框搜索场景。

---

### 标准 ES 装饰器（Stage 3）与 TypeScript 实验性装饰器的主要区别是什么？

**最佳回答**：

| 特性       | TypeScript 实验性装饰器      | ES 标准装饰器（提案）                            |
| ---------- | ---------------------------- | ------------------------------------------------ |
| 支持成员   | 类、方法、访问器、属性、参数 | 类、方法、字段、访问器、自动访问器（`accessor`） |
| 参数装饰器 | ✅                           | ❌（尚未纳入）                                   |
| 属性描述符 | 直接操作                     | 使用 `accessor` 和 `init` 函数                   |
| 执行时机   | 类定义时                     | 类定义时 + 实例化时（部分）                      |
| 返回值     | 可替换类或描述符             | 返回新描述符或 `undefined`                       |
| 上下文参数 | 目标、名称、描述符           | 一个 `context` 对象                              |
| 语法       | `@decorator` 直接应用        | `@decorator` 基本一致，但工厂模式写法相同        |

**主要差异**：标准装饰器不再支持参数装饰器，并且提供更细粒度的控制（如访问器、字段）。另外，标准方案使用 `context.addInitializer` 等 API 替代直接修改原型。Angular 等框架目前仍依赖 TypeScript 实现，迁移到标准需要时间。
