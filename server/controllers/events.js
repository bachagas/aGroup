var Parse = require('parse').Parse;

exports.getEvents = function (req, res) {
    var Event = Parse.Object.extend('Event');
    var query = new Parse.Query(Event);
    query.find({
        success: function (data) {
            res.send(data);
        },
        error: function (err) {
            res.send(err);
        }
    });
};

/*exports.createEvent = function (req, res, next) {
    var event = new Event(req.body);

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

exports.updateEvent = function (req, res) {
    var eventUpdates = req.body;
    var currentUser = Parse.User.current();
    if ((!req.user || !currentUser) || //no logged user
        (req.user.id != currentUser.id) || //should not happen!
        (currentUser.id != userUpdates.objectId && !currentUser.attributes.roles.indexOf('admin') === -1)) { //not an admin
        res.status(403);
        var error = {message: 'Not authorized. Please, log out, log in and try again.', code: 403};
        return res.send({reason: error.message + ' (' + error.code + ')', error: error});
    }

    currentUser.save(userUpdates, {
        success: function(user) {
            // The save was successful.
            req.user = user; //updates current user
            res.send(user);
        },
        error: function(user, error) {
            // The save failed.  Error is an instance of Parse.Error.
            console.log(error);
            res.status(400);
            return res.send({reason: error.message + ' (' + error.code + ')', error: error});
        }
    });
};*/
