// function math(operation, x) {
//   const OPERATIONS = {
//     '*': (a, b) => a * b,
//     '/': (a, b) => a / b,
//     '+': (a, b) => a + b,
//     '-': (a, b) => a - b,
//   }

//   return function (y) {
//     return OPERATIONS[operation](x, y);
//   }
// }

// const mul = math("*", 5);
// const add = math("+", mul(2));

// console.log(typeof add);
// console.log(add(math("-", 25)(20)))

// function sum(...arguments) {
//   let answer = 0;
//   arguments.forEach((element) => {
//     const e = parseInt(element);
//     if (!isNaN(e)) {
//       answer += e;
//     }
//   });
//   return answer;
// }

// console.log(sum(1, 2, 3, 4, 5, 'a', NaN))

var bar = 4;

function foo(bar) {
  if (bar >= 5) {
    bar = "zzz";
  } else {
    let bar = "qux";
  }
  console.log(bar);
}

foo(2);
foo(6);
console.log(bar);