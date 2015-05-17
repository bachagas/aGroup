var nodemailer = require('nodemailer');

exports.transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'agroupware@gmail.com',
        pass: '@ll1non3'
    }
});
