/**
 * Main application file
 */

'use strict';

var express = require('express'),
    Parse = require('parse').Parse,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//Sets default node environment to 'development'
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var app = express();
var app = module.exports = express();

var config = require('./server/config/config')(env);

require('./server/config/express')(app, config);

require('./server/config/parse')(config);

var query = new Parse.Query(Parse.User);
passport.use(new LocalStrategy(
    function (username, password, done) {
        query.equalTo('username', username);
        query.first({
            success: function (user) {
                // Successfully retrieved the object.
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            error: function (error) {
                console.log('Error: ' + error.code + ' ' + error.message);
                return done(null, false);
            }
        });
    }
));

passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user.id);
    }
});

passport.deserializeUser(function (id, done) {
    query.equalTo('id', id);
    query.first({
        success: function (user) {
            // Successfully retrieved the object.
            console.log('passport deserialize');
            console.log(user);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        },
        error: function (error) {
            console.log('Error: ' + error.code + ' ' + error.message);
            return done(null, false);
        }
    });
});

require('./server/config/routes')(app);

//Starts server:
app.listen(config.port);
console.log('Started using following configurations:');
console.log(config);
console.log();
console.log('Express server listening on %d, in %s mode...', config.port, config.env);
