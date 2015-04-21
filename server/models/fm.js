// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');


var entityName = 'Function';

var fields = ['name', 'short_name', 'description', 'flag_text', 'flag_media', 'flag_tags'];

var Media = new Model('Media',
  [
    'filename',
    'name',
    'entity',
    'description'
  ]
);
var User = new Model('Users',
  [
    'name',
    'first',
    'last',
    'custom_avatar_url'
  ],
  {'out_HasMedia':
    {
      model: Media,
      className: 'Media',
      edge:'out("HasMedia")'
    }
  }
);
var FM = new Model('FM',
    [
        'name'
    ]
);
var Status = new Model('ContentStatus',
  [
      'masterid',
      'name'
  ]
);
var Entity = new Model('Entity',
    [
        'name',
        '@class'
  ]
);

var relationships = {
    'parent': {
	model: FM,
	className: 'Parent',
	edge: 'out("ChildOf")'
    },
    'children': {
        model: FM,
        className: 'Children',
        edge: 'in("ChildOf")'
    },
    'outcome': {
        model: Entity,
        className: 'Outcome',
        edge: 'in("HasFunction")'
    },
    'mechanism': {
        model: Entity,
        className: 'Mechanism',
        edge: 'in("HasMechanism")'
    },
    'status': {
        model: Status,
        className: 'ContentStatus',
        edge: 'out("HasStatus")',
        select: true,
        options: ListOptions.ContentStatus
    },
    'added_by': {
	model: User,
	className: 'Users',
	edge: 'in("AddedContent")'
    },
    'collaborators': {
	model: User,
	className: 'Users',
	edge: 'in("CollaboratedOn")'
    }

};

var data = new Model(entityName, fields, relationships);

module.exports = data;
