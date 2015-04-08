'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Users';

var fields = ['name', 'first', 'last', 'email', 'roles', 'registration_date', 'timestamp', 'email_confirmed', 'special_text', 'address_1', 'address_2', 'city', 'state', 'postal_code', 'country', 'time_zone', 'phone', 'extension', 'tollfree', 'fax', 'im', 'langs_spoken', 'revision', 'hide_email', 'send_email', 'alert_frequency', 'last_alerted', 'contact_me', 'hide_address', 'hide_phone', 'gender', 'custom_avatar', 'ip_address', 'password', 'salt', 'persist', 'newpassword', 'email_salt'];

var Entity = new Model('Content',
    [
        'name',
        '@class'
    ]
);
var User = new Model('User',
    [
        'name'
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
    'name',
    'masterid',
    'filename',
    'entityType'
  ]
);

var Condition = new Model('Condition',
  [
'name'
  ]
);

var relationships = {
  'friends': {
      model: Entity,
      className: 'User',
      edge: 'out("Friends")'
      },
      'media': {
      model: Media,
      className: 'Media',
     edge: 'out("HasMedia")'
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
