# 配置文件 tsconfig

## noImplicitAny

默认情况下，当不指定类型，并且 TypeScript 无法从上下文中推断类型时，编辑器通常会默认使用 any
启用 noImplicitAny 标志后，任何类型被隐式推断为 any 变量都会报错

## strictNullChecks

默认情况下， null 和 undefined 等值可以赋值给任何其他类型。strictNullChecks 标志使 null 和 undefined undefined 更加明确，也让我们不必担心是否忘记处理 null 