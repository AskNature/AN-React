// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Source';

var fields = ['name', 'secondary_title', 'source', 'type', 'timestamp', 'authors', 'author_address', 'pages', 'volume', 'number', 'publication_year', 'publisher', 'isbn', 'accession_number', 'url', 'notes', 'access_date', 'keywords', 'abstract_excerpt', 'published_language', 'type_of_work', 'other_information', 'flag_text', 'flag_media', 'flag_tags', 'flag_demo', 'editor_notes'];

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
var Content = new Model('Content',
    [
        'name',
        '@class',
	'flag_demo'
    ]
);

var Status = new Model('ContentStatus',
  [
      'masterid',
      'name'
  ]
);


var relationships = {
    'has_source': {
	model: Content,
	className: 'SuperStrategy',
	edge: 'in("HasSource")'
    },

    'functions': {
  model: Content,
  className: 'Function',
  edge: 'out("HasFunction")'
    },

    'mechanisms': {
	model: Content,
	className: 'Function',
	edge: 'out("HasMechanism")'
    },
    'context': {
  model: Content,
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

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
