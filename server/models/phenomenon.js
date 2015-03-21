// Phenomenon model
'use strict';

var Model = require('./model.js');

var entityName = 'Function';

var fields = ['name', 'short_name', 'description'];

var Function = new Model('Function',
    [
        'name'
    ]
);
var Outcome = new Model('Outcome',
    [
        'name'
    ]
);
var Mechanism = new Model('Mechanism',
    [
        'name'
    ]
);



var relationships = {
    'parent': {
	model: Function,
	className: 'Parent',
	edge: 'out("ChildOf")'
    },
    'children': {
        model: Function,
        className: 'Children',
        edge: 'in("ChildOf")'
    },
    'outcome': {
        model: Function,
        className: 'Outcome',
        edge: 'in("HasFunction")'
    },
    'mechanism': {
        model: Function,
        className: 'Mechanism',
        edge: 'in("HasMechanism")'
    },

};

var Phenomenon = new Model(entityName, fields, relationships);

module.exports = Phenomenon;
