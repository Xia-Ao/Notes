// const urls = [
//   'https://img01.yzcdn.cn/upload_files/2021/11/30/Fqu72DfPGmYyqRzMWwQDtYVWz2iG.png',
//   'https://img01.yzcdn.cn/upload_files/2021/11/30/FvDLcro_xAmCWbVH4porfft6zonI.png',
//   'https://img01.yzcdn.cn/upload_files/2021/11/30/FnM-mP1mfIggWWFAKJNusWm1mlKz.png',
//   'https://img01.yzcdn.cn/upload_files/2021/11/23/FixGtb4CeBbW_3k6GLfP0hVhgRfp.png',
//   'https://img01.yzcdn.cn/upload_files/2021/11/23/Fm9oZBZJgdn2LI2COk5Ry7hhcMhV.png',
//   'https://img01.yzcdn.cn/upload_files/2021/11/23/Fvh0GfzNePBlKjGXB7onoJqekRN_.png',
//   'https://img01.yzcdn.cn/upload_files/2021/11/23/Fosi97bMcPb2SfxnoN8di72U7G8b.png',
//   'https://img01.yzcdn.cn/upload_files/2021/11/17/FpxGbdBBzOpa8uuQlGCo0-Ggo44K.png',
//   'https://img01.yzcdn.cn/upload_files/2021/11/17/FihbkMX1X3Q1YMFHyykZWd7X0T4k.png',
// ];

// function loadImg(url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => {
//       console.log('图片load完成')
//       resolve();
//     };
//     img.error = reject;
//     img.src = url;
//   });
// }

const urls = [1000, 2000, 1200, 500, 300, 700, 1300,];
function load(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('time执行', time)
      resolve();
    }, time);
  })
}

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

  // 循环塞
  (function loop() {
    let p = Promise.race(promises);
    for (let i = 0; i < sequence.length; i++) {
      p = p.then((res) => {
        promises[res] = handler(sequence[i]).then(() => {
          console.log('---', res)
          return res
        });
        return Promise.race(promises)
      })
    }
  })()
}
limitLoad(urls, load, 3);