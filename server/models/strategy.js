'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');


// The name of the associated class in the database:
var entityName = 'SuperStrategy';

var fields = ['name', 'description'];


var relationships = {

};


var Data = new Model(entityName, fields, relationships);

module.exports = Data;
