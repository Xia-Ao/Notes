---
title: JavaScript遍历方法对比以及适用对象.md
date: 2018-03-25 22:24:40
tags: JS
---

# JS遍历方法

## for遍历方法

### for循环
语法：

```js
for(let i=0; i < length; i++){ 代码}
```

说明：因为String对象具有length属性，所以可以直接使用String.length进行遍历

适用对象：
- Array
- String

### for in

语法：
```js
for( let index in对象){ 在此执行代码}
```
说明：`for in` 遍历的是key值

使用对象：
- Array 
- String  
- Object

### [for of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
语法：
```js
for(let value of 对象){ 在此执行代码}
```
说明：for of遍历的value值
只要具有遍历器接口**Iterator**，都可以使用for of 遍历。

使用对象：
- Array
- String
- NodeList
- Set
- Map
- 类数组

#### for in 与for of 区别

1. 推荐在循环对象属性的时候，使用`for...in`,在遍历数组的时候的时候使用`for...of`。
2.  `for...in`循环出的是key，`for...of`循环出的是value
3. 注意，`for...of`是ES6新引入的特性。修复了ES5引入的`for...in`的不足
4.  `for...of`不能循环普通的对象，需要通过和`Object.keys()`搭配使用
5. `for...in`的不足在于作用于数组的`for-in`循环除了遍历数组元素以外,**还会遍历自定义属性**。`for...of`循环不会循环对象的key，只会循环出数组的value，因此`for...of`不能循环遍历普通对象,对普通对象的属性遍历推荐使用`for...in`
```js
var arr= [1,2,3]
arr.name='jack'     
for(var key in arr){
    console.log(arr[key])
}
// 1 2 3 jack
```
## Array遍历

- 普通循环
- for in
- for of
- forEach
- map
- from
- filter
- some
- every

以及其他数组遍历方法。

## String遍历
- 普通for循环
- for in
- for of
- 一种变换的方法，使用split将字符串切割为字符串数组，再对数组进行遍历。

## Object遍历

除了前面写到的`for in`遍历Object对象，还有以下几种方法对Object进行遍历

### [Object.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)


语法：

```js
Object.keys(obj)   //个表示给定对象的所有可枚举属性的字符串数组。
// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]
```
说明：Object.keys返回一个由key值组成的**可枚举属性的字符串数组**，再对数组进行遍历既可以遍历Object

### [Object.getOwnPropertyNames](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

语法：

```js
Object.getOwnPropertyNames(obj)  //在给定对象上找到的属性对应的字符串数组。
```

说明：返回一个**数组**，该数组对元素是 obj自身拥有的**枚举或不可枚举属性名称字符串**


### [Object.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

语法：

```js
Object.values(obj)  //一个包含对象自身的所有可枚举属性值的数组。、
//示例  随机键值的类数组对象
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']
```  

说明：Object.values()返回一个**数组**，其元素是在对象上找到的**可枚举属性值**。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。

### Object.entries()

语法：

```js
Object.entries(obj)  //给定对象自身可枚举属性的键值对数组。
//示例
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```  

说明：Object.entries()返回一个数组，其元素是与直接在object上找到的**可枚举属性键值对相对应的数组**。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。




## 参考：
- [JavaScript如何遍历Object](https://huixisheng.github.io/object-loop/)