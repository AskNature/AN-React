/**
* Outcome store
*/
'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');

/** Gets list of actions to listen for */
var outcomeConstants = require('../constants/outcome');

/** Gets default values to be used until db action is completed */
var outcomeDefaults = require('../constants/defaults').outcome;

var _outcome;

var OutcomeStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  getOutcomes: function() {
    return _outcome || outcomeDefaults;
  }

});

/** Receives a payload from the dispatcher, matches the payload to one
* of the actions defined in outcomeConstants, assigns the result to the
* _outcome variable, and emits a signal alerting the view (component) of
* the update.
*/
OutcomeStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === outcomeConstants.SET_CURRENT_OUTCOME) {
    _outcome = action.outcome;

    OutcomeStore.emitChange();
  }

});

module.exports = OutcomeStore;
