var config = require('./secrets.json');
var AWS = require('aws-sdk');

module.exports = function() {
    console.log("AWS configured");
    AWS.config.update({accessKeyId: config.s3.accessKeyId, secretAccessKey: config.s3.secretAccessKey});
    var s3bucket = new AWS.S3({params: {Bucket: 'asknaturemedia'}});
    var params = {Key: 'TestYe', Expires: 60, ContentType: 'image/png', ACL: 'private'};
    s3bucket.getSignedUrl('putObject', params, function(err, data) {
	console.log(err);
	console.log(data);
    });
}
