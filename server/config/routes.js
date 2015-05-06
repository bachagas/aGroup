var auth = require('./auth'),
    Users = require('../controllers/users');

module.exports = function (app) {
    //Api routes:
    app.get('/api/users', auth.requiresRole('admin'), Users.getUsers);
    app.post('/api/users', Users.createUser);

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
