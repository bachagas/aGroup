var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'agroupware@gmail.com',
        pass: '@ll1non3'
    }
});

exports.sendEmail = function (email, callback) {
    var mailOptions = {
        from: 'agroupware@gmail.com',
        to: email.to,
        subject: email.subject,
        text: email.text
    };
    console.log(mailOptions);
    transport.sendMail(mailOptions, callback);
};
