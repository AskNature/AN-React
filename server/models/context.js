'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');


// The name of the associated class in the database:
var entityName = 'Context';

var fields = ['name', 'description', 'flag_text', 'flag_media', 'flag_tags', 'editor_comments'];

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
var Context = new Model('Context',
    [
        'name'
    ]
);
var Entity = new Model('Entity',
    [
        'name',
        '@class'
    ]
);
var Status = new Model('ContentStatus',
  [
      'masterid',
      'name'
  ]
);

var relationships = {
    'parent': {
	model: Context,
	className: 'Context',
	edge: 'out("ChildOf")'
    },
    'children': {
        model: Context,
        className: 'Context',
        edge: 'in("ChildOf")'
    },
    'has_context': {
        model: Entity,
        className: 'SuperStrategy',
        edge: 'in("HasContext")'
    },
    'has_source': {
        model: Entity,
        className: 'Source',
        edge: 'out("HasSource")'
    },
    'studied_by': {
        model: Entity,
        className: 'Experts',
        edge: 'in("StudiedBy")'
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


var Data = new Model(entityName, fields, relationships);

module.exports = Data;
