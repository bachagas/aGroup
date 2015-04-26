var Parse = require('parse').Parse;

module.exports = function (config) {
    Parse.initialize(config.db.appId, config.db.appKey);

    var query = new Parse.Query(Parse.User);

    //Retrieve and check for existent users. Create default users if none found
    query.find({
        success: function (data) {
            console.log(data.length + ' user(s) in Db');
            console.log(data);
            if (data.length === 0) {
                var user = new Parse.User({firstName: 'Bruno', lastName: 'Chagas', username: 'bachagas', password: '123456'});
                user.signUp(null, {
                    success: function (user) {
                        // Hooray! Let them use the app now.
                        console.log('New user created:');
                        console.log(user);
                    },
                    error: function (user, error) {
                        // Show the error message somewhere and let the user try again.
                        console.log('Error: ' + error.code + ' ' + error.message);
                        console.log('Could not create new user ' + JSON.stringify(user));
                    }
                });
            }
        },
        error: function (response) {
            console.log(response);
        }
    });
};