'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Users';

var fields = ['name', 'first', 'last', 'email', 'roles', 'registration_date', 'timestamp', 'email_confirmed', 'special_text', 'address_1', 'address_2', 'city', 'state', 'postal_code', 'country', 'time_zone', 'phone', 'extension', 'tollfree', 'fax', 'im', 'langs_spoken', 'revision', 'hide_email', 'send_email', 'alert_frequency', 'last_alerted', 'contact_me', 'hide_address', 'hide_phone', 'gender', 'custom_avatar', 'custom_avatar_url', 'ip_address', 'password', 'salt', 'persist', 'newpassword', 'email_salt'];

var Entity = new Model('Content',
    [
        'name',
        '@class'
    ]
);
var Status = new Model('UserStatus',
  [
      'masterid',
      'name'
  ]
);
var Media = new Model('Media',
  [
    'filename',
    'name',
    'entity',
    'description',
    'media_url',
    'flag_demo',
    'source_url',
    'author'
  ]
);


var relationships = {
  'friends': {
      model: Entity,
      className: 'Users',
      edge: 'out("Friends")'
      },
      'bookmarked': {
          model: Entity,
          className: 'V',
          edge: 'out("Bookmarked")'
          },
      'media': {
      model: Media,
      className: 'Media',
     edge: 'out("HasMedia")'
      },
      'added_media': {
      model: Media,
      className: 'Media',
     edge: 'out("AddedMedia")'
      },
      'added_content': {
      model: Entity,
      className: 'Content',
     edge: 'out("AddedContent")'
      },
      'status': {
        model: Status,
        className: 'UserStatus',
        edge: 'out("HasStatus")',
        select: true,
        options: ListOptions.UserStatus
      }

};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
