var auth = require('./auth'),
    Users = require('../controllers/users'),
    Events = require('../controllers/events');

module.exports = function (app) {
    //Api routes:
    app.get('/api/users', auth.requiresRole('admin'), Users.getUsers);
    app.post('/api/users', Users.createUser);
    app.put('/api/users', Users.updateUser);

    app.get('/api/events', Events.getEvents);
    //app.post('/api/events', Events.createEvent);
    //app.put('/api/events', Events.updateEvent);

    //Api routes:
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', auth.logout);

    app.all('/api/*', function (req, res) {
       res.send(404);
    });

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user,
            unescape: require('lodash').unescape
        });
    });
};
