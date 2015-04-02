'use strict';

var List = {
    'plural_name' : 'Sources',
    'singular_name' : 'Source',
    'slug': 'source',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'status', displayName:'Status', type:'text'},
      {columnName:'type', displayName:'Source', type:'text'},
      {columnName:'featured_count', displayName:'Featured Count', type:'text'},
      {columnName:'featured_in', displayName:'Featured In', type:'list'},
      {columnName:'added', displayName:'Added By', type:'list'},
      {columnName:'timestamp', displayName:'Date Modified', type:'date'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
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
