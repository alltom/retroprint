var _ = require('underscore');
var CodeMirror = require('codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
var d3 = require('d3');
require('./index.css');
var instrument = require('./instrument');

var src = require('raw!./example02.js');

var editorContainer =
    d3.select(document.body).append('div').classed('editor-container', true);
var editor = CodeMirror(
    editorContainer.node(),
    {value: src, mode: 'javascript', viewportMargin: Infinity});
var compileButton = editorContainer.append('button').text('Run');
var outputContainer =
    d3.select(document.body).append('pre').classed('output-container', true);

eval(instrument(src));

compileButton.on('click', function() {
  src = editor.getValue();
  eval(instrument(src));
});

editor.on('cursorActivity', function() {
  var loc = editor.indexFromPos(editor.getCursor());
  _.chain(SAVED_VALUES)
      .filter(function(entry) {
        return entry.start <= loc && entry.end >= loc;
      })
      .groupBy('id')
      .mapObject(function(vals, id) {
        return {id: id, vals: vals, exprLength: vals[0].end - vals[0].start};
      })
      .sortBy('exprLength')
      .reduce(
          function(memo, val) { return memo == null ? val.vals : memo; }, null)
      .tap(function(entries) {
        if (!entries) {
          entries = [];
        }
        var items = outputContainer.selectAll('div').data(
            entries, function(d) { return d.id; });
        var div = items.enter().append('div');
        div.append('span').text(function(d) { return d.name + ' = '; });
        div.append('pre').classed('value', true).text(function(d) {
          return JSON.stringify(d.value, null, '  ')
        });
        items.exit().remove();
      });
});
