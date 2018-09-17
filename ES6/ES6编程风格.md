# ES6编程风格

* 使用数组成员对变量赋值时，优先使用解构赋值。
* 函数的参数如果是对象的成员，优先使用解构赋值。
* 对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用`Object.assign`方法。
* 对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。

```javascript
var ref = 'some value';

// bad
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

* 使用扩展运算符`...`拷贝数组。
* 使用` Array.from `方法，将类似数组的对象转为数组。
* 立即执行函数可以写成箭头函数的形式。

 ```javascript
 (() => {
   console.log('Welcome to the Internet.');
 })();
 ```

* 不要在函数体内使用 arguments 变量，使用rest运算符（...）代替。
* 箭头函数取代`Function.prototype.bind`，不应再用self/_this/that 绑定 this。
* 使用默认值语法设置函数参数的默认值。


* 如果模块默认输出一个函数，函数名的首字母应该小写。
* 如果模块默认输出一个对象，对象名的首字母应该大写。

