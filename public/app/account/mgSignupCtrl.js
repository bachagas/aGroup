angular.module('MetaGroupware').controller('mgSignupCtrl', function ($scope, mgAuth, notify, $location, $timeout) {
    $scope.signup = function() {
        _.forEach($scope.signupForm, function (elem) {
            if (_.has(elem, '$setTouched')) elem.$setTouched();
        });
        if ($scope.signupForm.$valid) {
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
        } else {
            $scope.shake = true;
            angular.element("[name='" + $scope.signupForm.$name + "']").find('.ng-invalid:visible:first').focus();
            $timeout(function () {
                $scope.shake = false;
            }, 1000);
        }
    };
});
