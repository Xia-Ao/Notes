# 实现一些常用的方法

## 实现 bind apply call 方法

### 实现call

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  // 这里使用fn可能存在context已有对应属性，不严谨，可以使用Symbol对象生成唯一属性key
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
}
```

### 实现apply

```js
Function.prototype.myApply = function (context, args) {
  context = context || global;
  // 这里使用fn可能存在context已有对应属性，不严谨，可以使用Symbol对象生成唯一属性key
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
}
```

### 实现bind

bind 返回一个原函数的拷贝，并拥有指定的`this`值和初始参数。

因此需要存储一下 初始参数，调用的时候，将初始参数和传入的参数合并

```js
Function.prototype.myBind = function (context) {
  context = context || window;
  const self = this;
  let args = [...arguments].slice(1);
  console.log('args', args)
  return function () {
    return self.myApply(context, args.concat([...arguments]))
  };
}
```

测试方法可以参考[DEMO/JS]()


## instanceOf 实现

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```js
function myInstanceOf(obj, constructor) {
  let proto = Object.getPrototypeOf(obj);
  // 也可以使用__proto__
  // let proto = obj.__proto__;
  while (proto) {
    if (proto === constructor.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto);
    // proto = proto.__proto__;
  }
  return false;
}
```
