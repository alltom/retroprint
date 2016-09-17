var eselector = require('esprima-selector');
var falafel = require('falafel');
var falafelHelpers = require('falafel-helpers');

var prefixSrc = require('raw!./prefix.js');

function makeId(node) {
  return node.start + '-' + node.end;
}

function wrap(selectionNode, expressionNode, name, id) {
  falafelHelpers(expressionNode)
      .wrap(
          'SAVE(' + JSON.stringify(id) + ',' + JSON.stringify(name) + ',' +
              selectionNode.start + ',' + selectionNode.end + ',',
          ')');
}

module.exports = function(src) {
  var originalSource = {};
  function saveOriginalSource(node) {
    originalSource[makeId(node)] = node.source();
  }
  falafel(src, eselector.tester([
    {
      selector: 'declarator',
      callback: saveOriginalSource,
    },
    {
      selector: 'expression',
      callback: saveOriginalSource,
    },
  ]));

  return prefixSrc + '\n\n' + falafel(src, eselector.tester([
           {
             selector: 'declarator',
             callback: function(node) {
               wrap(node.id, node.init, node.id.name, makeId(node));
             },
           },
           {
             selector: 'expression',
             callback: function(node) {
               if (node.parent.type == 'CallExpression') {
                 return;
               }
               wrap(node, node, originalSource[makeId(node)], makeId(node));
             },
           },
         ]));
};
