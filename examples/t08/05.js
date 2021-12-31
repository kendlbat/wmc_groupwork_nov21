class Car {
    constructor(name, year, colour) {
        this.name = name;
        this.year = year;
        this.colour = colour;
    }
    age() {
        let date = new Date();
        return date.getFullYear() - this.year;
    }
    setColour(colour) {
        this.colour = colour;
    }
}

let car1 = new Car("Audi", 2018, "red");
console.log(car1.age());
console.log(car1.colour);
car1.setColour("black");
console.log(car1.colour);