'use strict';

var List = {
    'plural_name' : 'Original Users',
    'singular_name' : 'Original User',
    'slug': '1user',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'first', displayName:'First Name', type:'text'},
      {columnName:'last', displayName:'Last Name', type:'text'},
      {columnName:'registration_date', displayName:'Registered On', type:'date'},
      {columnName:'status', displayName:'Status', type:'text'}
    ],
    'initialSort' : [
        'registration_date',
        false
    ],
    'thumb' : [
        'media',
        'media_id',
        'media_entity'
    ]
};

module.exports = List;
