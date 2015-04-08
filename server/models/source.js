// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Source';

var fields = ['name', 'secondary_title', 'source', 'type', 'timestamp', 'authors', 'author_address', 'pages', 'volume', 'number', 'publication_year', 'publisher', 'isbn', 'accession_number', 'url', 'notes', 'access_date', 'keywords', 'abstract_excerpt', 'published_language', 'type_of_work', 'other_information', 'flag_text', 'flag_media', 'flag_tags'];

var Content = new Model('Content',
    [
        'name'
    ]
);
var User = new Model('User',
    [
        'name'
    ]
);
var Collection = new Model('Collection',
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
var FM = new Model('FM',
  [
    'name'
  ]
);

var Condition = new Model('Condition',
  [
'name'
  ]
);


var relationships = {
    'featured_in': {
	model: Content,
	className: 'FeaturedIn',
	edge: 'in("HasSource")'
    },
    'collection': {
        model: Content,
        className: 'Collection',
        edge: 'in("Bookmarked")'
    },
    'functions': {
  model: Content,
  className: 'FM',
  edge: 'out("HasFunction")'
    },

    'mechanisms': {
	model: Content,
	className: 'FM',
	edge: 'out("HasMechanism")'
    },
    'conditions': {
  model: Content,
	className: 'Condition',
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
