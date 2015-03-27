'use strict';

var List = {

    'plural_name' : 'Context',
    'singular_name' : 'Context',
    'store' : require('../../stores/admin/conditions'),
    'actions' : require('../../actions/conditions'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
    ]

};

module.exports = List;
