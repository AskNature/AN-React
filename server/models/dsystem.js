// Phenomenon model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'DSystem';

var fields = ['name', 'flag_text', 'flag_media', 'flag_tags', 'description'];

var Entity = new Model('Entity',
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
    'has_dsystem': {
	model: Entity,
	className: 'Entity',
	edge: 'in("HasDesignedSystem")'
    },
    'status': {
    model: Status,
    className: 'ContentStatus',
    edge: 'out("HasStatus")',
    select: true,
    options: ListOptions.ContentStatus
    }

};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
