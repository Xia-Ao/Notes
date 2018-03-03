关Promise 的使用，在[《JavaScript Promise迷你书（中文版）》](http://liubin.org/promises-book/#what-is-promise)这本书里面讲解的非常的详细，这边就不在重复，下面只列出来一些比较重要的点和一些比较忽略的地方。

以为promise的知识在迷你书里面看过就记住了，过了一段时间之后发现好多又忘了，这里结合阮老师的[ES6-Promise](http://es6.ruanyifeng.com/#docs/promise) 重新将Promise的重点给总结一下，放到这篇文档里面，以后方便查阅。

### 2.6. 专栏: 每次调用then都会返回一个新创建的promise对象 {#then-return-new-promise}

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



