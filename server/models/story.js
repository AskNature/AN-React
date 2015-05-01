// Strategy model
'use strict';
var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Story';

var fields = ['name', 'description', 'timestamp', 'flag_text', 'flag_media', 'flag_tags', 'flag_demo'];

// Models to link

var Expert = new Model('Expert',
  [
    'name',
    'institution'
  ]
);


var Source = new Model('Sources',
  [
    'name',
    'publication_year',
    'authors'
  ]
);
var Entity = new Model('Entity',
  [
    'name'
  ]
);
var Media = new Model('Media',
  [
    'filename',
    'name',
    'entity',
    'description'
  ]
);
var User = new Model('Users',
  [
    'name',
    'first',
    'last',
    'custom_avatar_url'
  ],
  {'out_HasMedia':
    {
      model: Media,
      className: 'Media',
      edge:'out("HasMedia")'
    }
  }
);
var InspiredSolution = new Model('InspiredSolutions',
  [
    'name'
  ]
);
var BSystem = new Model('LivingSystem',
  [
    'name',
    'taxon'
  ]
);
var DSystem = new Model('LivingSystem',
  [
    'name',
    'taxon'
  ]
);
var Status = new Model('ContentStatus',
  [
      'masterid',
      'name'
  ]
);


// The key is what's called by the client components. Model refers to the variables define above. className is the name of the class of the related item in OrientDB. Edge refers to the relationship in OrientDB.

var relationships = {
    'bsystems': {
	model: BSystem,
	className: 'LivingSystem',
	edge: 'out("HasLivingSystem")'
    },
    'dsystems': {
	model: Entity,
	className: 'DSystem',
	edge: 'out("HasDSystem")'
    },
    'contexts': {
	model: Entity,
	className: 'Context',
	edge: 'out("HasContext")'
    },
    'mechanisms': {
  model: Entity,
  className: 'Function',
  edge: 'out("HasMechanism")'
    },
    'functions': {
  model: Entity,
  className: 'Function',
  edge: 'out("HasFunction")'
    },
    'media': {
  model: Media,
  className: 'Image',
  edge: 'out("HasMedia")'
    },
    'bstrategy': {
  model: Entity,
  className: 'Strategy',
  edge: 'out("HasBStrategy")'
    },
    'dstrategy': {
  model: Entity,
  className: 'InspiredSolutions',
  edge: 'out("HasDStrategy")'
    },
    'source': {
	model: Expert,
	className: 'Source',
	edge: 'out("HasSource")'
    },
    'team': {
	model: Expert,
	className: 'Experts',
	edge: 'out("StudiedBy")'
    },
    'collectors': {
	model: User,
	className: 'Users',
	edge: 'in("Bookmarked")'
    },
    'added_by': {
	model: User,
	className: 'Users',
	edge: 'in("AddedContent")'
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
