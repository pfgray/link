/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Running casa in: ' + process.env.NODE_ENV);

var express = require('express');
var path = require('path');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Setup db:
require('./database').init(config);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
