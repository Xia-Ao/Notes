# Promise 实战 以及常用场景

## 手写Promise

一开始不知道如何上手，深入想一想Promise的原理就知道， Promise的状态有三种，Pending、 resolve、 reject 实现这三个状态就好，然后Promise原型上有一个then方法，其他方法先不管。

```js
// Promise 构造函数
function Promise(executor) {
    let self = this;
    self.status = 'pending';
    self.data = undefined;

    // 使用数组处理promise.then回调函数集，
    self.resolvedCallback = [];
    self.rejectedCallback = [];

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
            //处理程序
            self.resolvedCallback.forEach((fn) => fn(value))
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
            self.rejectedCallback.forEach((fn) => fn(reason))
        }
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)  // 如果发生错误，使用reject传出
    }
}

//Promise原型then方法
// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function (onFufiled, onRejected) {
    let self = this;
    let promise2;

    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onFufiled = typeof onFufiled === 'function' ? onFufiled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => reason;

    // 对状态进行处理
    if (self.status === 'resolved') {
        return promise2 = new Promise((resolve, reject) => {
            try {
                let temp = onFufiled(self.data);
                if (temp instanceof Promise) {   // 如果then方法传入的还是promise，则继续使用then方法链式处理
                    temp.then(resolve, reject)
                } else {
                    resolve(temp);      // 否则，使用resolve将值传出，因为前面对temp进行过处理
                }
            } catch (e) {
                reject(e)       // 如果出错，则使用reject()将错处传出
            }
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            try {
                let temp = onRejected(self.data);
                if (temp instanceof Promise) {   // 如果then方法传入的还是promise，则继续使用then方法链式处理
                    temp.then(resolve, reject)
                }                           // 这里不用再调用resolve，因为已经是失败的调用，只需要使用reject传出失败结果
            } catch (e) {
                reject(e)       // 如果出错，则使用reject()将错处传出
            }
        })
    }

    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    if (self.status === 'pending') {
        return promise2 = new Promise((resolve, reject) => {
            self.resolvedCallback.push((value) => {
                try {
                    let temp = onFufiled(self.data);
                    if (temp instanceof Promise) {   // 如果then方法传入的还是promise，则继续使用then方法链式处理
                        temp.then(resolve, reject)
                    } else {
                        resolve(temp);      // 否则，使用resolve将值传出，因为前面对temp进行过处理
                    }
                } catch (e) {
                    reject(e)       // 如果出错，则使用reject()将错处传出
                }
            });
            self.rejectedCallback.push((reason) => {
                try {
                    let temp = onRejected(self.data);
                    if (temp instanceof Promise) {   // 如果then方法传入的还是promise，则继续使用then方法链式处理
                        temp.then(resolve, reject)
                    }                           // 这里不用再调用resolve，因为已经是失败的调用，只需要使用reject传出失败结果
                } catch (e) {
                    reject(e)       // 如果出错，则使用reject()将错处传出
                }
            })
        })

    }
};

// 定义一个catch方法
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
};
module.exports = Promise;
```

调用实例

```js
let promise = new Promise(function (resolve, reject) {
    if (true) {
        setTimeout(function () {
            console.log('2s')
            resolve('this is resolve result timeout 2s');
        }, 2000)
    } else {
        reject('this reject')
    }
});

promise.then(function (data) {
    console.log('data:', data)
}, function (err) {
    console.log('err:', err)
}).catch((e)=>{
    debugger
})
    .then(()=>{
        return new Promise((res,rej)=>{
            setTimeout(function () {
                console.log('4s')
                res('this is resolve result timeout 4s');
            }, 2000)
        })
    })
    .then(()=>console.log(333))
    .then(()=>console.log(444))
    
// 2s
// data: this is resolve result timeout 2s
// 4s
// 333
// 444    
```

## Promise 实现串行

要求： 有一组异步请求 `apis = [ url1, url2, url3, ...]`, 用Promise的方式实现串行调用。

这个场景和`tapable`的 异步串行 类似，使用方式就是`p.then().then()...`， 核心是在`thenable`里面返回一个新的`promise`，这样就能一直执行。

```js
const p = Promise.resolve();
apis.forEach(api => {
    p = p.then(fetch(api));
}});

p.then(res1).then(res2)...
```

通过reduce实现

```js
const p = apis.reduce((promise,api) => promise.then(fetch(api)),Promise.resolve())
```

## Promise 并发缓存

场景：现有一批相同的并发查询请求，希望只查询一次SQL，期间的请求走缓存，使用promise怎么实现。

## promise 并发排队

场景：有多个图片资源的url，已经存储在数组`urls`中，而且已经有一个函数`loadImg`，输入一个`url`链接，返回一个 `Promise`，该`Promise`在图片下载完成的时候`resolve`，下载失败则`reject`。任意时刻，同时下载的链接数量不可以超过3个,使用最快的速度将图片下载完毕。

```js
const urls = [
  'https://img01.yzcdn.cn/upload_files/2021/11/30/Fqu72DfPGmYyqRzMWwQDtYVWz2iG.png',
  'https://img01.yzcdn.cn/upload_files/2021/11/30/FvDLcro_xAmCWbVH4porfft6zonI.png',
  'https://img01.yzcdn.cn/upload_files/2021/11/30/FnM-mP1mfIggWWFAKJNusWm1mlKz.png',
  'https://img01.yzcdn.cn/upload_files/2021/11/23/FixGtb4CeBbW_3k6GLfP0hVhgRfp.png',
  'https://img01.yzcdn.cn/upload_files/2021/11/23/Fm9oZBZJgdn2LI2COk5Ry7hhcMhV.png',
  'https://img01.yzcdn.cn/upload_files/2021/11/23/Fvh0GfzNePBlKjGXB7onoJqekRN_.png',
  'https://img01.yzcdn.cn/upload_files/2021/11/23/Fosi97bMcPb2SfxnoN8di72U7G8b.png',
  'https://img01.yzcdn.cn/upload_files/2021/11/17/FpxGbdBBzOpa8uuQlGCo0-Ggo44K.png',
  'https://img01.yzcdn.cn/upload_files/2021/11/17/FihbkMX1X3Q1YMFHyykZWd7X0T4k.png',
  ];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>{
      console.log('图片load完成')
      resolve();
    };
    img.error = reject;
    img.src = url;
  });
} 
```

实现如下， 关键点在于使用了`Promise.race()`检测哪一个最先执行完，执行完饭回一个promise，使用链式调用将剩下的串起来

```js
function limitLoad(urls, handler, limit) {
  // 对数组做一个拷贝
  const sequence = [].concat(urls)
  let promises = [];

  // 首先并发请求到最大数
  promises = sequence.splice(0, limit).map((url, index) => {
    // 这里返回的 index 是任务在 promises 的脚标，
    //用于在 Promise.race 之后找到完成的任务脚标
    return handler(url).then(() => {
      return index
    });
  });

  // 循环检查
  (function loop() {
    let p = Promise.race(promises);
    for (let i = 0; i < sequence.length; i++) {
      // promise 链式调用串起来
      p = p.then((res) => {
        promises[res] = handler(sequence[i]).then(() => {
          return res
        });
        return Promise.race(promises)
      })
    }
  })()
}
limitLoad(urls, loadImg, 3)
```

因此，基于这种场景（排队并发）,我们可以设计一个通用的方法。
https://blog.51cto.com/u_15283585/2955466

```js

```

## Promise 错误捕获

下面这段代码会如何输出：

```js
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0)
});
promise.then(function (value) { console.log(value) });
```

在`resolve`之后,`promise`的状态已经结束了，因为错误在`setTimeout`，属于下一次的事件循环，所以这里会被抛出，不会被`promise`吃掉。因此输出结果是

```js
// ok
// Uncaught Error: test
```
