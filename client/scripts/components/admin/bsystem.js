'use strict';

var List = {

    'plural_name' : 'Biological Systems',
    'singular_name' : 'Biological System',
    'slug': 'b.system',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'taxon', displayName:'Taxon', type:'text'},
      {columnName:'name', displayName:'Latin Name', type:'link'}
  ],
  'thumb' : [
      'media',
      'media_entity'
  ]
};

module.exports = List;
