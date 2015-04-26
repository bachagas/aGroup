angular.module('MetaGroupware')
    .controller('mgMainCtrl', function ($scope) {
        $scope.devices = [
            {name: 'TV', status: 'offline', statusDate: new Date()},
            {name: 'Decoder', status: 'error', statusDate: new Date()},
            {name: 'Lamp', status: 'warning', statusDate: new Date()},
            {name: 'Headset', status: 'offline', statusDate: new Date()},
            {name: 'My computer', status: 'online', statusDate: new Date()},
            {name: 'Moto G', status: 'online', statusDate: new Date()}
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
