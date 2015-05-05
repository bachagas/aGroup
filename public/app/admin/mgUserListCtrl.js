angular.module('MetaGroupware').controller('mgUserListCtrl', function ($scope, User) {
    $scope.users = User.query();
});
