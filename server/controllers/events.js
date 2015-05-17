var Parse = require('parse').Parse;

exports.getEvents = function (req, res) {
    var Event = Parse.Object.extend('Event');
    var query = new Parse.Query(Event);
    query.find({
        success: function (data) {
            res.send(data);
        },
        error: function (err) {
            res.send(err);
        }
    });
};

exports.getEventById = function (req, res) {
    var Event = Parse.Object.extend('Event');
    var parent = new Event();
    parent.id = req.params.id;
    var EventDetail = Parse.Object.extend('EventDetail');
    var query = new Parse.Query(EventDetail);
    query.include('parent');
    query.equalTo('parent', parent);
    query.ascending('createdAt');
    query.find({
        success: function (data) {
            var event = {};
            if (data && data.length > 0) {
                event = JSON.parse(JSON.stringify(data[0].get('parent')));
                event.statusDate = event.statusDate.iso;
                event.details = data;
            }
            res.send(event);
        },
        error: function (error) {
            //res.send(error);
            return res.send({reason: error.message + ' (' + error.code + ')', error: error});
        }
    });
};

exports.createNewEventDetail = function (req, res) {
    var EventDetail = Parse.Object.extend('EventDetail');
    var event = new EventDetail(req.body);

    //Creates /updates parent event:
    var Event = Parse.Object.extend('Event');
    var parent = new Event();
    var newEvent = true;
    if (req.body.parent && req.body.parent.objectId) {
        parent.id = req.body.parent.objectId;
        newEvent = false;
    }
    parent.set('title', req.body.parent.title);
    parent.set('content', req.body.parent.content);
    parent.set('createdBy', req.body.parent.createdBy);
    parent.set('status', req.body.status);
    if (req.body.status == 'opened' || !parent.id) { //new event
        parent.set('featured', true);
    } else {
        parent.set('featured', false);
    }
    parent.set('statusDate', new Date());
    event.set('parent', parent);
    //} else {
    //    res.status(400);
    //    return res.send({reason: 'Error: cannot create a event detail without a parent data. Please, check the data you have sent again. (internal error))', error: {data: req.body}});
    //}

    var nodemailer = require('./emails');
    function sendEmail() {
        //try to send email to the creator of the event:
        var event = req.body;
        var parent = event.parent;
        var me = req.user.attributes;
        if (parent && parent.createdBy) {
            var query = new Parse.Query(Parse.User);
            query.equalTo('username', parent.createdBy);
            query.first({
                success: function (owner) {
                    var to = owner.get('email');
                    if (to && to.length > 0) {
                        nodemailer.sendEmail({
                            from: me.firstName + ' ' + me.lastName + ' using aGroupware ? <agroupware@gmail.com>',
                            to: to,
                            subject: 'Event ' + event.status + ': ' + parent.title,
                            text: 'Your event "' + parent.title + (newEvent ? '" has been created:\n' : '" has changed:\n')
                                + 'status --> ' + event.status + '\n'
                                + 'on --> ' + new Date() + '\n'
                                + 'by --> ' + event.postedBy + ' (' + (me.email || 'email not informed') + ')\n\n'
                                + 'Comment: \n' + event.content
                        }, function (error, response) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Message sent: ' + response.message);
                            }
                        });
                    } else {
                        console.log('ALERT: cannot send email, user does not have one: ' + parent.createdBy);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    }

    event.save(null, {
        success: function (detail) {
            console.log('New event detail created:');
            console.log(detail);
            sendEmail();
            res.send(detail);
        },
        error: function (detail, error) {
            // Show the error message somewhere and let the detail try again.
            console.log('Error: ' + error.code + ' ' + error.message);
            console.log('Could not create new detail ' + JSON.stringify(detail));
            res.status(400);
            return res.send({reason: error.message + ' (' + error.code + ')', error: error});
        }
    });
};