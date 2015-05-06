angular.module('MetaGroupware', ['ngResource', 'ngRoute', 'pascalprecht.translate', 'ui.bootstrap', 'cgNotify']);

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

    //Route role checks:
    var routeRoleChecks = {
        admin: {auth: function (mgAuth) {
            return mgAuth.authorizeCurrentUserForRoute('admin');
        }}
    };

    //App client routes:
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mgMainCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'mgSignupCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mgUserListCtrl',
            resolve: routeRoleChecks.admin
        })
        .otherwise({
            templateUrl: '/partials/main/main',
            controller: 'mgMainCtrl'
        });

    //Global utilities - added to lodash
    if (_) {
        _.unescapeHtmlNumericCodes = function (str) {
            return str.replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); });
        };
    }
});

angular.module('MetaGroupware').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
