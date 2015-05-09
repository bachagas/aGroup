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
                    new Entity({name: 'TV', status: 'offline', statusDate: new Date(), type: 'device'}),
                    new Entity({name: 'Decoder', status: 'error', statusDate: new Date(), type: 'device'}),
                    new Entity({name: 'Lamp', status: 'warning', statusDate: new Date(), type: 'device'}),
                    new Entity({name: 'Headset', status: 'offline', statusDate: new Date(), type: 'device'}),
                    new Entity({name: 'My computer', status: 'online', statusDate: new Date(), type: 'device'}),
                    new Entity({name: 'Moto G', status: 'online', statusDate: new Date(), type: 'device'}),
                    new Entity({name: 'Bruno', status: 'online', statusDate: new Date(), type: 'person'}),
                    new Entity({name: 'Marcio', status: 'offline', statusDate: new Date(), type: 'person'}),
                    new Entity({name: 'Hugo', status: 'offline', statusDate: new Date(), type: 'person'}),
                    new Entity({name: 'Felipe', status: 'warning', statusDate: new Date(), type: 'person'})
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
