angular.module('MetaGroupware').factory('CachedEvent', function (Event) {
    var eventList;

    return {
        query: function () {
            if (!eventList) { eventList = Event.query(); }
            return eventList;
        }
    };
});
