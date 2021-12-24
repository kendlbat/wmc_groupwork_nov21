const Person = {
    firstName: "John",
    lastName : "Doe",
    age      : 25
}

var text = "";
for (let x in Person) {
    text += Person[x] +" ";
}
console.log(text);