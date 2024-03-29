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

## Json.stringify Json.parse实现

遍历对象，将对象转换为字符串，需要对 null boolean null undefined 特殊判断

```js
function jsonStringify(obj) {
  const type = typeof obj;
  if (type !== 'object' || obj === null) {
    if (/string|undefined/.test(type)) {
      obj = `"${obj}"`
    }
    return `${obj}`;
  } else {
    const isArr = Array.isArray(obj);
    const res = [];

    for (const key in obj) {
      let v = obj[key];
      const type = typeof v;
      if (/string|undefined/.test(type)) {
        v = `"${v}"`
      } else if (type === 'object') {
        v = jsonStringify(v);
      }
      res.push(`${isArr ? '' : `"${key}":`}${String(v)}`);
    }
    return `${isArr ? '[' : '{'}${String(res)}${isArr ? ']' : '}'}`
  }
}
```

通过递归的方式，将字符串转换为对象，其中null boolean undefined 需要转化为对应的值

```js
function jsonParse(jsonStr) {
  let i = 0;
  let curChar = jsonStr[i]

  // 步进器
  function next() {
    i += 1;
    curChar = jsonStr[i];
  }

  function parseValue() {
    switch (curChar) {
      case '"':
        return parseString()
      case "{":
        return parseObject();
      case '[':
        return parseArray();
      default:
        return parseOther();
    }
  }

  function parseString() {
    let str = '';
    next()
    while (jsonStr[i] !== '"') {
      str += jsonStr[i];
      i++;
    }
    next();
    return str === 'undefined' ? undefined : str;
  }

  function parseArray() {
    let arr = [];
    next();
    while (curChar !== ']') {
      arr.push(parseValue());
      if (curChar === ',') {
        // 跳过, 下一个
        next();
      }
    }
    next();
    return arr;
  }
  function parseObject() {
    let obj = {};
    next();
    while (curChar !== '}') {
      let key = parseString();
      next();
      let value = parseValue();
      obj[key] = value;
      if (curChar === ',') {
        // 跳过
        next();
      }
    }
    next();
    return obj;
  }
  function parseOther() {
    let str = '';
    while (curChar !== ',' && curChar !== ']' && curChar !== '}') {
      str += curChar;
      next();
    }
    if (!isNaN(str)) return Number(str);
    if (str === 'null') return null;
    if (str === 'true') return true;
    if (str === 'false') return false;
    return str;
  }

  return parseValue()
}
```