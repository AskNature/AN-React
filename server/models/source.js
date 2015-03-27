// Phenomenon model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Sources';

var fields = ['name', 'secondary_title', 'source', 'type', 'timestamp', 'authors', 'author_address', 'pages', 'volume', 'number', 'publication_year', 'publisher', 'isbn', 'accession_number', 'url', 'notes', 'access_date', 'keywords', 'abstract_excerpt', 'published_language', 'type_of_work', 'other_information', 'flag_text', 'flag_media', 'flag_tags'];

var Content = new Model('Content',
    [
        'name',
        'size()'
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


var relationships = {
    'featured_in': {
	model: Content,
	className: 'FeaturedIn',
	edge: 'in("FeaturedIn")'
    },
    'owner': {
        model: User,
        className: 'Added',
        edge: 'in("Added")'
    },
    'collection': {
        model: Collection,
        className: 'Collection',
        edge: 'in("Bookmarked")'
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
