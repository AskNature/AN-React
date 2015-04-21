// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Experts';

var fields = ['name', 'institution', 'timestamp', 'special_text', 'revision', 'timestamp', 'type', 'people', 'city', 'state', 'province', 'country', 'postal_code', 'url', 'flag_text', 'flag_media', 'flag_tags', 'editor_notes'];

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
var Content = new Model('Content',
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
    'studied_by': {
    	model: Content,
    	className: 'SuperStrategy',
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
