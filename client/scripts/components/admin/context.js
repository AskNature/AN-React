'use strict';

var List = {

    'plural_name' : 'Context',
    'singular_name' : 'Context',
    'slug': 'condition',
    'store' : require('../../stores/admin/conditions'),
    'actions' : require('../../actions/conditions'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ]

};

module.exports = List;
