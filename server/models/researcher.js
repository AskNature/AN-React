// Phenomenon model
'use strict';

var Model = require('./model.js');

var entityName = 'Experts';

var fields = ['name', 'institution', 'timestamp', 'special_text', 'revision', 'status', 'timestamp', 'type', 'people', 'city', 'state', 'province', 'country', 'postal_code', 'url'];

var Content = new Model('Content',
    [
        'name',
    ]
);
var Collection = new Model('Collection',
    [
        'name'
    ]
);



var relationships = {
    'studied_by': {
    	model: Content,
    	className: 'StudiedBy',
    	edge: 'in("StudiedBy")'
    },
    'collected': {
        model: Collection,
        className: 'Collection',
        edge: 'in("Bookmarked")'
    }

};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
