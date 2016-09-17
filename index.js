var instrument = require('./instrument');

var src = require('raw!./example01.js');

eval(instrument(src));
console.log(JSON.stringify(SAVED_VALUES, null, '  '));
