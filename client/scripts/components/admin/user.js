'use strict';

var List = {
    'plural_name' : 'Users',
    'singular_name' : 'User',
    'store' : require('../../stores/admin/users'),
    'actions' : require('../../actions/users'),
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
