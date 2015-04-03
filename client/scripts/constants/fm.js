/**
* Phenomena constants -- defines the action types for the "outcome" area.
*/
'use strict';

var keyMirror = require('keymirror');

var itemConstants = keyMirror({

  // Outcome action types
  GET_ALL_FM: null,

  FETCH_FM: null,
  FETCH_FM_SUCCESS: null,
  FETCH_FM_ERROR: null,
  INITIALIZE_FM: null,
  UPDATE_FM: null,
  COMMIT_FM: null,
  COMMIT_FM_SUCCESS: null,
  COMMIT_FM_ERROR: null,
  ADD_RELATIONSHIP_FM: null,
  REMOVE_RELATIONSHIP_FM: null,
  DELETE_FM_SUCCESS: null,
  CREATE_FM: null

});

module.exports = itemConstants;
