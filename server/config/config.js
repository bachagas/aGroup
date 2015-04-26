var path = require('path');

//Common configurations:
var rootPath = path.normalize(path.join(__dirname, '/../../'));
var locales = ['pt_BR', 'en'];

//Config variables:
var config = {
    development: {
        //Environment
        env: 'development',

        // Root path of server
        rootPath: rootPath,

        // Server port
        port: process.env.PORT || 3030,

        //Db
        db: {
            appId: 'fgND42jI3nYnLqEGfBx8j56qPtEAYcQWfzCOu4wn',
            appKey: '6PWjVCxBxqgwqlCu33uXZ0zPViZ6pfv9kaO5lHx0'
        },

        //Locales for i18n internationalization
        locales: locales
    },
    production: {
        //Environment
        env: 'production',

        // Root path of server
        rootPath: rootPath,

        // Server port
        port: process.env.PORT || 80,

        //Db
        db: {
            appId: 'fgND42jI3nYnLqEGfBx8j56qPtEAYcQWfzCOu4wn',
            appKey: '6PWjVCxBxqgwqlCu33uXZ0zPViZ6pfv9kaO5lHx0'
        },

        //Locales for i18n internationalization
        locales: locales
    }
};

module.exports = function (env) {
    return config[env];
};
