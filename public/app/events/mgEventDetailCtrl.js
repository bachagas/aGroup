angular.module('MetaGroupware').controller('mgEventDetailCtrl', function ($scope, Event, $routeParams, mgIdentity, notify) {
    $scope.event = Event.get({objectId: $routeParams.id});
    //CachedEvent.query().$promise.then(function (collection) {
    //    $scope.event = _.find(collection, {objectId: $routeParams.id});
    //});

    $scope.newPost = {};
    $scope.openNewPost = false;
    $scope.isEmpty = _.isEmpty;

    $scope.saveNewPost = function () {
        $scope.newPost.postedBy = mgIdentity.currentUser.username;
        $scope.newPost.parent = $scope.event;
        $scope.loading = true;
        new Event($scope.newPost).$save(function () {
            $scope.cancelNewPost();
            Event.get({objectId: $routeParams.id}, function (data) {
                notify({message: 'Post saved!', duration: 5000, classes: 'alert alert-success'});
                $scope.event = data;
                $scope.loading = false;
            });
        });
    };

    $scope.cancelNewPost = function () {
        $scope.newPost = null;
        $scope.newPost = {};
        $scope.openNewPost = false;
    };
});
