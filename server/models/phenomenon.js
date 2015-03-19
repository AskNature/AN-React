// Phenomenon model
'use strict';

var Model = require('./model.js');

var entityName = 'Function';

var FunctionFlat = new Model('Function', ['name']);
var Outcome = new Model('Outcome', ['name']);
var Mechanism = new Model('Mechanism', ['name']);

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
    'outcome': {
        model: FunctionFlat,
        className: 'Outcome',
        edge: 'in("HasFunction")'
    },
    'mechanism': {
        model: FunctionFlat,
        className: 'Mechanism',
        edge: 'in("HasMechanism")'
    },

};

var Phenomenon = new Model(entityName, fields, relationships);

module.exports = Phenomenon;
