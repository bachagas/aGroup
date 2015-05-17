var auth = require('./auth'),
    users = require('../controllers/users'),
    events = require('../controllers/events'),
    entities = require('../controllers/entities');

module.exports = function (app) {
    //Api routes:
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/events', events.getEvents);
    app.get('/api/events/:id', events.getEventById);
    app.post('/api/events', events.createNewEventDetail);

    app.get('/api/entities', entities.getEntities);

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
