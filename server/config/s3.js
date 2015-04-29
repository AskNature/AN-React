var config = require('./secrets.json');
var AWS = require('aws-sdk');

module.exports = function() {
    console.log("AWS configured");
    AWS.config.update({accessKeyId: config.s3.accessKeyId, secretAccessKey: config.s3.secretAccessKey});
}
