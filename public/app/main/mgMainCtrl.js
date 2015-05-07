angular.module('MetaGroupware').controller('mgMainCtrl', function ($scope, CachedEvent) {
    $scope.entities = [
        {name: 'TV', status: 'offline', statusDate: new Date(), type: 'device'},
        {name: 'Decoder', status: 'error', statusDate: new Date(), type: 'device'},
        {name: 'Lamp', status: 'warning', statusDate: new Date(), type: 'device'},
        {name: 'Headset', status: 'offline', statusDate: new Date(), type: 'device'},
        {name: 'My computer', status: 'online', statusDate: new Date(), type: 'device'},
        {name: 'Moto G', status: 'online', statusDate: new Date(), type: 'device'},
        {name: 'Bruno', status: 'online', statusDate: new Date(), type: 'person'},
        {name: 'Marcio', status: 'offline', statusDate: new Date(), type: 'person'},
        {name: 'Hugo', status: 'offline', statusDate: new Date(), type: 'person'},
        {name: 'Felipe', status: 'warning', statusDate: new Date(), type: 'person'}
    ];

    $scope.events = CachedEvent.query();
});
