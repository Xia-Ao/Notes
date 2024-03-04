/**
 * 并发排队
 */
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

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('图片load完成')
      resolve();
    };
    img.error = reject;
    img.src = url;
  });
}

const urls = [1000, 5000, 1200, 500, 300, 700, 1300];
function load(time) {
  return new Promise((resolve, reject) => {
    console.log('等待执行', time)
    setTimeout(() => {
      resolve(`${time}done`);
      console.log('执行完成--', time)
    }, time);
  })
}

function limitLoad(urls, handler, limit) {
  const seq = [...urls];
  let promises = [];
  const resList = [];

  // 初始化limit个任务
  promises = seq.splice(0, limit).map((url, index) => {
    return handler(url).then((res) => {
      resList[index] = res;
      return index
    });
  })

  // 循环执行剩下的
  return seq.reduce((last, url, i) => {
    return last.then((doneIndex) => {
      promises[doneIndex] = handler(url).then((res) => {
        resList[i + 3] = res;
        return doneIndex
      })
      if (i === seq.length - 1) {
        return Promise.all(promises).then(() => resList);
      }
      return Promise.race(promises)
    })
  }, Promise.race(promises))

}
limitLoad(urls, load, 3).then((res) => {
  console.log('res--', res);
})



/**
 * 并发缓存
 */
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

// for (let i = 0; i < 10; i++) {
//   SQL().then((res) => {
//     console.log(res);
//   });
// }
