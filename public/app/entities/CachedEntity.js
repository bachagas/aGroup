angular.module('MetaGroupware').factory('CachedEntity', function (Entity) {
    var entityList;

    return {
        query: function () {
            if (!entityList) { entityList = Entity.query(); }
            return entityList;
        }
    };
});
