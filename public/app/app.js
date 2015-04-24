angular.module('MetaGroupware', ['ngResource', 'ngRoute', 'pascalprecht.translate']);

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

    //App routes:
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main',
            controller: 'mainCtrl'
        })
        .otherwise({
            templateUrl: '/partials/main',
            controller: 'mainCtrl'
        });
});

angular.module('MetaGroupware')
    .controller('mainCtrl', function ($scope) {
        $scope.myVar = 'Hello Angular ;-)';

        Parse.initialize('fgND42jI3nYnLqEGfBx8j56qPtEAYcQWfzCOu4wn', '6PWjVCxBxqgwqlCu33uXZ0zPViZ6pfv9kaO5lHx0');

        var Message = Parse.Object.extend('Messages');
        var query = new Parse.Query(Message);
        query.find({
            success: function (data) {
                //console.log(data);
                $scope.message = data[0].attributes.message;
                console.log($scope.message);
                $scope.$apply();
            },
            error: function (response) {
                alert('Ops there was an error :-(');
                console.log(response);
            }
        });

        $scope.testParse = function() {
            var TestObject = Parse.Object.extend('TestObject');
            var testObject = new TestObject();
            testObject.save({foo: 'bar'}).then(function (object) {
                alert('yay! it worked');
                console.log(object);
                $scope.testResult = object;
                $scope.$apply();
            });
        };
    });
