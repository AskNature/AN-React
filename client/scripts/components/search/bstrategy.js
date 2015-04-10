'use strict';

var List = {

    'plural_name' : 'Biological Strategies',
    'singular_name' : 'Biological Strategy',
    'slug': 'b.strategy',
    'columns' : [
        {columnName:'masterid', displayName:'id', type:'hidden'},
        {columnName:'name', displayName:'Name', type:'link'},

    ],
    'thumb' : [
        'media',
        'media_entity'
    ]
};

module.exports = List;
