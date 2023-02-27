
function add(a, b, c) {
  return a + b + c;
}


function curry(fn, len = fn.length, ...params) {
  return function (...args) {
    const _args = [...params, ...args]
    if (_args.length >= len) {
      return fn.apply(this, _args);
    } else {
      return curry.call(this, fn, len, ..._args);
    }
  }
}


const curryA = curry(add);
console.log(curryA(1, 2, 3));
console.log(curryA(1)(2)(3));