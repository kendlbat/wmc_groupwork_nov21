const Person = {
    firstName : "John",
    lastName  : "Doe",
    age       : 32,
    heightInCm: 185, 
    fullName  : function() {
        return this.firstName + " " +this.lastName;
    }
};

console.log(Person.fullName);