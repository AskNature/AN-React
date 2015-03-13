// Phenomenon model
'use strict';

var Model = require('./model.js');

var entityName = 'Function';

var fields = ['name', 'short_name', 'description'];

var Phenomenon = new Model(entityName, fields);

module.exports = Phenomenon;
