'use strict';

var List = {

    'plural_name' : 'Contexts',
    'singular_name' : 'Context',
    'slug': 'context',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'status', displayName:'Status', type:'text'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ]

};

module.exports = List;
