/**
* Outcome constants -- defines the action types for the "outcome" area.
*/
'use strict';

var keyMirror = require('keymirror');

var itemConstants = keyMirror({

    FETCH_PRODUCT: null,
    FETCH_PRODUCT_SUCCESS: null,
    FETCH_PRODUCT_ERROR: null,
    INITIALIZE_PRODUCT: null,
    UPDATE_PRODUCT: null,
    COMMIT_PRODUCT: null,
    COMMIT_PRODUCT_SUCCESS: null,
    COMMIT_PRODUCT_ERROR: null,
    ADD_RELATIONSHIP_PRODUCT: null,
    REMOVE_RELATIONSHIP_PRODUCT: null,
    DELETE_PRODUCT_SUCCESS: null,
    CREATE_PRODUCT: null

});

module.exports = itemConstants;
