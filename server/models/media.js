// Phenomenon model
'use strict';

var Model = require('./model.js');

var entityName = 'Media';

var fields = ['name', 'filename', 'id', 'entity', 'timestamp', 'user_id', 'mime_type', 'file_type_id', 'author', 'author_url', 'source', 'source_url', 'license_id', 'description', 'deleted', 'keywords', 'featured', 'popup', 'sort_order'];

var Entity = new Model('Entity',
    [
        'name'
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
    'has_media': {
	model: Entity,
	className: 'Entity',
	edge: 'in("HasMedia")'
    },
    'added_media': {
        model: User,
        className: 'User',
        edge: 'in("AddedMedia")'
    }
};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
