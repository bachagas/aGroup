angular.module('MetaGroupware').controller('mgEventDetailCtrl', function ($scope, CachedEvent, $routeParams) {
    //$scope.event = Event.get({id: $routeParams.id});
    CachedEvent.query().$promise.then(function (collection) {
        $scope.event = _.find(collection, {objectId: $routeParams.id});
    });
});