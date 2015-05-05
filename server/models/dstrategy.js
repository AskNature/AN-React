// Product model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'InspiredSolutions';

var fields = ['name', 'description', 'system', 'summary', 'challenges_solved', 'how_is_it_different', 'biomimicry_story', 'product_type', 'patent_name', 'availability', 'company', 'phase', 'patent_number', 'company_website', 'strategy', 'consumer_products', 'keywords', 'timestamp', 'flag_text', 'flag_media', 'flag_tags'];

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
var Strategy = new Model('Strategies',
    [
        'name',
        'summary'
    ]
);
var Source = new Model('Sources',
    [
        'name',
        'publication_year',
        'authors'
    ]
);
var Concept = new Model('Concept',
    [
        'name'
    ]
);
var Expert = new Model('Expert',
    [
        'name',
        'institution'
    ]
);

var DesignedSystem = new Model('DesignedSystem',
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
    'strategies': {
        model: Strategy,
        className: 'Strategy',
        edge: 'out("InspiredBy")'
    },
    'collectors': {
        model: User,
        className: 'Users',
        edge: 'in("Bookmarked")'
    },
    'media': {
        model: Media,
        className: 'Media',
        edge: 'out("HasMedia")'
    },
    'studied_by': {
        model: Expert,
        className: 'Expert',
        edge: 'out("StudiedBy")'
    },
    'has_source': {
        model: Source,
        className: 'Sources',
        edge: 'out("HasSource")'
    },
    'mechanisms': {
        model: Concept,
        className: 'Function',
        edge: 'out("HasMechanism")'
    },
    'designedsystems' : {
	model: DesignedSystem,
	className: 'DSystem',
	edge: 'out("HasDSystem")'
    },
    'functions': {
        model: Concept,
        className: 'Function',
        edge: 'out("HasFunction")'
    },
    'context': {
        model: Concept,
        className: 'Context',
        edge: 'out("HasContext")'
    },
    'status': {
        model: Status,
        className: 'ContentStatus',
        edge: 'out("HasStatus")',
        select: true,
        options: ListOptions.ContentStatus
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
    }
};

var Product = new Model(entityName, fields, relationships);

module.exports = Product;
