function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait);
  }
}


console.time('debounce')
let fn = function () {
  console.log('函数被执行');
  console.timeEnd('debounce',)
}

let timer1 = setInterval(debounce(fn, 500, true), 10);
let timer2 = setTimeout(() => { clearInterval(timer1) }, 1000);