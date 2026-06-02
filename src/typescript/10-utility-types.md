# 实用工具类型

以下是将你提供的 TypeScript 工具类型示例整理成的 Markdown 文档，包含内置类型说明、自定义实现及示例。

# TypeScript 工具类型实现参考

本文件记录了 TypeScript 常用内置工具类型的自定义实现方式，用于理解和学习其内部原理。

## `Awaited<Type>`

模拟 `async`/`await` 或 `Promise.then` 的递归解包行为。

```typescript
// 内置
type A = Awaited<Promise<string>>; // string

// 自定义实现
type MyAwaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F, ...args: any): any }
  ? F extends (value: infer V) => void
    ? MyAwaited<V>
    : never
  : T;

type A1 = MyAwaited<Promise<string>>; // string
```

## `Partial<Type>`

将类型的所有属性设置为可选。

```typescript
// 内置
type P = Partial<{ a: string }>; // { a?: string }

// 自定义实现
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
type P1 = MyPartial<{ a: string }>; // { a?: string }
```

## `Required<Type>`

将类型的所有属性设置为必选（移除可选标记）。

```typescript
// 内置
type R = Required<{ a?: string }>; // { a: string }

// 自定义实现
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};
type R1 = MyRequired<{ a?: string }>; // { a: string }
```

## `Readonly<Type>`

将类型的所有属性设置为只读。

```typescript
// 内置
type Re = Readonly<{ a: string }>; // { readonly a: string }

// 自定义实现
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
type Re1 = MyReadonly<{ a: string }>; // { readonly a: string }
```

## `Record<Keys, Type>`

构造一个对象类型，其键为 `Keys`，值为 `Type`。

```typescript
// 内置
type Rec = Record<string, string[]>; // { [x: string]: string[] }

// 自定义实现
type MyRecord<K extends keyof any, V> = {
  [P in K]: V;
};
type Rec1 = MyRecord<string, string[]>; // { [x: string]: string[] }
```

## `Pick<Type, Keys>`

从 `Type` 中选取指定的属性集 `Keys`。

```typescript
// 内置
type TPick = Pick<{ a: string; b: number }, "a">; // { a: string }

// 自定义实现
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type TPick1 = MyPick<{ a: string; b: number }, "a">; // { a: string }
```

## `Exclude<UnionType, ExcludedMembers>`

从联合类型中排除可赋值给 `ExcludedMembers` 的成员。

```typescript
// 内置
type TExclude = Exclude<"a" | "b", "b">; // 'a'

// 自定义实现
type MyExclude<T, U> = T extends U ? never : T;
type TExclude1 = MyExclude<"a" | "b", "b">; // 'a'
```

## `Omit<Type, Keys>`

从 `Type` 中移除指定的属性集 `Keys`。

```typescript
// 内置
type TOmit = Omit<{ a: string; b: number }, "a">; // { b: number }

// 自定义实现（基于 Pick 和 Exclude）
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>;
type TOmit1 = MyOmit<{ a: string; b: number }, "a">; // { b: number }
```

## `Extract<Type, Union>`

从 `Type` 中提取可赋值给 `Union` 的成员。

```typescript
// 内置
type TExtract = Extract<"a" | "b" | "c", "a" | "f">; // 'a'

// 自定义实现
type MyExtract<T, U> = T extends U ? T : never;
type TExtract1 = MyExtract<"a" | "b" | "c", "a" | "f">; // 'a'
```

## `NonNullable<Type>`

从类型中排除 `null` 和 `undefined`。

```typescript
// 内置
type TNonNullable = NonNullable<string | number | undefined>; // string | number

// 自定义实现
type MyNonNullable<T> = T extends null | undefined ? never : T;
type TNonNullable1 = MyNonNullable<string | number | undefined>; // string | number
```

## `Parameters<Type>`

提取函数类型的参数类型，以元组形式返回。

```typescript
// 内置
type TParameters = Parameters<(a: number, b: string) => string>; // [number, string]

// 自定义实现
type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type TParameters1 = MyParameters<(a: number, b: string) => string>; // [number, string]
```

## `ConstructorParameters<Type>`

提取构造函数类型的参数类型，以元组形式返回。

```typescript
// 内置
type TConstructorParameters = ConstructorParameters<ErrorConstructor>; // [message?: string]

// 自定义实现
type MyConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;
type TConstructorParameters1 = MyConstructorParameters<ErrorConstructor>; // [message?: string]
```

## `ReturnType<Type>`

提取函数类型的返回值类型。

```typescript
// 内置
type TReturnType = ReturnType<() => string>; // string

// 自定义实现
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
type TReturnType1 = MyReturnType<() => string>; // string
```

## `InstanceType<Type>`

提取构造函数的实例类型。

```typescript
class C {
  x = 0;
  y = 0;
}

// 内置
type TInstanceType = InstanceType<typeof C>; // C

// 自定义实现
type MyInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : never;
type TInstanceType1 = MyInstanceType<typeof C>; // C
```

## `NoInfer<Type>`

阻止 TypeScript 在泛型推断时使用该位置作为推断源。

```typescript
// 自定义模拟实现（常用技巧）
type MyNoInfer1<T> = [T][T extends any ? 0 : never];

function createStreetLight<C extends string>(
  colors: C[],
  defaultColor?: NoInfer<C>, // 内置
  defaultColor1?: MyNoInfer1<C> // 自定义模拟
) {
  // ...
}
createStreetLight(["red", "yellow", "green"], "red", "xx"); // OK
createStreetLight(["red", "yellow", "green"], "blue"); // Error
```

## `ThisParameterType<Type>`

提取函数类型的 `this` 参数类型。

```typescript
function toHex(this: Number) {
  return this.toString(16);
}

// 内置
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

// 自定义实现
type MyThisParameterType<T> = T extends (this: infer U, ...args: any) => any
  ? U
  : unknown;
function numberToString1(n: MyThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

## `OmitThisParameter<Type>`

从函数类型中移除 `this` 参数。

```typescript
function onClick(this: HTMLButtonElement, event: Event) {
  /* ... */
}
// 绑定 this 后得到的新函数类型中 this 参数被移除
const boundHandler = onClick.bind(document.querySelector("button")!);
// boundHandler 的类型是 (event: Event) => void
```

## `ThisType<Type>`

用作上下文 `this` 类型的标记，不返回转换后的类型。需启用 `noImplicitThis`。

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // methods 中的 this 类型为 D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // 类型安全
      this.y += dy;
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

---
