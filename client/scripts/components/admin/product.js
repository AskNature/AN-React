'use strict';

var List = {
    'plural_name' : 'Inspired Solutions',
    'singular_name' : 'Inspired Solution',
    'store' : require('../../stores/admin/products'),
    'actions' : require('../../actions/products'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'description', displayName:'Name', type:'link'},
      {columnName:'name', displayName:'System', type:'text'},
      {columnName:'inspiredby', displayName:'Inspiration', type:'list'},
      {columnName:'mechanisms', displayName:'Mechanisms', type:'list'},
      {columnName:'outcomes', displayName:'Outcomes', type:'list'},
      {columnName:'addedby', displayName:'Added By', type:'text'},
      {columnName:'timestamp', displayName:'Date Modified', type:'date'},
      {columnName:'status', displayName:'Status', type:'text'},
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
