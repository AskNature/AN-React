// Phenomenon model
'use strict';

var Model = require('./model.js');

var entityName = 'LivingSystem';

var fields = ['name', 'taxon', 'common_name', 'gbif_id', 'other_names', 'taxon', 'parent_id'];

var Entity = new Model('Entity',
    [
        'name'
    ]
);
var LivingSystem = new Model('Outcome',
    [
        'name'
    ]
);
var Collection = new Model('Mechanism',
    [
        'name'
    ]
);



var relationships = {
    'has_livingsystem': {
	model: Entity,
	className: 'Entity',
	edge: 'in("HasLivingSystem")'
    },
    'parent': {
        model: LivingSystem,
        className: 'LivingSystem',
        edge: 'out("ChildSystemOf")'
    },
    'children': {
        model: LivingSystem,
        className: 'LivingSystem',
        edge: 'in("ChildSystemOf")'
    }

};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
