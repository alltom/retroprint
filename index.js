var CodeMirror = require('codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
var instrument = require('./instrument');

var src = require('raw!./example01.js');

var editor =
    CodeMirror(document.body, {value: src, mode: 'javascript', readOnly: true});
var outputContainer = document.createElement('pre');
document.body.appendChild(outputContainer);

eval(instrument(src));
outputContainer.appendChild(
    document.createTextNode(JSON.stringify(SAVED_VALUES, null, '  ')));
