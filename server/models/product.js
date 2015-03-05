// Strategy model

var Model = require('./model.js');

var entityName = 'InspiredSolutions';

var fields = ['name']

var Product = Model(entityName, fields);

module.exports = Product;
