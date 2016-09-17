var _ = require('underscore');
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

editor.on('cursorActivity', function() {
  var loc = editor.indexFromPos(editor.getCursor());
  _.chain(SAVED_VALUES)
      .filter(function(entry) {
        return entry.start <= loc && entry.end >= loc;
      })
      .tap(function(entries) {
        outputContainer.innerHTML = '';
        outputContainer.appendChild(
            document.createTextNode(JSON.stringify(entries, null, '  ')));
      });
});
