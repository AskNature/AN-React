// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Source';

var fields = ['name', 'secondary_title', 'source', 'type', 'timestamp', 'authors', 'author_address', 'pages', 'volume', 'number', 'publication_year', 'publisher', 'isbn', 'accession_number', 'url', 'notes', 'access_date', 'keywords', 'abstract_excerpt', 'published_language', 'type_of_work', 'other_information', 'flag_text', 'flag_media', 'flag_tags', 'editor_notes'];

var Content = new Model('Content',
    [
        'name',
        '@class'
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
}

};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
