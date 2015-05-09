angular.module('MetaGroupware').factory('Entity', function ($resource) {
    var EntityResource = $resource('/api/entities/:objectId', {objectId: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return EntityResource;
});