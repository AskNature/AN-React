'use strict';

var List = {
    'plural_name' : 'Media',
    'singular_name' : 'Media',
    'store' : require('../../stores/admin/media'),
    'actions' : require('../../actions/media'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'media', displayName:'Filename', type:'text'},
      {columnName:'timestamp', displayName:'Date Added', type:'date'},
    ],
    'initialSort' : [
        'timestamp',
        false
    ],
    'thumb' : [
        'media',
        'media_id',
        'media_entity'
    ]
};

module.exports = List;
