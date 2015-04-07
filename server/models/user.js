'use strict';
var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'PassportUser';

var fields = ['username', 'firstName', 'lastName', 'email', 'role', 'provider', 'password', 'passwordToken', 'passwordReset', 'verified', 'verifyToken', 'id'];

var Status = new Model('UserStatus',
  [
      'masterid',
      'name'
  ]
);

var relationships = {
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
