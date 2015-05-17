angular.module('MetaGroupware').factory('Event', function ($resource) {
    var EventResource = $resource('/api/events/:objectId', {objectId: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return EventResource;
});
