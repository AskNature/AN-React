'use strict';

var List = {
    'plural_name' : 'Users',
    'singular_name' : 'User',
    'slug': 'user',
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'username', displayName:'Username', type:'link'},
      {columnName:'firstName', displayName:'First Name', type:'text'},
      {columnName:'lastName', displayName:'Last Name', type:'text'},
      {columnName:'role', displayName:'Role', type:'text'},
      {columnName:'provider', displayName:'Provider', type:'text'}
    ],
    'initialSort' : [
      'masterid',
      true
    ],
};

module.exports = List;
