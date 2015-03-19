/**
* User constants -- defines the action types for the "user" area.
*/
'use strict';

var keyMirror = require('keymirror');

var itemConstants = keyMirror({

  // Strategy action types
  FETCH_USER: null,
  FETCH_USER_SUCCESS: null,
  FETCH_USER_ERROR: null,
  INITIALIZE_USER: null,
  UPDATE_USER: null,
  COMMIT_USER: null,
  COMMIT_USER_SUCCESS: null,
  COMMIT_USER_ERROR: null,
  ADD_RELATIONSHIP_USER: null,
  REMOVE_RELATIONSHIP_USER: null,
  DELETE_USER_SUCCESS: null,
  CREATE_USER: null
});

module.exports = itemConstants;
