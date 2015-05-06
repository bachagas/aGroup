var Parse = require('parse').Parse;

exports.getUsers = function (req, res) {
    var query = new Parse.Query(Parse.User);
    query.find({
        success: function (data) {
            res.send(data);
        },
        error: function (err) {
            res.send(err);
        }
    });
};

exports.createUser = function (req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    var user = new Parse.User(req.body);

    user.signUp(null, {
        success: function (user) {
            // Hooray! Let them use the app now.
            console.log('New user created:');
            console.log(user);
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.send(user);
            });
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            console.log('Error: ' + error.code + ' ' + error.message);
            console.log('Could not create new user ' + JSON.stringify(user));
            res.status(400);
            return res.send({reason: error.message + ' (' + error.code + ')', error: error});
        }
    });
};
