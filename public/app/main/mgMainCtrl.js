angular.module('MetaGroupware').controller('mgMainCtrl', function ($scope, mgIdentity, CachedEvent, CachedEntity) {
    $scope.currentUser = mgIdentity.currentUser;
    $scope.entities = CachedEntity.query();
    $scope.events = CachedEvent.query();
});
