'use strict';

var List = {
    'plural_name' : 'Sources',
    'singular_name' : 'Source',
    'store' : require('../../stores/admin/sources'),
    'actions' : require('../../actions/sources'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'status', displayName:'Status', type:'text'},
      {columnName:'type', displayName:'Source', type:'text'},
      {columnName:'featured_count', displayName:'Featured Count', type:'text'},
      {columnName:'featured_in', displayName:'Featured In', type:'list'},
      {columnName:'added', displayName:'Added By', type:'list'},
      {columnName:'timestamp', displayName:'Date Modified', type:'date'}
    ],
    'initialSort' : [
        'featured_count',
        true
    ],
    'thumb' : [
        'media',
        'media_id',
        'media_entity'
    ]
};

module.exports = List;
