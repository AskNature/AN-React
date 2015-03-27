'use strict';

var List = {
    'plural_name' : 'Researchers',
    'singular_name' : 'Researcher',
    'store' : require('../../stores/admin/researchers'),
    'actions' : require('../../actions/researchers'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'institution', displayName:'Institution', type:'text'},
      {columnName:'country', displayName:'Country', type:'text'},
      {columnName:'studied_by', displayName:'Referenced By', type:'list'},
      {columnName:'timestamp', displayName:'Date Modified', type:'date'}
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
