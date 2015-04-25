angular.module('MetaGroupware', ['ngResource', 'ngRoute', 'pascalprecht.translate', 'ui.bootstrap']);

angular.module('MetaGroupware').config(function ($routeProvider, $locationProvider, $translateProvider) {
    $locationProvider.html5Mode(true);

    //Configure i18n translation module
    $translateProvider
        //.translations('pt', translations)
        .useStaticFilesLoader({
            prefix: '/i18n/',
            suffix: '.json'
        })
        .useLoaderCache(true)
        //.preferredLanguage('pt');
        .determinePreferredLanguage();

    //Parse DB initialization - TODO: get credentials from server
    Parse.initialize('fgND42jI3nYnLqEGfBx8j56qPtEAYcQWfzCOu4wn', '6PWjVCxBxqgwqlCu33uXZ0zPViZ6pfv9kaO5lHx0');

    //App client routes:
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mgMainCtrl'
        })
        .otherwise({
            templateUrl: '/partials/main/main',
            controller: 'mgMainCtrl'
        });
});
