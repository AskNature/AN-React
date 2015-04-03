'use strict';

var List = {
    'plural_name' : 'Functions & Mechanisms',
    'singular_name' : 'Function & Mechanism',
    'slug': 'fm',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'parent', displayName:'Parent', type:'text'},
      {columnName:'short_name', displayName:'Short Name', type:'text'},
      {columnName:'child_items', displayName:'Children', type:'list'},
      {columnName:'outcome_count', displayName:'Outcome Count', type:'text'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ],
    'thumb' : [
        'media',
        'media_id',
        'media_entity'
    ]
};

module.exports = List;
