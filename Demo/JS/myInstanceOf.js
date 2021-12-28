function myInstanceOf(obj, constructor) {
  // let proto = Object.getPrototypeOf(obj);
  let proto = obj.__proto__;
  while (proto) {
    if (proto === constructor.prototype) {
      return true
    }
    // proto = Object.getPrototypeOf(proto);
    proto = proto.__proto__;
  }
  return false;
}

// TEST
function a() {}
const r = /1/g;

// console.log(myInstanceOf(a, Function))
// console.log(myInstanceOf(r, RegExp))
// console.log(myInstanceOf(a, RegExp))

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car("Honda", "Accord", 1998);
console.log(myInstanceOf(mycar, Car))
console.log(myInstanceOf(mycar, Object)) // t
console.log(myInstanceOf(mycar, Function))