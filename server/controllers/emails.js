var nodemailer = require('../config/nodemailer').transport;

exports.sendEmail = function (email, callback) {
    var mailOptions = {
        from: 'agroupware@gmail.com',
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html
    };
    console.log(mailOptions);
    nodemailer.sendMail(mailOptions, callback);
};
