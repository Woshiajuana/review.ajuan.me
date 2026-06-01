# 基础

- 练习题参考： https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

## TypeScript 解决了什么问题？

- 是 Javascript 的超集
- 提供编译时静态类型检查和强大的开发体验
- 可以在编写代码时，提供错误信息和代码补全功能
- 编译后产出纯净、高效的 JavaScript
- 核心价值是提升大型项目的可维护性和开发效率

## TypeScript 的基本类型有哪些？

- string
- number
- boolean
- bigint
- symbol
- null
- undefined

## `any`、`unknown`、`never`、`void` 的区别与使用场景？

- `any` 表示任意类型，会关闭静态类型检查
- `unknown` 未知类型，表示任何值，类似于 any 类型，但更安全，因为对 unknown 值进行任何操作都是不合法的。在实际使用的时候需要进行逻辑判断，将类型收窄
- `never` 表示不可能出现的类型，一般用于穷尽检查，或者函数抛出异常
- `void` 表示不返回值的函数的返回值

## `object`、`{}`、`Object` 的区别？

特殊类型 object 指的是任何非基本类型（ string 、 number 、 bigint 、 boolean 、 symbol 、 null 或 undefined ）的值。这与空对象类型 { } 不同，也与全局类型 Object 不同。你很可能永远不会用到 Object 。

## Interface 和 Type 的异同点

### 相同点

- 类型扩展
  + interface 通过 extends 扩展类型
  + type 通过交集扩展类型

### 不同点

- interface 只能用于声明对象的形状，不能用于重命名基本类型，声明的类型能被类实现
- type 类型别名可以定义基本类型、字面量类型、联合类型、交叉类型、元组等复杂类型
- interface 定义的类型可以重名，重名的类型会被声明合并
- type 定义的类型别名不能重名


## 为什么返回非 void 类型的函数可以赋值给返回 void 类型的函数？

先来看一个例子：

```ts
let items = [1, 2];
callMeMaybe(() => items.push(3));
```

如果不能赋值给返回 void 类型的函数，那么此时会报错。

可以这么理解：返回值为 void 回调类型表示“我不会查看你的返回值（如果有的话）”。

- [参考文档](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)


## 说一说协变和逆变？


## infer

- 可以在条件类型中，进行推理，声明新泛型类型变量
```ts
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
```

## readonly 和 ? 

- 都是映射修饰符
- 通过在前缀前添加 - 或 + 来移除或添加这些修饰符，默认是 +

```ts
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
```

## 内在字符串操作类型

- `Uppercase<StringType>`：将字符串中的每个字符转换为大写形式。
- `Lowercase<StringType>`：将字符串中的每个字符转换为小写形式。
- `Capitalize<StringType>`：将字符串中的第一个字符转换为大写字母。
- `Uncapitalize<StringType>`：将字符串中的第一个字符转换为小写字母。
- `NoInfer<Type>`

## 类构造函数签名和函数签名之间只有几点不同

- 构造函数不能有类型参数——类型参数应该放在外部类声明中
- 构造函数不能带有返回类型注解——返回值始终是类实例的类型

## 类初始化顺序

1. 父类字段初始化
2. 父类构造函数运行
3. 子类字段初始化
4. 子类构造函数运行

```ts
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}
class Derived extends Base {
  name = "derived";
}
// Prints "base", not "derived"
const d = new Derived();
```

## 一些特性

- TypeScript 只允许类型断言转换为更具体或更不具体的类型版本，这条规则可以防止诸如以下“不可能”的类型强制转换：
```ts
const x = "hello" as number; // error
```
- `as const` 可以将整个对象转换成类型字面量
- `never` 类型可以赋值给任何类型，但是除了 never 本身之外，没有任何类型可以赋值给 never
- 泛型：
  + 当指定类型参数时，只需为必需的类型参数指定类型参数即可。未指定的类型参数将解析为其默认类型

## 最佳实践

- 如果类型系统最终会推断出相同的类型，那最好不要添加注解
- 优先使用 interface 定义类型，直到需要使用类型别名特性时再使用 type 定义类型
- 编写优秀泛型函数的指南 
  + 尽可能使用类型参数本身，而不是对其进行约束
  + 尽可能少地使用类型参数
  + 如果一个类型参数只出现在一个地方，请认真考虑是否真的需要它
- 编写回调函数类型时，除非打算在不传递参数的情况下调用该函数，否则切勿编写可选​​参数。
- 尽可能优先选择联合类型的参数，而不是重载类型。
- `object` 不是 `Object` 。 请始终使用 `object` ！