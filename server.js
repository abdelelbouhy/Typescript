require('babel-register')({
    ignore: /node_modules/
});

// require('babel-polyfill');

require('./server/index.js');