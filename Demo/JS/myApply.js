Function.prototype.myApply = function (context, args) {
  context = context || global;
  // 这里使用fn可能存在context已有对应属性，不严谨，可以使用Symbol对象生成唯一属性key
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
}

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.myApply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.myApply(null, numbers);

console.log(min);
// expected output: 2