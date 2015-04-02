'use strict';

var List = {

    'plural_name' : 'Collections',
    'singular_name' : 'Collection',
    'slug': 'collection',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ]

};

module.exports = List;
