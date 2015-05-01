// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');


// The name of the associated class in the database:
var entityName = 'Collection';

var fields = ['name', 'description', 'flag_text', 'flag_media', 'flag_tags', 'flag_demo'];

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
  // This ultimately needs to be tied to the @Content class.
  'in_collection': {
  model: Entity,
  className: 'SuperStrategy',
  edge: 'in("InCollection")'
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
