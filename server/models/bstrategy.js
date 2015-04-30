// Strategy model
'use strict';
var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Strategy';

var fields = ['name', 'summary', 'special_text', 'brief', 'timestamp', 'created_by', 'entered_by', 'date_entered', 'additional_functions', 'keywords', 'common_name', 'scientific_name', 'other_names', 'additional_taxa', 'additional_reference', 'applications_sector', 'applications', 'source', 'source_citation', 'pages_of_excerpt', 'image_file_name', 'video_url', 'pdf_file_name', 'application_1', 'application_2', 'application_3', 'editor_comments', 'other_names', 'additional_taxa', 'general_strategy', 'flag_text', 'flag_media', 'flag_tags'];

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
    'description',
    'media_url'
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
  ],
  {'out_HasMedia':
    {
      model: Media,
      className: 'Media',
      edge:'out("HasMedia")'
    }
  }
);
var LivingSystem = new Model('LivingSystem',
  [
    'name',
    'taxon',
    'common_name'
  ]
);
var Condition = new Model('Condition',
  [

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
    'inspired_by': {
	model: InspiredSolution,
	className: 'InspiredSolutions',
	edge: 'in("InspiredBy")'
    },
    'sources': {
	model: Source,
	className: 'Sources',
	edge: 'out("HasSource")'
    },
    'functions': {
	model: Entity,
	className: 'Function',
	edge: 'out("HasFunction")'
    },
    'experts': {
	model: Expert,
	className: 'Experts',
	edge: 'out("StudiedBy")'
    },
    'collectors': {
	model: User,
	className: 'Users',
	edge: 'in("Bookmarked")'
    },
    'media': {
	model: Media,
	className: 'Image',
	edge: 'out("HasMedia")'
    },
    'added_by': {
	model: User,
	className: 'Users',
	edge: 'in("AddedContent")'
    },
    'collaborators': {
	model: User,
	className: 'Users',
	edge: 'in("CollaboratedOn")'
    },
    'living_systems': {
	model: LivingSystem,
	className: 'LivingSystem',
	edge: 'out("HasLivingSystem")'
    },
    'mechanisms': {
	model: Entity,
	className: 'Function',
	edge: 'out("HasMechanism")'
    },
    'context': {
  model: Entity,
	className: 'Context',
	edge: 'out("HasContext")'
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
