var Parse = require('parse').Parse;

exports.getEntities = function (req, res) {
    var Entity = Parse.Object.extend('Entity');
    var query = new Parse.Query(Entity);
    query.find({
        success: function (data) {
            res.send(data);
        },
        error: function (err) {
            res.send(err);
        }
    });
};
