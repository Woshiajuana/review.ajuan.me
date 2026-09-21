# 基础

## var、let、const 三者定义变量的区别

- var 声明的变量会被提升，没有块级作用域
- let、const 声明的变量不会被提升，且具有块级作用域
- let、const 重复声明变量会报错
- let、const 声明的变量不会绑定全局作用域
- const 用于声明常量，一旦被赋值就不能再被修改

## 箭头函数

- 没有 this，需要通过查找作用域来确定 this 的值
- 不支持 bind 、call、apply 绑定 this
- 没有 arguments 对象
- 不能通过 new 关键字调用，没有 new.target
- 没有原型，没有 super

```
function Person(name) {
  console.log('new.target => ', new.target)
}
```
