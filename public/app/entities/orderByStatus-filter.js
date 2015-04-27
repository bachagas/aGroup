angular.module('MetaGroupware').filter('orderByStatus', function orderByStatusFilter() {
    var statusPriorities = ['online', 'error', 'warning', 'offline', undefined];

    return function(input) {
        if (_.isArray(input)) {
            input.sort(function(a, b) {
                return _.findIndex(statusPriorities, function(e) {return e === a.status;}) - _.findIndex(statusPriorities, function(e) {return e === b.status;});
            });
        }
        return input;
    };
});
