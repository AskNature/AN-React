'use strict';

var List = {
    'plural_name' : 'Designed Systems',
    'singular_name' : 'Designed System',
    'slug': 'designed_system',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ]
};

module.exports = List;
