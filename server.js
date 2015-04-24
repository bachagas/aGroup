/**
 * Main application file
 */

'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    stylus = require('stylus'), //https://learnboost.github.io/stylus/
    i18n = require('i18n'); //https://github.com/mashpie/i18n-node

//Sets default node environment to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Config variables:
var config = {
    //Environment
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname),

    // Server port
    port: process.env.PORT || 3030,

    //Locales for i18n internationalization
    locales: ['pt_BR', 'en']
};

//i18n configuration:
i18n.configure({
    locales: config.locales,
    defaultLocale: config.locales[0],
    cookie: 'MetaGroupware',
    directory: path.join(config.root, '/public/i18n'),
    indent: '  '
});

//CSS configuration:
function compileCss(str, path) {
    return stylus(str).set('filename', path);
}

//App definition and configuration:
//var app = express();
var app = module.exports = express();
app.set('views', path.join(config.root, '/server/views'));
app.set('view engine', 'ejs');
app.set('config', config);
app.use(logger('dev'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({secret: '@11inOn3', key: 'MetaGroupware', cookie: { path: '/', httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 /*1week*/}}));
app.use(i18n.init);
app.use(stylus.middleware({
    src: path.join(config.root, '/public'),
    compile: compileCss
}));
app.use(express.static(path.join(config.root, '/public'))); //map default routes for static files, e.g. favicon.ico

//App routes:
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});
app.get('*', function(req, res) {
    res.render('index');
});

//Starts server:
app.listen(config.port);
console.log('Started using following configurations:');
console.log(config);
console.log();
console.log('Express server listening on %d, in %s mode...', config.port, config.env);
