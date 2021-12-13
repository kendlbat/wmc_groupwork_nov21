var output = [];
var outputs = 0;
var outmax = 7;

console.log("SCRIPT LOADED");

async function execJSText() {
    var textblock = document.getElementById('codeinput');
    var text = String(textblock.value);

    // replace all occurences of "console.log" with "RES_printValue
    text = text.replace(/console.log/g, "RES_printValue");

    console.log(text);

    try {
        eval(text);
    } catch (error) {
        RES_printValue(error);
    }
}

function runJavascriptInTextblock() {
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

    outputtext.innerText = output.join("\n");

    outputs++;
}

function loadFile() {
    var fileinput = document.getElementById('file-loader');
    fileinput.click();

    fileinput.onchange = function() {
        var file = fileinput.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var textblock = document.getElementById('codeinput');
            textblock.value = e.target.result.trimStart();
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
        document.getElementById('fileoptions').classList.add("nodisplay");
        document.body.classList.add("embed");
    }

    var filename = urlParams.get('file');
    if (filename != null) {
        filename = filename.replace("-", "/") + ".js";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
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
}

parseParams();
document.getElementById("runbtn").onclick = runJavascriptInTextblock;
