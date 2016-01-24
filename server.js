/**
 * Main application file
 */

'use strict';

var express = require('express');

//Sets default node environment to 'development'
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var app = express();
var app = module.exports = express();

var config = require('./server/config/config')(env);

require('./server/config/express')(app, config);

require('./server/config/parse')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

//Starts server:
app.listen(config.port);
console.log('Express server listening on %d, in %s mode...', config.port, config.env);
console.log();
console.log('Started using following configurations:');
console.log(config);
