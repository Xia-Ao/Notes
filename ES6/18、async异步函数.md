# async异步函数

写在前面的话：async整体看完是非常强大的，解决了ES5中关于异步操作以及回调中比较麻烦的事情。一定抽空多看几次看，看一遍是很难记住的，最好能实现一下。

async顾名思义，就是异步执行机制。不得不拿出Generator进行对比。

```javascript
// Generator
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
 // async
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

在语法上，`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已。

真的只有这么简单吗，答案肯定不是啊，哪能会这么简单吗，前面说过Generator没有执行器，更像一个异步状态，需要使用co模块作为一个执行器，下面就是区别：

1）内置执行器。

Generator 函数的执行必须靠执行器，所以才有了`co`模块，而`async`函数自带执行器。也就是说`async`函数的执行，与普通函数一模一样，只要一行。里面的await状态执行完成之后就会计入吓一跳执行。

（2）更好的语义。

`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。并且await后面必须跟Promise对象，如果不是Promise，也会使用resolve转化为Promise。

（3）更广的适用性。

`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

（4）返回值是 Promise。

`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。

进一步说，`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。


## 基本用法与错误处理机制
async返回一个Promise对象，可以使用`then`方法添加回调函数。**当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句**。

async里面有一个return语法的时候，因为async返回的是一个Promise对象，return返回值会成为then方法回调函数的参数。
```javascript
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))  //return 返回值作为参数v传给then
// "hello world"
```
async函数返回的Promise对象状态变化：
`async`函数必须等到内部的异步操作执行完，才会执行`then`方法指定的回调函数，除非遇到return或者抛出错误。


### await命令

* `await`命令后面是一个 Promise 对象。如果不是，会被转成一个立即`resolve`的 Promise 对象。
* `await`命令后面的 Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到。
* 只要一个`await`语句后面的 Promise 变为`reject`，那么整个`async`函数都会中断执行。

如果要解决第三点，某个await执行reject，async中断的问题，有两种方法：

1、将await放到 `try...catch`中，不管这个是否执行成功，下一个await都会执行。如果有多个await命令，可以统一放在一个`try...catch`结构中。  
2、在 await后面的Promise对象后面跟一个catch方法，主力可能出现的错误。

### 注意点
1、await只能用子啊async函数中，用在普通函数中会报错。

2、多个await命令后面的一步操作，如果不存在继发关系，最好让他们同时触发。
```javascript
let foo = await getFoo();
let bar = await getBar();
 
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

## async自动执行原理
async主要里面有个spawn函数，就是自动执行器，不用像Generator一样每次使用next一步哟不执行。

```javascript
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

## 处理异步的三种方法对比
目前主力异步主要用的三种方法，Promise， Generator，async.

示例 [代码地址](http://es6.ruanyifeng.com/#docs/async) ，这里就不列出来了，结果肯定是async最简洁，符合语义，Generator主要是缺少一个自动执行器，而Promise需要使用then，catch的链式语法，显得十分复杂。

按照顺序执行异步操作。async的方法是使用for of遍历。


## 异步遍历器

### 异步遍历器的接口
异步遍历器`asyncIterator`就是调用遍历器的next方法，返回一个Promise对象。

异步遍历器的`next`方法是可以连续调用的，不必等到上一步产生的 Promise 对象`resolve`以后再调用。这种情况下，`next`方法会累积起来，自动按照每一步的顺序运行下去。

### for await...of

前面介绍过，`for...of`循环用于遍历同步的 Iterator 接口。新引入的`for await...of`循环，则是用于遍历异步的 Iterator 接口。

```javascript
async function f() {
  for await (const x of createAsyncIterable(['a', 'b'])) {
    console.log(x);
  }
}
// a
// b
```
`for await...of`循环也可以用于同步遍历器。

### 异步Generator函数


异步 Generator 函数的返回值是一个异步 Iterator，即每次调用它的`next`方法，会返回一个 Promise 对象，也就是说，跟在`yield`命令后面的，应该是一个 Promise 对象。如果像上面那个例子那样，`yield`命令后面是一个字符串，会被自动包装成一个 Promise 对象。

```javascript
function fetchRandom() {
  const url = 'https://www.random.org/decimal-fractions/'
    + '?num=1&dec=10&col=1&format=plain&rnd=new';
  return fetch(url);
}

async function* asyncGenerator() {
  console.log('Start');
  const result = await fetchRandom(); // (A)
  yield 'Result: ' + await result.text(); // (B)
  console.log('Done');
}

const ag = asyncGenerator();
ag.next().then(({value, done}) => {
  console.log(value);
})
```

上面代码中，`ag`是`asyncGenerator`函数返回的异步遍历器对象。调用`ag.next()`以后，上面代码的执行顺序如下。
1. `ag.next()`立刻返回一个 Promise 对象。
2. `asyncGenerator`函数开始执行，打印出`Start`。
3. `await`命令返回一个 Promise 对象，`asyncGenerator`函数停在这里。
4. A 处变成 fulfilled 状态，产生的值放入`result`变量，`asyncGenerator`函数继续往下执行。
5. 函数在 B 处的`yield`暂停执行，一旦`yield`命令取到值，`ag.next()`返回的那个 Promise 对象变成 fulfilled 状态。
6. `ag.next()`后面的`then`方法指定的回调函数开始执行。该回调函数的参数是一个对象`{value, done}`，其中`value`的值是`yield`命令后面的那个表达式的值，`done`的值是`false`。





























