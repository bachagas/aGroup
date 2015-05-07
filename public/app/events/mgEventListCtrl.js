angular.module('MetaGroupware').controller('mgEventListCtrl', function ($scope, CachedEvent) {
    $scope.events = CachedEvent.query();
    $scope.sortOptions = [
        {value: 'title', text: 'Sort by title'},
        {value: 'status', text: 'Sort by status'},
        {value: 'statusDate', text: 'Sort by status date'}
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;
});
