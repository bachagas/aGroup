var Parse = require('parse').Parse,
    _ = require('lodash');

function createDefaultEvents() {
    var Event = Parse.Object.extend('Event');
    var EventDetail = Parse.Object.extend('EventDetail');
    var query = new Parse.Query(Event);
    query.ascending('createdAt');
    //Retrieve and check for existent users. Create default users if none found
    query.find({
        success: function (data) {
            console.log('Found ' + data.length + ' events in Db:');
            console.log(_.trunc(JSON.stringify(data), 120));
            if (data.length < 3) {
                var events = [
                    new Event({title: 'Message from some user', status: 'opened', statusDate: new Date(Date.now() - 154329876), tags: ['help', 'user'], featured: true, createdBy: 'user'}),
                    new Event({title: 'Bug in system', status: 'closed', statusDate: new Date(Date.now() - 123456789), tags: ['bug'], featured: false, createdBy: 'developer'}),
                    new Event({title: 'New data available', status: 'pending', statusDate: new Date(Date.now() - 198765432), tags: ['data', 'device'], featured: false, createdBy: 'Some sensor'})
                ];
                var eventDetails = [
                    new EventDetail({parent: events[0], content: 'Hello, I need some help here!', status: 'opened', postedBy: 'user'}),
                    new EventDetail({parent: events[1], content: 'Oh, there is a bug!', status: 'closed', postedBy: 'developer'}),
                    new EventDetail({parent: events[2], content: 'Hello, you have connected something!', status: 'pending', postedBy: 'Some sensor'})
                ];
                eventDetails.forEach(function (event) {
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
