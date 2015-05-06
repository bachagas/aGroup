var Parse = require('parse').Parse,
    User = require('../models/User');

module.exports = function (config) {
    Parse.initialize(config.db.appId, config.db.appKey);

    User.createDefaultUsers();
};
