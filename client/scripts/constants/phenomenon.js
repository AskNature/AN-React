/**
* Phenomena constants -- defines the action types for the "outcome" area.
*/
'use strict';

var keyMirror = require('keymirror');

var itemConstants = keyMirror({

  // Outcome action types
  GET_ALL_PHENOMENA: null,

  FETCH_PHENOMENON: null,
  FETCH_PHENOMENON_SUCCESS: null,
  FETCH_PHENOMENON_ERROR: null,
  INITIALIZE_PHENOMENON: null,
  UPDATE_PHENOMENON: null,
  COMMIT_PHENOMENON: null,
  COMMIT_PHENOMENON_SUCCESS: null,
  COMMIT_PHENOMENON_ERROR: null,
  ADD_RELATIONSHIP_PHENOMENON: null,
  REMOVE_RELATIONSHIP_PHENOMENON: null,
  DELETE_PHENOMENON_SUCCESS: null,
  CREATE_PHENOMENON: null

});

module.exports = itemConstants;
