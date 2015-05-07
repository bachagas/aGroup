angular.module('MetaGroupware').filter('orderByStatus', function orderByStatusFilter() {
    var statusPriorities = ['online', 'opened', 'error', 'warning', 'pending', 'offline', 'closed', undefined];

    return function(input) {
        if (_.isArray(input)) {
            input.sort(function(a, b) {
                return _.findIndex(statusPriorities, function(e) {return e === a.status;}) - _.findIndex(statusPriorities, function(e) {return e === b.status;});
            });
        }
        return input;
    };
});
