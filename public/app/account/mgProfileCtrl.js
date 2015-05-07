angular.module('MetaGroupware').controller('mgProfileCtrl', function ($scope, mgAuth, mgIdentity, notify, $location) {
    $scope.username = mgIdentity.currentUser.username;
    $scope.email = mgIdentity.currentUser.email;
    $scope.fName = mgIdentity.currentUser.firstName;
    $scope.lName = mgIdentity.currentUser.lastName;
    $scope.update = function() {
        var changedUserData = {
            //username: $scope.username,
            email: $scope.email,
            firstName: $scope.fName,
            lastName: $scope.lName
        };
        if ($scope.password && !_.isEmpty($scope.password)) {
            changedUserData.password = $scope.password;
        }

        mgAuth.updateCurrentUser(changedUserData).then(function () {
            notify({message: 'Your profile was updated!', duration: 5000, classes: 'alert alert-success'});
            $location.path('/');
        }, function (reason) {
            notify({message: 'Error: ' + reason, duration: 5000, classes: 'alert alert-danger'});
        });
    };
});
