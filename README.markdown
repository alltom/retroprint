Usage
=====

1. `npm install`
2. `./node_modules/.bin/webpack-dev-server --progress --colors`
3. Open http://localhost:8080/


Developer notes
===============

The entry point is `index.html`, which loads `bundle.js`, which gets compiled from `index.js`.

`instrument.js` accepts raw JavaScript and rewrites it to generate debug information, including prepending `prefix.js`.
