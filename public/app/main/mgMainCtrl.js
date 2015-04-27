angular.module('MetaGroupware')
    .controller('mgMainCtrl', function ($scope) {
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

        var Message = Parse.Object.extend('Messages');
        var query = new Parse.Query(Message);
        query.find({
            success: function (data) {
                //console.log(data);
                $scope.message = data[0].attributes.message;
                console.log($scope.message);
                $scope.$apply();
            },
            error: function (response) {
                alert('Ops there was an error :-(');
                console.log(response);
            }
        });

        $scope.testParse = function() {
            var TestObject = Parse.Object.extend('TestObject');
            var testObject = new TestObject();
            testObject.save({foo: 'bar'}).then(function (object) {
                alert('yay! it worked');
                console.log(object);
                $scope.testResult = object;
                $scope.$apply();
            });
        };
    });
