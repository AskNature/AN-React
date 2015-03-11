/**
* Strategy store
*/
'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');

var _ = require('lodash');

/** Gets list of actions to listen for */
var relationshipListConstants = require('../constants/relationshiplist');

/** Gets default values to be used until db action is completed */
var relationshipListDefaults = require('../constants/defaults').relationshipList;

var _relationships;

var RelationshipListStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  get: function() {
    return _relationships || relationshipListDefaults;
  }

});

/** Receives a payload from the dispatcher, matches the payload to one
* of the actions defined in Constants, assigns the result to the
* _focus variable, and emits a signal alerting the view (component) of
* the update.
*/
RelationshipListStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === relationshipListConstants.FETCH_REL_LIST_SUCCESS) {
      _relationships = action.data;
      RelationshipListStore.emitChange();
  } else if(action.actionType === relationshipListConstants.FETCH_REL_LIST || relationshipListConstants.INITIALIZE_REL_LIST) {
      _relationships = relationshipListDefaults;
      RelationshipListStore.emitChange();
  }
});

module.exports = RelationshipListStore;
