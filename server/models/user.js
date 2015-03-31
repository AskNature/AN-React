// User model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Users';

var fields = ['name', 'firstName', 'lastName', 'email', 'role', 'provider', 'password', 'passwordToken', 'passwordReset', 'verified', 'verifyToken', 'id'];


var relationships = {

};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
