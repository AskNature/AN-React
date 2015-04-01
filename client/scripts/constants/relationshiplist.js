/**
* Relationship List constants
*     -- defines the action types and default values for a relationship list
*/
'use strict';

var keyMirror = require('keymirror');

var actions = keyMirror({
    FETCH_REL_LIST: null,
    FETCH_REL_LIST_SUCCESS: null,
    FETCH_REL_LIST_ERROR: null,
    INITIALIZE_REL_LIST: null
});

module.exports = actions;
