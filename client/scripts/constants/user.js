/**
* User constants -- defines the action types for the "user" area.
*/
'use strict';

var keyMirror = require('keymirror');

var itemConstants = keyMirror({

  // Strategy action types
  SET_USER: null,
  GET_USER: null,
  GET_ALL_USERS: null


});

module.exports = itemConstants;
