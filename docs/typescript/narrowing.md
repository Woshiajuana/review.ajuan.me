# 类型收窄

## typeof 类型守卫

- string
- number
- bigint
- boolean
- symbol
- undefined
- object
- function


## in 操作符收窄

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}
```

## instanceof

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}
```

## is 自定义类型守卫

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function isString (v: unknown): v is string {
  return typeof v === 'string'
} 
```

## as 断言函数