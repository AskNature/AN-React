'use strict';

var List = {
    'plural_name' : 'Researchers',
    'singular_name' : 'Researcher',
    'slug': 'researcher',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'institution', displayName:'Institution', type:'text'},
      {columnName:'country', displayName:'Country', type:'text'},
      {columnName:'studied_by', displayName:'Referenced By', type:'list'},
      {columnName:'timestamp', displayName:'Date Modified', type:'date'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
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
