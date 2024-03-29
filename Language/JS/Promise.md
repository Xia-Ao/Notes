---
title: Promise.md
date: 2018-02-05 20:09:45
tags: JS
---
# Promise

关Promise
的使用，在[《JavaScript Promise迷你书（中文版）》](http://liubin.org/promises-book/#what-is-promise)这本书里面讲解的非常的详细，这边就不在重复，下面只列出来一些比较重要的点和一些比较忽略的地方。

以为promise的知识在迷你书里面看过就记住了，过了一段时间之后发现好多又忘了，这里结合阮老师的[ES6-Promise](http://es6.ruanyifeng.com/#docs/promise)对象重新将Promise的重点给总结一下，放到这篇文档里面，以后方便查阅。

## promise定义及特点

Promise
是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6
将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise
是一个对象，从它可以获取异步操作的消息。Promise 提供统一的
API，各种异步操作都可以用同样的方法进行处理。

`Promise`对象有以下两个特点。

（1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为
resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。`Promise`

也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## promise基本实例

创建promise对象的流程如下所示。

1. `new Promise(fn)`返回一个promise对象

2. 在`fn`中指定异步等处理

   * 处理结果正常的话，调用`resolve(处理结果值)`

   * 处理结果错误的话，调用`reject(Error对象)`

```js
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
// 运行示例
var URL = "http://httpbin.org/get";
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});
```

promise对象的处理过程只有两种情况， resolve和reject

![](/assets/promise-onFulfilled_onRejected.png)

有一种情况：p1和p2都是 Promise
的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

```js
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

对于这种情况，promise的解决方案是：这时`p1`的状态就会传递给`p2`，也就是说，`p1`的状态决定了`p2`的状态。如果`p1`的状态是`pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`resolved`或者`rejected`，那么`p2`的回调函数将会立刻执行。阮老师Promise对象里面有关于这种情况的一个例子。

#### promise结束状态
调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

### promise方法链

```js
var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .then(finalTask);
```

上面代码中的promise
chain的执行流程，如果用一张图来描述一下的话，像下面的图那样。  
![](/assets/promise-then-catch-flow.png)


如果Task A 处理中发生异常的话，会按照TaskA → onRejected → FinalTask
这个流程来进行处理。  
![](/assets/promise-taska-rejected-flow.png)

### finally()

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

### Promise.all()

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

上面代码中，`Promise.all`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是
Promise
实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为
Promise 实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有
Iterator 接口，且返回的每个成员都是 Promise 实例。）

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

> 注意事项：
>
> 1、如果作为参数的 Promise
> 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。
>
> 2、如果其中的某一个promise实例`p1或p2或p3`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法。

### Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的
Promise 实例的返回值，就传递给`p`的回调函数。

> 有时候设定了一个时间限制，如果规定时间内`p1 p2
> p3`都没有改变状态，那p的状态变成`reject`

### Promise.resolve()

`Promise.resolve`方法可以将现有对象转为 Promise 对象。

`Promise.resolve`方法的参数分成四种情况。

**（1）参数是一个 Promise 实例**

如果参数是 Promise
实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

**（2）参数是一个**`thenable`**对象**

`thenable`对象指的是具有`then`方法的对象，`Promise.resolve`方法会将这个对象转为
Promise 对象，然后就立即执行`thenable`对象的`then`方法。

**（3）参数不是具有**`then`**方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的
Promise 对象，状态为`resolved`。

**4）不带有任何参数**

`Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的
Promise 对象。

### promise的返回
专栏: 每次调用then都会返回一个新创建的promise对象 {#then-return-new-promise}

从代码上乍一看，`aPromise.then(...).catch(...)`像是针对最初的`aPromise`对象进行了一连串的方法链调用。

然而实际上不管是`then`还是`catch`方法调用，都返回了一个新的promise对象

```js
// 1: 对同一个promise对象同时调用 `then` 方法
var aPromise = new Promise(function (resolve) {
    resolve(100);
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    console.log("1: " + value); // => 100
})

// vs

// 2: 对 `then` 进行 promise chain 方式进行调用
var bPromise = new Promise(function (resolve) {
    resolve(100);
});
bPromise.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log("2: " + value); // => 100 * 2 * 2
});
```

### Promise.try\(\)

对于不知道或者不想区分的通过或者异步操作，但是想用promise处理，以前常用的方法有两种，一种是使用`async`函数，

```js
const f = () => console.log('now');
(async () => f())();  //同步
// (async () => f())().then(...)  //异步
console.log('next');
// now
// next
```

第二种写法是使用new Promise\(\)。

```js
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now
// next
```

所以提出一个提案，`Promise.try()`

```js
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
```



## 参考
[剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)