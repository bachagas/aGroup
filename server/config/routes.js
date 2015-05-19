var auth = require('./auth'),
    users = require('../controllers/users'),
    events = require('../controllers/events'),
    entities = require('../controllers/entities');

module.exports = function (app) {
    //Api routes:
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser); //sing up doesn't require an authenticated user
    app.put('/api/users', auth.requiresApiLogin(), users.updateUser);

    app.get('/api/events', auth.requiresApiLogin(), events.getEvents);
    app.get('/api/events/:id', auth.requiresApiLogin(), events.getEventById);
    app.post('/api/events', auth.requiresApiLogin(), events.createNewEventDetail);

    app.get('/api/entities', auth.requiresApiLogin(), entities.getEntities);

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
            bootstrappedUser: req.user
        });
    });
};
