var nodemailer = require('nodemailer');
var sendgrid = require('nodemailer-sendgrid-transport');
var config = require('./secrets.json');

module.exports = function() {
    var client = nodemailer.createTransport(sendgrid(config.sendgrid));
    module.exports.client = client;
}
