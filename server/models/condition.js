// Phenomenon model
'use strict';

var Model = require('./model.js');

// The name of the associated class in the database:
var entityName = 'Collection';

var fields = ['name'];

var relationships = {


};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
