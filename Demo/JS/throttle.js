// 
/**
 * 节流 200ms内多次触发 只执行一次
 * 定时器方式
 * @param {*} fn 
 * @param {*} time 
 * @returns 
 */
// function throttle(fn, time) {
//   let timer;
//   return function () {
//     const args = arguments;
//     const _that = this;
//     if (timer) return;
//     timer = setTimeout(() => {
//       fn.apply(_that, args);
//       timer = null;
//     }, time);
//   }
// }

/**
 * 时间戳方式
 */
function throttle(fn, time) {
  let timer;
  let startTime = new Date().getTime();
  return function () {
    const _that = this;
    const args = arguments;
    if (timer) clearTimeout(timer);
    if (new Date().getTime() - startTime < time) {
      // 处理最后一次
      timer = setTimeout(() => {
        fn.apply(_that, args);
        timer = null
      }, time)
      return;
    }
    startTime = new Date().getTime();
    fn.apply(_that, args);
  }
}


function fn(i) {
  console.log(i);
}

const throttleFn = throttle(fn, 100);


function test() {
  let i = 0;
  const timer = setInterval(() => {
    i++;
    throttleFn(i);
  }, 10);

  setTimeout(() => {
    clearInterval(timer);
  }, 1000)

}

test();
