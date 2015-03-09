// Phenomenon model

var Model = require('./model.js');

var entityName = 'Function';

var fields = ['name', 'short_name', 'description'];

var Phenomenon = Model(entityName, fields);

module.exports = Phenomenon;
