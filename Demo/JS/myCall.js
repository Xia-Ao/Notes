

Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  // 这里使用fn可能存在context已有对应属性，不严谨，可以使用Symbol对象生成唯一属性key
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
}

Function.prototype.myApply = function (context, args) {
  context = context || window;
  // 这里使用fn可能存在context已有对应属性，不严谨，可以使用Symbol对象生成唯一属性key
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
}

// test 
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats',
  sleepDuration: '12 and 16 hours'
};
greet.myCall(obj);  // cats typically sleep 

// 使用 call 方法调用函数并且不指定第一个参数
var sData = 'Wisen';
console.log(global);
function display() {
  console.log('sData value is %s ', this.sData);
}

display.myCall();  // sData value is Wisen

// function Product(name, price) {
//   this.name = name;
//   this.price = price;
// }

// function Food(name, price) {
//   Product.myCall(this, name, price);
//   this.category = 'food';
// }

// console.log(new Food('cheese', 5).name);



// function Toy(name, price) {
//   Product.call(this, name, price);
//   this.category = 'toy';
// }

// var cheese = new Food('feta', 5);
// var fun = new Toy('robot', 40);
// console.log(cheese)
// console.log(fun)