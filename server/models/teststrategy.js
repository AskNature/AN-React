'use strict';

var Model = require('./model2.js');

var Function = new Model('Function',
    [ 'name' ],
    {}
);

// The name of the associated class in the database:
var entityName = 'Strategy';

var fields = ['name', 'summary'];

var relationships = {
    'functions': {
	model: Function,
	class: 'Function',
	edge: 'out("HasFunction")'
    }
};


var TestStrategy = new Model(entityName, fields, relationships);

module.exports = TestStrategy;
