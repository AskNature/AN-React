'use strict';

var List = {
    'plural_name' : 'Sources',
    'singular_name' : 'Source',
    'slug': 'source',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'status', displayName:'Status', type:'text'},
      {columnName:'type', displayName:'Type', type:'text'},
      {columnName:'has_source', displayName:'Featured In', type:'list'},
      {columnName:'timestamp', displayName:'Date Modified', type:'date'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ],
    'initialSort' : [
        'masterid',
        false
    ],
    'thumb' : [
        'media',
        'media_id',
        'media_entity'
    ]
};

module.exports = List;
