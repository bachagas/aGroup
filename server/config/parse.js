var Parse = require('parse').Parse;

module.exports = function (config) {
    Parse.initialize(config.db.appId, config.db.appKey);
};