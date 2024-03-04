
Array.prototype.myReduce = function (accFn, initialValue) {
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    acc = acc === undefined ? this[i] : accFn(acc, this[i], i, this)
  }
  return acc;
}

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = undefined;
const sumWithInitial = array1.myReduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10