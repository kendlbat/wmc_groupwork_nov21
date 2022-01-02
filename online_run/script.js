var output = [];
var outputs = 0;
var outmax = 7;
var ignorestorage = false;

var autobrackets = localStorage.getItem("autobrackets");
if (autobrackets == null) {
    autobrackets = "true";
}
localStorage.setItem("autobrackets", autobrackets)

console.log("SCRIPT LOADED");

async function execJSText() {
    var textblock = document.getElementById('codeinput');
    var text = String(textblock.value);

    // replace all occurences of "console.log" with "RES_printValue
    text = text.replace(/console.log/g, "RES_printValue");

    try {
        eval(text);
    } catch (error) {
        RES_printValue(error);
    }
}

function runJavascriptInTextblock() {
    // This functions purpose is to keep the button from loading indefinitely, as it would normally wait for execution to finish
    execJSText();
}

// value has to be string
function RES_printValue(value) {
    // Append value to output array
    // Update outputtext innerText
    // Print the number of times this function has been called so far on the left of the lines

    output.push("[" + outputs + "] " + value);

    if (output.length > outmax) {
        output.shift();
    }

    var outputtext = document.getElementById('outputtext');
    var outputdiv = document.getElementById('output');

    if (!outputdiv.classList.contains("shown")) {
        outputdiv.classList.add("shown");
    }
    outputdiv.scrollTop = outputdiv.scrollHeight;

    outputtext.innerText = output.join("\n");

    outputs++;
}

function loadFile() {
    var fileinput = document.getElementById('file-loader');
    fileinput.click();

    fileinput.onchange = function () {
        var file = fileinput.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var textblock = document.getElementById('codeinput');
            textblock.value = e.target.result.trimStart().replace(/\t/g, "    ");
        }

        reader.readAsText(file);
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function saveFile() {
    // get the text from the textarea and save it to a file
    var textblock = document.getElementById('codeinput');
    var text = textblock.value;
    download("code.js", text);

}

function parseParams() {
    var urlParams = new URLSearchParams(window.location.search);
    var embed = urlParams.get('embed');

    if (embed == "true" || embed == "1") {
        var fileoptions = document.getElementsByClassName('fileoptions');
        for (var i = 0; i < fileoptions.length; i++) {
            fileoptions[i].classList.add("nodisplay");
        }

        document.body.classList.add("embed");
    }

    var filename = urlParams.get('file');
    if (filename != null) {
        ignorestorage = true;
        filename = filename.replace("-", "/") + ".js";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var textblock = document.getElementById('codeinput');
                textblock.value = this.responseText.trimStart();
            }
        };
        xhttp.open("GET", "/examples/" + filename, true);
        xhttp.send();
    }

    var outlines = urlParams.get('outlines');
    if (outlines != null) {
        outmax = parseInt(outlines);
    }

    var disabled = urlParams.get('disabled');
    if (disabled == "1" || disabled == "true") {
        document.getElementById('codeinput').disabled = true;
    }
}

function showOutput() {
    document.getElementById('output').classList.toggle('shown');
    // if the output is shown, scroll to the bottom
    if (document.getElementById('output').classList.contains("shown")) {
        document.getElementById('outputtext').scrollTop = document.getElementById('outputtext').scrollHeight;
    }

}

parseParams();
document.getElementById("runbtn").onclick = runJavascriptInTextblock;

document.body.onkeydown = function (e) {
    if (e.ctrlKey && e.key == "s") {
        e.preventDefault()
        saveFile()
    }
}

document.getElementById("codeinput").onkeydown = function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
    }

    if (e.key == "Backspace") {
        var start = this.selectionStart;
        var end = this.selectionEnd;

        if (start == end) {
            if (this.value.substring(start - 4, start) == "    ") {
                this.value = this.value.substring(0, start - 4) + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start - 4;
            }
        }

        // If the user has removed a { and there is a } after it, remove the }
        if (this.value.substring(start - 1, start) == "{" && this.value.substring(end, end + 1) == "}") {
            this.value = this.value.substring(0, start - 1) + this.value.substring(end + 1);
            this.selectionStart = this.selectionEnd = start - 1;
        }

        // If the user has removed a ( and there is a ) after it, remove the )
        if (this.value.substring(start - 1, start) == "(" && this.value.substring(end, end + 1) == ")") {
            this.value = this.value.substring(0, start - 1) + this.value.substring(end + 1);
            this.selectionStart = this.selectionEnd = start - 1;
        }

        // If the user has removed a [ and there is a ] after it, remove the ]
        if (this.value.substring(start - 1, start) == "[" && this.value.substring(end, end + 1) == "]") {
            this.value = this.value.substring(0, start - 1) + this.value.substring(end + 1);
            this.selectionStart = this.selectionEnd = start - 1;
        }

        // If the user has removed a " and there is a " after it, remove the "
        if (this.value.substring(start - 1, start) == "\"" && this.value.substring(end, end + 1) == "\"") {
            this.value = this.value.substring(0, start - 1) + this.value.substring(end + 1);
            this.selectionStart = this.selectionEnd = start - 1;
        }

        // If the user has removed a ' and there is a ' after it, remove the '
        if (this.value.substring(start - 1, start) == "'" && this.value.substring(end, end + 1) == "'") {
            this.value = this.value.substring(0, start - 1) + this.value.substring(end + 1);
            this.selectionStart = this.selectionEnd = start - 1;
        }
    }

    if (autobrackets == "true") {
        // when { is pressed, insert } after the cursor
        if (e.key == "{") {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "{}" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }

        // when ( is pressed, insert ) after the cursor
        if (e.key == "(") {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "()" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }

        // when [ is pressed, insert ] after the cursor
        if (e.key == "[") {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "[]" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }

        // when " is pressed, insert " after the cursor
        if (e.key == "\"") {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "\"\"" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }

        // when ' is pressed, insert ' after the cursor
        if (e.key == "'") {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "''" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }

        if (e.key == "F5") {
            e.preventDefault();
            runJavascriptInTextblock();
        }
    }
}

window.onbeforeunload = function () {
    if (!ignorestorage) {
        var textblock = document.getElementById('codeinput');
        localStorage.setItem("codeinput", textblock.value);
    }
}

// when the page is loaded, load the code from the local storage
window.onload = function () {
    if (!ignorestorage) {
        var codeinput = localStorage.getItem("codeinput");
        if (codeinput != null) {
            document.getElementById('codeinput').value = codeinput;
        }
    }
}

function resetTextarea() {
    // Prompt the user to confirm
    if (confirm("Are you sure you want to reset the code?")) {
        document.getElementById('codeinput').value = "";
        localStorage.removeItem("codeinput");
    }
}

function updateDivHeight() {
    let value = String(window.innerHeight - document.getElementById("options").offsetHeight - 40) + "px";
    document.getElementById("codeindiv").style.height = value;
}

document.body.onresize = function () {
    updateDivHeight();
}

updateDivHeight();
