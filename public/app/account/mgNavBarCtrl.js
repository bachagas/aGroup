angular.module('MetaGroupware').controller('mgNavBarCtrl', function ($scope, $modal, mgIdentity, mgAuth, $location, notify, CachedEvent, $interval) {
    $scope.identity = mgIdentity;
    $scope.newEvents = 0;

    $scope.logIn = function () {
        $modal.open({
            templateUrl: '/partials/account/log-in',
            size: 'sm',
            controller: function ($scope, $modalInstance) {
                $scope.errors = null;
                $scope.loading = false;

                $scope.logIn = function (username, passwd) {
                    $scope.errors = null;
                    $scope.loading = true;
                    mgAuth.authenticateUser(username, passwd).then(function (success) {
                       if (success) {
                           $scope.loading = false;
                           notify({message: 'Welcome Mr(s). ' + (mgIdentity.currentUser.lastName ? mgIdentity.currentUser.lastName : mgIdentity.currentUser.username) + '!', duration: 5000, classes: 'alert alert-success'});
                           $modalInstance.close();
                           $location.path('/main');
                       } else {
                           $scope.loading = false;
                           $scope.errors = 'failed to log in!';
                           notify({message: 'Username/password incorrect!', duration: 5000, classes: 'alert alert-danger'});
                       }
                    });
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss();
                };

                $scope.closeAlert = function () {
                  $scope.errors = null;
                };
            }
        });
    };

    $scope.signOut = function () {
        mgAuth.logoutUser().then(function (success) {
            if (success) {
                $scope.username = '';
                $scope.password = '';
                notify({message: 'You have successfully logged out!', duration: 5000, classes: 'alert alert-success'});
                $location.path('/');
            } else {
                notify({message: 'Logout failed! Please, try again...', duration: 5000, classes: 'alert alert-danger'});
            }
        });
    };

    if ($location.path() == '/login') { //automatically opens login dialog
        $scope.logIn();
    }

    var timer;
    $scope.checkNewEvents = function () {
        if (angular.isDefined(timer)) {
            return;
        }

        timer = $interval(function () {
            if (mgIdentity.isAuthenticated()) {
                CachedEvent.newEvents().then(function (val) {
                    $scope.newEvents = val;
                });
            }
        }, 5000); //will check for new events every 15 seconds
    };

    $scope.stopCheckingNewEvents = function () {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    };

    $scope.$on('$destroy', function () {
        // Make sure that the interval is destroyed
        $scope.stopCheckingNewEvents();
    });
});
