var eselector = require('esprima-selector');
var falafel = require('falafel');
var falafelHelpers = require('falafel-helpers');
var fs = require('fs');

var src = fs.readFileSync(process.argv[2], 'utf8');
var prefixSrc = fs.readFileSync('prefix.js', 'utf8');

var instrumentedSrc = falafel(src, eselector.tester([
  {
    selector: 'declarator',
    callback: falafelHelpers.wrap(function(node) {
      var id = node.start + '-' + node.end;
      falafelHelpers(node.init).wrap(
          'SAVE(' + JSON.stringify(id) + ',' + JSON.stringify(node.id.name) +
              ',' + node.start + ',' + node.end + ',',
          ')');
    }),
  },
]));

eval(prefixSrc + '\n\n' + instrumentedSrc);
console.log(JSON.stringify(SAVED_VALUES, null, '  '));
