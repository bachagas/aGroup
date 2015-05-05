var auth = require('./auth'),
    Parse = require('parse').Parse;

module.exports = function (app) {
    //Api routes:
    app.get('/api/users', auth.requiresRole('admin'), function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.find({
            success: function (data) {
                res.send(data);
            },
            error: function (err) {
                res.send(err);
            }
        });
    });

    //Api routes:
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', auth.logout);

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user,
            unescape: require('lodash').unescape
        });
    });
};
