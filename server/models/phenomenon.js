// Phenomenon model
'use strict';

var Model = require('./model.js');

var entityName = 'Function';

var FunctionFlat = new Model('Function', ['name']);

var fields = ['name', 'short_name', 'description'];

var relationships = {
    'parent': {
	model: FunctionFlat,
	className: 'Function',
	edge: 'out("ChildOf")'
    },
    'children': {
        model: FunctionFlat,
        className: 'Function',
        edge: 'in("ChildOf")'
    },
    'has_function': {
        model: FunctionFlat,
        className: 'Function',
        edge: 'in("HasFunction")'
    }
};

var Phenomenon = new Model(entityName, fields, relationships);

module.exports = Phenomenon;
