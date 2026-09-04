/**
 * 在实际开发中，我们经常要封装一个工具函数来安全地访问对象的某个属性。

请实现一个名为 getProperty 的泛型函数，它接收两个参数：

obj：一个对象

key：该对象的一个键名

要求：

函数返回值的类型必须自动推断为对象对应键的值类型（即：obj[key] 的精确类型）。

如果传入的 key 不在 obj 中，TypeScript 必须在编译期报错提示。

请写出完整代码，并解释：为什么这里必须使用泛型来约束 key，而不能直接用 key: string 或 key: keyof any 来实现？
 */

function getProperty<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
const obj = { x: 1, y: "2" };
const x = getProperty(obj, "x");
const y = getProperty(obj, "y");

/**
 * 要求 1：实现 MyPick<T, K>

从类型 T 中选出键名集合 K，构造出一个新类型。

约束：K 必须是 T 的键。

要求 2：实现 MyReadonly2<T, K>

将 T 中指定键 K 的属性设为只读（readonly）。

如果不传 K（即 K 省略时），则默认将 T 中所有属性都设为只读。

提示：这里需要用到泛型默认参数和交叉类型（&）或映射修饰符。
 */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & Omit<T, K>;

type MyReadonly3<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & { [P in keyof T as P extends K ? never : P]: T[P] };

/**
 * 请在不使用内置工具类型 ReturnType 和 Parameters 的前提下，自行实现以下两个类型工具：

要求 1：实现 MyReturnType<T>

获取函数类型 T 的返回值类型。

必须使用条件类型 + infer 实现。

要求 2：实现 MyParameters<T>

获取函数类型 T 的参数列表类型（以元组形式）。

必须使用条件类型 + infer 实现。

额外追问（请在代码后文字作答）：
如果传入的 T 是一个重载函数（即拥有多个调用签名的函数，例如 function foo(a: string): string; function foo(a: number): number;），请问 MyReturnType<T> 会推断出什么类型？为什么 TypeScript 会这样处理？
 */

type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;

type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

function foo(a: number): number;
function foo(a: string): string;
function foo(a: string | number): string | number {
  return a;
}

type MR = ReturnType<typeof foo>;

interface Animal {
  name: string;
}
interface Dog extends Animal {
  bark(): void;
}

// 定义两个函数类型
type HandlerA = (animal: Animal) => void;
type HandlerB = (dog: Dog) => void;

// 声明两个变量
let handlerA: HandlerA = (animal) => console.log(animal.name);
let handlerB: HandlerB = (dog) => dog.bark();

// 场景一：将 handlerB 赋值给 handlerA
// handlerA = handlerB; // ① 是否允许？ ❌

// 场景二：将 handlerA 赋值给 handlerB
// handlerB = handlerA; // ② 是否允许？  ✅

/**
 * 现有如下路由配置对象：

typescript
const routes = {
    home: { path: '/', component: 'HomePage' },
    user: { path: '/user', component: 'UserProfile' },
    admin: { path: '/admin', component: 'AdminPanel' }
};
任务 1（类型提取）：
请实现一个工具类型 RoutePaths<T>，提取 routes 中所有 path 的值的字面量联合类型（预期结果应为 "/" | "/user" | "/admin"）
 */

type RoutePaths1<T extends Record<string, { path: string }>> = T extends Record<
  string,
  { path: infer P }
>
  ? P
  : never;

type RoutePaths<T extends Record<string, { path: string }>> =
  T[keyof T]["path"];

const routes = {
  home: { path: "/", component: "HomePage" },
  user: { path: "/user", component: "UserProfile" },
  admin: { path: "/admin", component: "AdminPanel" },
} as const satisfies Record<string, { path: string; component: string }>;

type R1 = RoutePaths<typeof routes>;

/**
 * 请实现一个工具类型 ParsePathParams<T>，它接收一个 URL 路径的字符串字面量（例如 "/users/:id/posts/:commentId"），提取出所有以 : 开头的参数名称，并以联合类型返回。

预期效果：

typescript
type Params1 = ParsePathParams<"/users/:id/posts">;        // 期望：'id'
type Params2 = ParsePathParams<"/users/:id/posts/:commentId">; // 期望：'id' | 'commentId'
type Params3 = ParsePathParams<"/static/asset.png">;       // 期望：never（无参数）
type Params4 = ParsePathParams<"/:a/:b">;                  // 期望：'a' | 'b'
要求：

必须使用模板字面量类型和 infer 实现。

必须正确处理递归（因为路径可能包含任意数量的参数）。

不能使用 split 或其他运行时逻辑，必须在类型层面完成。

额外追问（请认真作答）：

在模板字面量的 infer 中，${infer A}/${infer B} 匹配时，A 和 B 的划分是贪婪（greedy）还是非贪婪（lazy）？这会对你的递归实现产生什么影响？

如果路径中出现 //（连续斜杠） 或 /:param 紧挨着结尾，你的类型是否依然稳健？
 */

const paths = "/users/:id/posts/:commentId";

type ParsePathParams<T extends string> =
  T extends `${infer Prefix}:${infer ParamAndRest}`
    ? ParamAndRest extends `${infer Param}/${infer Rest}`
      ? Param | ParsePathParams<`/${Rest}`>
      : ParamAndRest
    : never;

type Params1 = ParsePathParams<typeof paths>;

/**
 * 任务 1（基础守卫）：
编写一个函数 isString，它是一个类型守卫（Type Guard），用于判断传入值是否为 string 类型。

typescript
// 请写出函数签名和实现
function isString(value: unknown): value is string {
    // 实现代码
}
 */

function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * 任务 2（数组过滤实战）：
你有一个数组 const data: (string | number)[] = ['a', 1, 'b'];。请结合你写的 isString，在不使用类型断言（as） 的前提下，用 filter 过滤出所有字符串，并确保 TypeScript 能够自动推断出过滤后的结果为 string[]。
 */

const data: (string | number)[] = ["a", 1, "b"];
const filterData = data.filter(isString);

/**
 * 任务 3（断言函数实现）：
编写一个断言函数 assertString，它接受一个 unknown 参数。如果该参数不是 string，则抛出运行时错误；如果通过检查，则后续代码中该变量应被收窄为 string。

typescript
// 请写出函数签名和实现
function assertString(value: unknown): asserts value is string {
    // 实现代码
}
 */
function assertString(value: unknown): asserts value is string {
  // 实现代码
  if (typeof value !== "string") {
    throw "xxx";
  }
}
function testAssertString(val: string | number) {
  assertString(val);
}

/**
 * 接口守卫组合（附加题，可选）：
如果有一个类型 User = { name?: string }，你想确保 User 对象存在且 name 为 string（排除 undefined）。请使用你学到的守卫知识，写出一个守卫函数 isValidUser。
 */

function isValidUser(val: { name?: string }): val is { name: string } {
  return !!val.name;
}

/**
 * 任务 1：实现 MyExclude<T, U>

请自行实现内置工具类型 Exclude<T, U> 的等价版本（不能使用内置 Exclude），它从联合类型 T 中过滤掉可以赋值给 U 的成员。

typescript
// 期望效果
type T1 = MyExclude<"a" | "b" | "c", "a">;     // "b" | "c"
type T2 = MyExclude<"a" | "b" | "c", "a" | "b">; // "c"
 */

type MyExclude<T, U> = T extends U ? never : T;
type T1 = MyExclude<"a" | "b" | "c", "a">; // "b" | "c"
type T2 = MyExclude<"a" | "b" | "c", "a" | "b">; // "c"

/**
 * 任务 3：never 的空联合陷阱

给定一个泛型工具 TestNever<T> = T extends string ? true : false;，请问：

TestNever<never> 的结果是什么？（是 true？false？还是 never？）

请解释为什么 never 作为泛型参数传入条件类型时，会得到空联合（never），而不是逐字判断 never extends string 为 true 或 false。
 */

type TestNever<T> = T extends string ? true : false;

type TNever = TestNever<never>;
type TAny = TestNever<any>;
type TNull = TestNever<null>;

/**
 * 第十三题（递归类型：实现 DeepReadonly<T>）
请实现一个深度只读（DeepReadonly）工具类型 DeepReadonly<T>，它能够将对象及其所有嵌套属性（包括数组内部的元素）递归地变为只读（readonly）。

特殊要求（工程实战约束）：

对于 Function 类型（函数），不要递归展开，直接原样返回（因为函数的 call/apply 等属性不宜被改写为只读）。

对于 Date 类型，不要递归展开，直接原样返回（否则 setTime 等方法会被错误地标记为只读）。

对于 Array 类型，需要将其转换为 ReadonlyArray，并递归处理数组内的元素类型。

对于原始类型（string、number、boolean 等），直接原样返回。

代码模板：

typescript
type DeepReadonly<T> = 
    // 你的实现代码（用条件类型 + 映射类型）
验证用例：

typescript
interface User {
    name: string;
    age: number;
    address: {
        city: string;
        zip: number;
    };
    tags: string[];
    callback: (msg: string) => void;
    createdAt: Date;
}

type ReadonlyUser = DeepReadonly<User>;
// 期望：所有属性、嵌套属性、数组元素变为 readonly，
// 但 callback 和 createdAt 保持原样（不展开）
 */

type Primitive = string | number | boolean | symbol | null | undefined;

type DeepReadonly<T> = T extends Primitive
  ? T // 基础类型直接返回
  : T extends Function
  ? T // 函数保持原样（不破坏 call/apply）
  : T extends Date
  ? T // Date 保持原样（不破坏 setTime）
  : T extends Array<infer U>
  ? ReadonlyArray<DeepReadonly<U>> // 数组转只读数组并递归元素
  : T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> } // 对象递归映射
  : T; // 兜底返回

type User = {
  name: string;
  age: number;
  address: {
    city: string;
    zip: number;
  };
  tags: string[];
  callback: (msg: string) => void;
  createdAt: Date;
};
type IsRecord<T> = T extends Record<string, unknown> ? true : false;

type TUser1 = IsRecord<User>;
type TUser2 = IsRecord<{
  name: string;
  age: number;
  address: {
    city: string;
    zip: number;
  };
  tags: string[];
  callback: (msg: string) => void;
  createdAt: Date;
}>;

type DeepReadonly1<T> = T extends Record<string, unknown>
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

type ReadonlyUser = DeepReadonly<User>;

type ReadonlyUser1 = DeepReadonly1<User>;

/**
 * 第十四题（终极算法：类型级数字运算与斐波那契数列）
TypeScript 的类型系统是图灵完备的，我们可以用元组（Tuple）的长度来模拟数字，实现加减法和循环。

热身任务（必做）：实现 Add<A, B>

实现一个工具类型 Add<A extends number, B extends number>，返回 A + B 的数值字面量。

限制：不能使用 // @ts-ignore，必须在类型层面通过元组展开实现（[...T, ...U]）。

提示：你需要一个辅助类型 BuildTuple<N, Acc> 来生成长度为 N 的元组。

typescript
type BuildTuple<N extends number, Acc extends any[] = []> = 
  Acc['length'] extends N ? Acc : BuildTuple<N, [...Acc, any]>;

// 请实现 Add
type Add<A extends number, B extends number> = 
  // 你的代码
  // 期望：Add<1, 2> => 3
 */

type BuildTuple<
  N extends number,
  Acc extends any[] = []
> = Acc["length"] extends N ? Acc : BuildTuple<N, [...Acc, any]>;

type Add<A extends number, B extends number> = [
  ...BuildTuple<A>,
  ...BuildTuple<B>
]["length"];

type AResult = Add<1, 2>;

/**
 * 任务 1（概念辨析）：
请列出 type（类型别名）和 interface（接口）之间的 3 个核心区别。重点说明它们在声明合并（Declaration Merging）、扩展（继承）语法、以及对象字面量的多余属性检查上的不同表现。

1. type 是通过 交叉类型（&） 扩展， interface 通过 extends 关键字扩展
2. type 可定义联合类型、元组、原始类型别名，interface 适用于描述对象结构（对象/函数/类）
3. type 不可重复定义（会报重复标识符错误），interface 支持声明合并（多次定义会自动合并）。
 */

const appConfig = {
  host: "localhost",
  port: 3000,
  debug: true,
};

type ConfigType = typeof appConfig;

const ids = [1, 2, 3];
const results: number[] = [];

function fetchData(id: number) {
  return Promise.resolve(id);
}

// 场景一：在 forEach 中处理异步逻辑
ids.forEach(async (id) => {
  const data = await fetchData(id); // 假设 fetchData 返回 Promise<number>
  results.push(data);
});

console.log(results); // 预期 [1,2,3]，但实际输出 []
