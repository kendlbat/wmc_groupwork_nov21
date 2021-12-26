let x = new String("John");
let y = new String("John");
if (x.valueOf() == y.valueOf()) console.log("x == y");
else console.log("x != y");
if (x.valueOf() === y.valueOf()) console.log("x === y");
else console.log("x !== y");