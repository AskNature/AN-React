'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'LivingSystem';

var fields = ['name', 'taxon', 'common_name', 'gbif_id', 'other_names', 'taxon', 'parent_id', 'flag_text', 'flag_media', 'flag_tags', 'flag_demo', 'description'];

var Entity = new Model('Entity',
    [
        'name',
	'flag_demo'
    ]
);
var LivingSystem = new Model('Outcome',
    [
        'name', 'taxon',
        'flag_demo'
    ]
);
var Collection = new Model('Mechanism',
    [
        'name',
        'flag_demo'
    ]
);
var Status = new Model('ContentStatus',
  [
      'masterid',
      'name'
  ]
);
var Source = new Model('Source',
  [
      'name',
      'authors',
      'flag_demo'
  ]
);
var Team = new Model('Team',
  [
      'name',
      'flag_demo'
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
    },
    'out_studiedby': {
        model: Team,
        className: 'Team',
        edge: 'out("StudiedBy")'
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
