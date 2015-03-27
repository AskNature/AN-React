// Phenomenon model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');


// The name of the associated class in the database:
var entityName = 'Collection';

var fields = ['name', 'flag_text', 'flag_media', 'flag_tags'];


var relationships = {


};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
