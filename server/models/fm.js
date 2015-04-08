// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');


var entityName = 'Function';

var fields = ['name', 'short_name', 'description', 'flag_text', 'flag_media', 'flag_tags'];

var FM = new Model('FM',
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
var Entity = new Model('Entity',
    [
        'name',
        '@class'
  ]
);

var relationships = {
    'parent': {
	model: FM,
	className: 'Parent',
	edge: 'out("ChildOf")'
    },
    'children': {
        model: FM,
        className: 'Children',
        edge: 'in("ChildOf")'
    },
    'outcome': {
        model: Entity,
        className: 'Outcome',
        edge: 'in("HasFunction")'
    },
    'mechanism': {
        model: Entity,
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

var data = new Model(entityName, fields, relationships);

module.exports = data;
