var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    //cookieSession = require('express-session'),
    session = require('express-session'),
    passport = require('passport'),
    stylus = require('stylus'), //https://learnboost.github.io/stylus/
    i18n = require('i18n'); //https://github.com/mashpie/i18n-node

module.exports = function (app, config) {
    //i18n configuration:
    i18n.configure({
        locales: config.locales,
        defaultLocale: config.locales[0],
        cookie: 'MetaGroupware',
        directory: path.join(config.rootPath, '/public/i18n'),
        indent: '  '
    });

    //CSS configuration:
    function compileCss(str, path) {
        return stylus(str).set('filename', path);
    }

    //App configuration:
    app.set('views', path.join(config.rootPath, '/server/views'));
    app.set('view engine', 'ejs');
    app.set('config', config);
    app.use(logger('dev'));
    app.use(cookieParser());
    //app.use(bodyParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    //app.use(cookieSession({secret: '@11inOn3', key: 'MetaGroupware', cookie: { path: '/', httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 /*1week*/}}));
    app.use(session({secret: 'a groupware @11inOn3'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(i18n.init);
    app.use(stylus.middleware({
        src: path.join(config.rootPath, '/public'),
        compile: compileCss
    }));
    app.use(express.static(path.join(config.rootPath, '/public'))); //map default routes for static files, e.g. favicon.ico
};
