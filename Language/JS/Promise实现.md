# Promise 实现

## 实现Promise

在[Promises/A+](https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure)中，对`Promise`有非常详细的解释，照着步骤，编写`Promise`代码，

过程中为了简写，使用了ES6的 箭头函数。可以全部替换为ES5函数定义。

```javascript
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// Promise 构造函数 接收一个函数执行器
function Promise(executor) {
  let that = this;
  this.status = PENDING;
  this.data = undefined;

  // 使用数组处理promise.then回调函数集，
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULFILLED;
      that.data = value;
      //处理程序
      that.resolvedCallbacks.forEach(cb => cb(that.data));
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.data = reason;
      that.rejectedCallbacks.forEach(cb => cb(that.data));
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)  // 如果发生错误，使用reject传出
  }
}

/**
 * Promise 解决程序
 * 参考：https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 */
function resolvePromise(promise, x, resolve, reject) {
  // If promise and x refer to the same object, reject promise with a TypeError as the reason.
  if (promise === x) {
    return reject(new TypeError('promise and return value should not be same object'));
  }
  // x 是 promise
  if (x instanceof Promise) {
    x.then((y) => resolvePromise(promise, y, resolve, reject), reject);
  } else if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
    // if x is an object or function
    let then;
    try {
      then = x.then
    } catch (e) {
      // 如果取x.then出错，直接reject
      return reject(e);
    }
    // 如果then是一个function
    if (typeof then === 'function') {
      // 如果同时调用了 resolvePromise 和 rejectPromise，或者对同一个参数进行了多次调用，则第一个调用优先，任何进一步的调用都将被忽略
      // 因此使用一个flag called 来判断是否调用过
      let called = false;
      // 将 x 作为函数的作用域 this 调用
      // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
      try {
        then.call(x, (y) => {
          if (called) return
          called = true;
          resolvePromise(promise, y, resolve, reject);
        }, (r) => {
          if (called) return
          called = true;
          reject(r);
        });
      } catch (e) {
        if (called) return
        reject(e);
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

/**
 * 原型方法then方法接收两个参数，onFulfilled，onRejected，分别为Promise成功或失败后的回调，then返回一个promise
 * @param {*} onFulfilled 
 * @param {*} onRejected 
 * @returns 
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
  // 校验 参数
  const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };


  let that = this;
  let promise2;

  // 对状态进行处理
  if (that.status === FULFILLED) {
    promise2 = new Promise((resolve, reject) => {
      // 使用setTimeOut的原因是根据 Promise/A+ Notes 说明：要确保 onFulfilled onRejected在then之后异步执行，需要使用 宏任务/微任务机制 来实现， 在不同的平台上，可以采用不同的
      // https://github.com/promises-aplus/promises-spec#notes
      setTimeout(() => {
        try {
          if (typeof onFulfilled !== 'function') {
            resolve(that.data);
          } else {
            const x = realOnFulfilled(that.data);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (e) {
          reject(e)       // 如果出错，则使用reject()将错处传出
        }
      }, 0)
    })
  }

  if (that.status === REJECTED) {
    promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (typeof onRejected !== 'function') {
            reject(that.data);
          } else {
            const x = realOnRejected(this.data);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (e) {
          reject(e) // 如果出错，则使用reject()将错处传出
        }
      }, 0)
    })
  }

  // 如果当前的Promise还处于pending状态，我们并不能确定调用onFulfilled还是onRejected，只能等到Promise的状态确定后，才能确实如何处理。
  // 所以我们需要把我们的两种情况的处理逻辑做为callback放入this/that的回调数组里
  if (that.status === PENDING) {
    promise2 = new Promise((resolve, reject) => {
      that.resolvedCallbacks.push(() => {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(that.data);
            } else {
              const x = realOnFulfilled(this.data);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e)       // 如果出错，则使用reject()将错处传出
          }
        }, 0)
      });
      that.rejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(that.data);
            } else {
              const x = realOnRejected(this.data);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e) // 如果出错，则使用reject()将错处传出
          }
        }, 0)
      })
    })
  }
  return promise2;
};

// 定义一个catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
};

Promise.prototype.finally = function (cb) {
  return this.then(
    (value) => Promise.resolve(cb()).then(() => value),
    (error) => Promise.resolve(cb()).then(() => { throw error })
  );
}

Promise.resolve = function (params) {
  if (params instanceof Promise) return params;
  return new Promise((resolve) => {
    resolve(params)
  })
}

Promise.reject = function (params) {
  if (params instanceof Promise) return params;
  return new Promise((reject) => {
    reject(params)
  })
}

Promise.all = function (promiseList) {
  return new Promise((resolve, reject) => {
    const len = promiseList.length;
    let count = 0;
    let resList = [];
    if (len === 0) resolve(resList);

    promiseList.forEach((p, index) => {
      Promise.resolve(p).then(
        (res) => {
          resList[index] = res;
          count++;
          if (count === len) {
            resolve(resList);
          }
        },
        (e) => reject(e));
    })
  })
}

Promise.race = function (promiseList) {
  return new Promise((resolve, reject) => {
    if (promiseList.length === 0) resolve();

    promiseList.forEach((p) => {
      Promise.resolve(p).then((res) => resolve(res), (e) => reject(e));
    })
  })

}

Promise.allSettled = function (promiseList) {
  return new Promise((resolve, reject) => {
    const len = promiseList.length;
    let count = 0;
    let resList = [];
    if (len === 0) resolve(resList);

    promiseList.forEach((p, index) => {
      Promise.resolve(p).then(
        (res) => {
          resList[index] = {
            status: 'fulfilled',
            value: res
          };
          count++;
          if (count === len) {
            return resolve(resList);
          }
        },
        (e) => {
          resList[index] = {
            status: 'rejected',
            reason: e
          };
          count++;
          if (count === len) {
            return resolve(resList);
          }
        });
    })
  })
}

Promise.any = function (promiseList) {
  return new Promise((resolve, reject) => {
    const len = promiseList.length;
    let count = 0;
    let resList = [];
    if (len === 0) resolve(resList);

    promiseList.forEach((p, index) => {
      Promise.resolve(p).then(
        (res) => resolve(res),
        (e) => {
          resList[index] = e;
          count++;
          if (count === len) {
            reject(resList);
          }
        });
    })
  })
}


// 补充一个deferred 用来做 promises-aplus-tests 测试
Promise.deferred = function () {
  let result = {};
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}

module.exports = Promise;
```

## 测试

使用[Promises/A+ Compliance Test Suite](https://github.com/promises-aplus/promises-tests)的测试用例，全部测试通过。

具体代码地址：


## 参考
- [Promises/A+](https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure)
- [手写一个Promise/A+,完美通过官方872个测试用例](https://juejin.cn/post/6844904116913700877#heading-19)
- [Promises/A+ Compliance Test Suite](https://github.com/promises-aplus/promises-tests)