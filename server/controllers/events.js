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

exports.getEventById = function (req, res) {
    var Event = Parse.Object.extend('Event');
    var query = new Parse.Query(Event);
    query.equalTo('objectId', req.params.id);
    query.first({
        success: function (data) {
            res.send(data);
        },
        error: function (error) {
            //res.send(error);
            return res.send({reason: error.message + ' (' + error.code + ')', error: error});
        }
    });
};
