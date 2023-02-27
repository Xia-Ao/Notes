/**
 * 防抖，200ms内没有触发了，执行fn 
 * @param {*} fn 
 * @param {*} delayTime 
 */
function debounce(fn, delayTime) {
  let timer;
  return function (...args) {
    const _that = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null;
    }, delayTime);
  }
}

function fn(i) {
  console.log((new Date().getTime() - startTime) / 10);
}
const debounceFn = debounce(fn, 300);


let startTime;
function test() {
  let i = 0;
  startTime = new Date().getTime();
  const timer = setInterval(() => {
    i++;
    debounceFn(i)
  }, 10);

  setTimeout(() => {
    clearInterval(timer);
  }, 500)
}

test();