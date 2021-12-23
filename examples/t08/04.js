const test = 5;

const testObject = {
    testVar     : 3,
    testVar1    : 5,
    testVar2    : "John",
    testVar3    : "Doe",
    testFunction: function(testVar) {
        this.testVar += " + " +testVar +" = " +this.sum(this.testVar, testVar);
        console.log(this.testVar);
    },
    sum         : function(var1, var2) {
        return var1 + var2;
    }
}

testObject.testFunction(test);