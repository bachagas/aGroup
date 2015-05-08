angular.module('MetaGroupware').factory('Event', function ($resource) {
    var EventResource = $resource('/api/events/:id', {id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return EventResource;
});