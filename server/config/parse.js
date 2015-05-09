var Parse = require('parse').Parse;

module.exports = function (config) {
    Parse.initialize(config.db.appId, config.db.appKey);

    require('../models/User').createDefaultUsers();
    require('../models/Event').createDefaultEvents();
    require('../models/Entity').createDefaultEntities();
};
