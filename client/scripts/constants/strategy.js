/**
* Strategy constants
*     -- defines the action types and default values for individual Strategies.
*/
'use strict';

var keyMirror = require('keymirror');

var actions = keyMirror({
    FETCH_STRATEGY: null,
    FETCH_STRATEGY_SUCCESS: null,
    FETCH_STRATEGY_ERROR: null,
    INITIALIZE_STRATEGY: null,
    UPDATE_STRATEGY: null,
    COMMIT_STRATEGY: null,
    COMMIT_STRATEGY_SUCCESS: null,
    COMMIT_STRATEGY_ERROR: null,
    ADD_RELATIONSHIP_STRATEGY: null,
    REMOVE_RELATIONSHIP_STRATEGY: null,
    DELETE_STRATEGY_SUCCESS: null
});

module.exports = actions;
