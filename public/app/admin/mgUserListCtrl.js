angular.module('MetaGroupware').controller('mgUserListCtrl', function ($scope, mgUser) {
    $scope.users = mgUser.query();
});
