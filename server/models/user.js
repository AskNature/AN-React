// User model
'use strict';

var Model = require('./model.js');

var entityName = 'Users';

var UserFlat = new Model('User', ['name']);

var Friend = new Model('Friends', ['name']);

var Media = new Model('Media', ['name', 'id', 'filename']);
var AddedMedia = new Model('AddedMedia', ['name', 'id', 'filename']);

var fields = ['name', 'first', 'last', 'email', 'roles', 'registration_date', 'timestamp', 'email_confirmed', 'special_text', 'address_1', 'address_2', 'city', 'state', 'postal_code', 'country', 'time_zone', 'phone', 'extension', 'tollfree', 'fax', 'im', 'langs_spoken', 'revision', 'hide_email', 'send_email', 'alert_frequency', 'last_alerted', 'status', 'contact_me', 'hide_address', 'hide_phone', 'gender', 'custom_avatar', 'ip_address', 'password', 'salt', 'persist', 'newpassword', 'email_salt'];

var relationships = {
    'friends': {
	model: Friend,
	className: 'Friends',
	edge: 'both("Friends")'
    },
    'media': {
	model: Media,
	className: 'Media',
	edge: 'out("HasMedia")'
},

'added_media': {
model: AddedMedia,
className: 'AddedMedia',
edge: 'out("AddedMedia")'
}


};

var User = new Model(entityName, fields, relationships);

module.exports = User;
