angular.module('MetaGroupware')
    .controller('mgNavBarCtrl', function ($scope, $modal) {
        $scope.logIn = function () {
            var modalInstance = $modal.open({
                templateUrl: '/partials/account/signIn',
                size: 'sm',
                controller: function ($scope, $modalInstance, username) {
                    $scope.username = username;

                    $scope.logIn = function (username, passwd) {
                        $modalInstance.close({username: username, password: passwd});
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                },
                //data passed by parent
                resolve: {
                    username: function () {
                        return $scope.username;
                    }
                }
            });

            modalInstance.result.then(function (user) {
                console.log('Modal confirmed at: ' + new Date());
                console.log('User is ' + user.username + ' and password is ' + user.password);
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
    });
