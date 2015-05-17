angular.module('MetaGroupware').controller('mgEventDetailCtrl', function ($scope, Event, $routeParams, mgIdentity, notify, $window, $location) {
    if ($routeParams.id != 'new') {
        $scope.event = Event.get({objectId: $routeParams.id});
    } else {
        $scope.newEvent = true;
        $scope.event = {};
    }
    //CachedEvent.query().$promise.then(function (collection) {
    //    $scope.event = _.find(collection, {objectId: $routeParams.id});
    //});

    $scope.newPost = {};
    $scope.openNewPost = false;
    $scope.isEmpty = _.isEmpty;

    $scope.saveNewPost = function () {
        $scope.loading = true;
        $scope.newPost.postedBy = mgIdentity.currentUser.username;
        if ($scope.newEvent) {
            $scope.event.createdBy = mgIdentity.currentUser.username;
            $scope.newPost.content = $scope.event.content;
            $scope.newPost.status = $scope.event.status;
        }
        $scope.newPost.parent = $scope.event;
        new Event($scope.newPost).$save(function (data) {
            $scope.cancelNewPost();
            if ($scope.newEvent) { //goes to event details page
                $location.path('/events/' + data.parent.objectId);
            } else { //already on event details page, just refreshes the data
                Event.get({objectId: $routeParams.id}, function (data) {
                    notify({message: 'Post saved!', duration: 5000, classes: 'alert alert-success'});
                    $scope.event = data;
                    $scope.loading = false;
                });
            }
        });
    };

    $scope.cancelNewPost = function () {
        $scope.openNewPost = false;
        $scope.newPost = null;
        $scope.newPost = {};
    };

    $scope.back = function () {
        $window.history.back();
    };
});
