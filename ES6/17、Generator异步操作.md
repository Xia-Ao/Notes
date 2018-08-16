
# Generator 异步操作

## 异步封装
下面看看如何使用 Generator 函数，执行一个真实的异步任务。
```
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
```
上面代码中，Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了yield命令。

执行这段代码的方法如下。
```
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```
上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用next方法（第二行），执行异步任务的第一阶段。由于Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法。

可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。



## co语言源码分析
**co 函数库可以让你不用编写 Generator 函数的执行器。**  
[阮一峰-co语言分析](http://www.ruanyifeng.com/blog/2015/05/co.html)  
[源码地址](https://github.com/tj/co/blob/master/index.js)

co源码只有及时航，原理比较简单，主要思路就是传入一个 `Generator`,返回一个Promise对象
```javascript
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
  });
}
```

函数里面定了一个 `onFulfilled()`方法一直执行`next`方法，使用`try...catch...`方法补货可能执行next方法出现的错误。


```javascript
 function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }    
```

最关键的就是`next`方法，
1. 如果执行完了，返回
2. 将对象编程一个Promise对象
3. 判断： 如果是promise，执行next，如果转化之后还不是promise，reject出去并提示错误。
```javascript
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
});
```

里面有很多的**判断/转化**函数，这些判断的方法可以好好深入看一下，为什么要这样判断，这样判断可以吗，有没有实现同样功能的其他判断方法。
* `isPromise`
* `isGenerator`
* `isGeneratorFunction`
* `arrayToPromise`
* `objectToPromise`
* `thunkToPromise`
* `isObject`
* `toPromise`
