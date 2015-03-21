// Phenomenon model
'use strict';

var Model = require('./model.js');

var entityName = 'Sources';

var fields = ['name', 'secondary_title', 'status', 'source', 'type', 'timestamp', 'authors', 'author_address', 'pages', 'volume', 'number', 'publication_year', 'publisher', 'isbn', 'accession_number', 'url', 'notes', 'access_date', 'keywords', 'abstract_excerpt', 'published_language', 'type_of_work', 'other_information'];

var Content = new Model('Function',
    [
        'name',
        'size()'
    ]
);
var User = new Model('Outcome',
    [
        'name'
    ]
);
var Collection = new Model('Mechanism',
    [
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
    }

};

var Source = new Model(entityName, fields, relationships);

module.exports = Source;
