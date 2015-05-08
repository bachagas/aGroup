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

    //Route role checks:
    var routeRoleChecks = {
        admin: {auth: function (mgAuth) {
            return mgAuth.authorizeCurrentUserForRoute('admin');
        }},
        user: {auth: function (mgAuth) {
            return mgAuth.authorizeAuthenticatedUserForRoute();
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
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'mgProfileCtrl',
            resolve: routeRoleChecks.user
        })
        .when('/events', {
            templateUrl: '/partials/events/event-list',
            controller: 'mgEventListCtrl',
            resolve: routeRoleChecks.user
        })
        .when('/events/:id', {
            templateUrl: '/partials/events/event-details',
            controller: 'mgEventDetailCtrl',
            resolve: routeRoleChecks.user
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mgUserListCtrl',
            resolve: routeRoleChecks.admin
        })
        .otherwise({
            templateUrl: '/partials/main/',
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
