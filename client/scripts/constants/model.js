/**
* Generalized constants
*  -- defines the action types and default values for individual entities.
*/
'use strict';

var keyMirror = require('keymirror');

var actions = keyMirror({
    FETCH: null,
    FETCH_SUCCESS: null,
    FETCH_ERROR: null,
    INITIALIZE: null,
    UPDATE: null,
    COMMIT: null,
    COMMIT_SUCCESS: null,
    COMMIT_ERROR: null,
    ADD_RELATIONSHIP: null,
    REMOVE_RELATIONSHIP: null,
    DELETE_SUCCESS: null,
    CREATE: null
});

module.exports = actions;
