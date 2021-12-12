function input(hint, placeholder="") {
    return prompt(hint, placeholder);
}

function output(text) {
    return alert(text);
}

class pre {
    constructor() {
        this.input = input;
        this.output = output;
    }
}