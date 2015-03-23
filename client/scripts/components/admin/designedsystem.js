'use strict';

var List = {
    'plural_name' : 'Designed Systems',
    'singular_name' : 'Designed System',
    'store' : require('../../stores/admin/designedsystems'),
    'actions' : require('../../actions/designedsystems'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
    ]
};

module.exports = List;
