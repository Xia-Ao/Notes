# Promise 实战 以及常用场景

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

```js
const sqlResult = 'sql result';
let cacheDate = '';
let cachePromise = null;
function SQL() {
  if (cacheDate) return cacheDate;
  if (cachePromise) return cachePromise;
  cachePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('只执行一次');
      resolve(sqlResult);
      cacheDate = sqlResult;
      cachePromise = null;
    }, 1000);
  });

  return cachePromise;
}

for (let i = 0; i < 10; i++) {
  SQL().then((res) => {
    console.log(res);
  });
}

```

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

## Promise的微任务

```js
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
```


## 参考

- [从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469#heading-31)
- [Promise 面试题，你能做对几道](https://leetcode-cn.com/circle/discuss/sQXY3u/)