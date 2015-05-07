// Strategy model
'use strict';
var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Strategy';

var fields = ['name', 'summary', 'special_text', 'brief', 'timestamp', 'created_by', 'entered_by', 'date_entered', 'additional_functions', 'keywords', 'common_name', 'scientific_name', 'other_names', 'additional_taxa', 'additional_reference', 'applications_sector', 'applications', 'source', 'source_citation', 'pages_of_excerpt', 'image_file_name', 'video_url', 'pdf_file_name', 'application_1', 'application_2', 'application_3', 'editor_comments', 'other_names', 'additional_taxa', 'general_strategy', 'flag_text', 'flag_media', 'flag_tags', 'flag_demo'];

// Models to link

var Expert = new Model('Expert',
  [
    'name',
    'institution',
    'flag_demo'
  ]
);


var Source = new Model('Sources',
  [
    'name',
    'publication_year',
    'authors',
    'flag_demo'
  ]
);
var Entity = new Model('Entity',
  [
    'name',
    'flag_demo',
    '@class'
  ]
);
var License = new Model('License',
  [
    'info_url',
    'name',
    'masterid'
  ]
);
// NOTE: this is only here to serve the in_AddedMedia request in the Media model:
var UserMedia = new Model('UserMedia',
  [
    'name',
    'first',
    'last',
    'custom_avatar_url',
    'flag_demo'
  ]
);
var Media = new Model('Media',
  [
    'filename',
    'name',
    'entity',
    'description',
    'media_url',
    'flag_demo',
    'source_url',
    'author'
  ],
  // NOTE: this doesn't return values:
  {'out_HasLicense':
    {
      model: License,
      className: 'License',
      edge: 'out("HasLicense")'
    }
  },
  // NOTE: this doesn't even return an object:
  {'in_AddedMedia':
    {
      model: UserMedia,
      className: 'Users',
      edge: 'both("AddedMedia")'
    }
  }
);
var User = new Model('Users',
  [
    'name',
    'first',
    'last',
    'custom_avatar_url',
    'flag_demo'
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
    'name',
    'flag_demo'
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
    'common_name',
    'flag_demo'
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
    'stories': {
	model: Entity,
	className: 'Story',
	edge: 'in("HasBStrategy")'
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
    'collections': {
	model: Entity,
	className: 'Content',
	edge: 'out("InCollection")'
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
