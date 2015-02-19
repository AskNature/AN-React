/**
* Strategy Detail store
*/
'use strict';

var Store = require('../default');
var Dispatcher = require('../../dispatchers/default');

/** Gets list of actions to listen for */
var focusConstants = require('../../constants/source');

/** Gets default values to be used until db action is completed */
var focusDefaults = require('../../constants/defaults').source;

var _focus;

var FocusStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  get: function() {
    return _focus || focusDefaults;
  }

});

/** Receives a payload from the dispatcher, matches the payload to one
* of the actions defined in Constants, assigns the result to the
* _focus variable, and emits a signal alerting the view (component) of
* the update.
*/
FocusStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === focusConstants.GET_SOURCE) {
    _focus = action.focus;

    FocusStore.emitChange();
  }

});

module.exports = FocusStore;
