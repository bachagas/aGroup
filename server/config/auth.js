var passport = require('passport'),
    Parse = require('parse').Parse;

exports.authenticate = function (req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.send({success: false});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send({success: true, user: user});
        });
    });
    auth(req, res, next);
};

exports.logout = function (req, res) {
    Parse.User.logOut();
    req.logout();
    res.end();
};

exports.requiresApiLogin = function () {
    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401);
            res.end();
            //res.redirect('/login');
        } else {
            next();
        }
    };
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.attributes.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    };
};
