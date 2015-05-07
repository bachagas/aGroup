angular.module('MetaGroupware').factory('Event', function ($resource) {
    var EventResource = $resource('/api/events/:id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return EventResource;
});