'use strict';

var List = {

    'plural_name' : 'Living Systems',
    'singular_name' : 'Living System',
    'store' : require('../../stores/admin/livingsystems'),
    'actions' : require('../../actions/livingsystems'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'taxon', displayName:'Taxon', type:'id'},
      {columnName:'name', displayName:'Latin Name', type:'link'},
      {columnName:'flag_text', displayName:'Text', type:'boolean'},
      {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
      {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ]
};

module.exports = List;
