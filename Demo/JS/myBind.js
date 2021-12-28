Function.prototype.myApply = function (context, args) {
  context = context || global;
  // 这里使用fn可能存在context已有对应属性，不严谨，可以使用Symbol对象生成唯一属性key
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
}

Function.prototype.myBind = function (context) {
  context = context || window;
  const self = this;
  let args = [...arguments].slice(1);
  console.log('args', args)
  return function () {
    return self.myApply(context, args.concat([...arguments]))
  };
}


const obj = {
  x: 42,
  getX: function () {
    return this.x;
  }
};

const unboundGetX = obj.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.myBind(obj);
console.log(boundGetX(22));
// expected output: 42