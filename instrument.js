var eselector = require('esprima-selector');
var falafel = require('falafel');
var falafelHelpers = require('falafel-helpers');

var prefixSrc = require('raw!./prefix.js');

module.exports = function(src) {
  return prefixSrc + '\n\n' + falafel(src, eselector.tester([
           {
             selector: 'declarator',
             callback: falafelHelpers.wrap(function(node) {
               var id = node.start + '-' + node.end;
               falafelHelpers(node.init).wrap(
                   'SAVE(' + JSON.stringify(id) + ',' +
                       JSON.stringify(node.id.name) + ',' + node.start + ',' +
                       node.end + ',',
                   ')');
             }),
           },
         ]));
};
