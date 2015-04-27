var Parse = require('parse').Parse,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy

module.exports = function () {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            //authenticates using Parse logIn
            Parse.User.logIn(username, password, {
                success: function (user) {
                    // Do stuff after successful login.
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.
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

    var query = new Parse.Query(Parse.User);
    passport.deserializeUser(function (id, done) {
        query.equalTo('objectId', id);
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
    });
};
