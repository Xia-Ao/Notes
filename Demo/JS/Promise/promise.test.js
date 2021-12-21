const Promise = require('./Promise');
const fs = require('fs');

// 我们先用Promise包装下三个网络请求
// 请求成功时resolve这个Promise
function promise1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise1执行')
      // resolve(7878);
      reject(99)
    }, 1000)
  });
}


function promise2() {
  return new Promise((resolve, reject) => {
    fs.readFile('./promise.test.js', (err, data) => {
      console.log('promise2')
      if (err) reject(err);
      resolve('res2');
    })
  });
}

function promise3() {
  return new Promise((resolve, reject) => {
    fs.readFile('./PromiseExample', (err, data) => {
      console.log('promise3')
      if (err) reject(err);
      resolve('res3');
    })
  });
}




// 先发起request1，等他resolve后再发起request2，
// 然后是request3
// promise1().then((data) => {
//   console.log('res1--', data);
//   return promise2();
// })
//   // .catch(e => {
//   //   console.log('er1', e);
//   // })
//   .then((data) => {
//     console.log('res2--', data);
//     return promise3();
//   })
//   .then((data) => {
//     console.log('res3--', data);
//   })
//   .catch(e => {
//     console.log('error', e);
//   })

// all测试
// Promise.all([promise1(), promise2(), promise3()])
//   .then((res) => {
//     console.log('res', res)
//   })
//   .catch(e => { console.log('all catch', e) })

// race 测试
// Promise.race([promise1(), promise2(), promise3()])
//   .then((res) => {
//     console.log('res', res)
//   })
//   .catch(e => { console.log('all catch', e) })


// Promise.any([promise1(), promise2(), promise3()])
//   .then((res) => {
//     console.log('res', res)
//   })
//   .catch(e => { console.log('catch', e) })

// Promise.allSettled([promise1(), promise2(), promise3()])
//   .then((res) => {
//     console.log('res', res)
//   })
//   .catch(e => { console.log('catch', e) })


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