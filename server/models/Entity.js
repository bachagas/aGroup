var Parse = require('parse').Parse,
    _ = require('lodash');

function createDefaultEntities() {
    var Entity = Parse.Object.extend('Entity');
    var query = new Parse.Query(Entity);
    query.ascending('createdAt');
    //Retrieve and check for existent users. Create default users if none found
    query.find({
        success: function (data) {
            console.log('Found ' + data.length + ' entities in Db:');
            console.log(_.trunc(JSON.stringify(data), 120));
            if (data.length < 10) {
                var events = [
                    new Entity({name: 'TV', status: 'offline', statusDate: new Date(Date.now() - 335000000), type: 'device'}),
                    new Entity({name: 'Decoder', status: 'error', statusDate: new Date(Date.now() - 330000000), type: 'device'}),
                    new Entity({name: 'Lamp', status: 'warning', statusDate: new Date(Date.now() - 340000000), type: 'device'}),
                    new Entity({name: 'Headset', status: 'offline', statusDate: new Date(Date.now() - 350000000), type: 'device'}),
                    new Entity({name: 'My computer', status: 'online', statusDate: new Date(Date.now() - 360000000), type: 'device'}),
                    new Entity({name: 'Moto G', status: 'online', statusDate: new Date(Date.now() - 370000000), type: 'device'}),
                    new Entity({name: 'a Developer', status: 'online', statusDate: new Date(Date.now() - 500000000), type: 'person'}),
                    new Entity({name: 'a User', status: 'offline', statusDate: new Date(Date.now() - 400000000), type: 'person'}),
                    new Entity({name: 'a Friend', status: 'offline', statusDate: new Date(Date.now() - 300000000), type: 'person'}),
                    new Entity({name: 'a Caregiver', status: 'warning', statusDate: new Date(Date.now() - 200000000), type: 'person'})
                ];
                events.forEach(function (event) {
                    event.save(null, {
                        success: function (data) {
                            console.log('New entity created:');
                            console.log(data);
                        },
                        error: function (data, error) {
                            console.log('Error: ' + error.code + ' ' + error.message);
                            console.log('Could not create new entity ' + JSON.stringify(data));
                        }
                    });
                });
            }
        },
        error: function (response) {
            console.log(response);
        }
    });
}
exports.createDefaultEntities = createDefaultEntities;
