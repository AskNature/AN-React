// Phenomenon model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');


var entityName = 'Function';

var fields = ['name', 'short_name', 'description', 'flag_text', 'flag_media', 'flag_tags'];

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
var Status = new Model('ContentStatus',
  [
      'masterid',
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
    'status': {
        model: Status,
        className: 'ContentStatus',
        edge: 'out("HasStatus")',
        select: true,
        options: ListOptions.ContentStatus
    }

};

var Phenomenon = new Model(entityName, fields, relationships);

module.exports = Phenomenon;
