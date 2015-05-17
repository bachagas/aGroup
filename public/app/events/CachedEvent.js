angular.module('MetaGroupware').factory('CachedEvent', function (Event, $q) {
    var eventList;

    return {
        query: function (refresh) {
            if (!eventList || refresh) { eventList = Event.query(); }
            return eventList;
        },
        newEvents: function () {
            var dfd = $q.defer();
            Event.query(function (data) {
                if (!eventList || !_.isEqual(data, eventList)) { //updates cache
                    eventList = Event.query();
                } else {
                    dfd.resolve(_.filter(eventList, {featured: true}).length);
                }
            }, function (response) {
                console.log('Couldn\'t check for new events: ', response);
                dfd.resolve(_.filter(eventList, {featured: true}).length);
            });
            return dfd.promise;
        }
    };
});
