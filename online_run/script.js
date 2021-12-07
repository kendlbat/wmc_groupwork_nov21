var output = [];
var outputs = 0;

function runJavascriptInTextblock() {
    var textblock = document.getElementById('codeinput');
    var text = String(textblock.value);

    text = text.replace("console.log", "RES_printValue");

    eval(text);
}

function RES_printValue(value) {
    // Append value to output array
    // Update outputtext innerText
    // Print the number of times this function has been called so far on the left of the lines

    output.push("[" + outputs + "] " + value);

    if (output.length > 7) {
        output.shift();
    }

    var outputtext = document.getElementById('outputtext');
    outputtext.innerText = output.join("\n");

    outputs++;
}


