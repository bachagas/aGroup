angular.module('MetaGroupware').controller('mgSignupCtrl', function ($scope, mgAuth, notify, $location) {
    $scope.signup = function() {
        var newUserData = {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            firstName: $scope.fName,
            lastName: $scope.lName
        };

        mgAuth.createUser(newUserData).then(function () {
            notify({message: 'User account created!', duration: 5000, classes: 'alert alert-success'});
            $location.path('/');
        }, function (reason) {
            notify({message: 'Error: ' + reason, duration: 5000, classes: 'alert alert-danger'});
        });
    };
});
