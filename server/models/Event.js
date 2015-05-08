var Parse = require('parse').Parse,
    _ = require('lodash');

function createDefaultEvents() {
    var Event = Parse.Object.extend('Event');
    var query = new Parse.Query(Event);
    query.ascending('createdAt');
    //Retrieve and check for existent users. Create default users if none found
    query.find({
        success: function (data) {
            console.log('Found ' + data.length + ' event in Db:');
            console.log(_.trunc(JSON.stringify(data), 120));
            if (data.length < 3) {
                var events = [
                    new Event({title: 'Message from some user', content: 'Hello, I need some help here!', status: 'opened', statusDate: new Date(), tags: ['help', 'user'], featured: true}),
                    new Event({title: 'Bug in system', content: 'Oh, there is a bug!', status: 'closed', statusDate: new Date(), tags: ['bug'], featured: false}),
                    new Event({title: 'New data available', content: 'Hello, you have connected something!', status: 'pending', statusDate: new Date(), tags: ['data', 'device'], featured: false})
                ];
                events.forEach(function (event) {
                    event.save(null, {
                        success: function (data) {
                            console.log('New event created:');
                            console.log(data);
                        },
                        error: function (data, error) {
                            console.log('Error: ' + error.code + ' ' + error.message);
                            console.log('Could not create new event ' + JSON.stringify(data));
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
exports.createDefaultEvents = createDefaultEvents;
