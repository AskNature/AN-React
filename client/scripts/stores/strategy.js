/**
* Strategy store
*/
'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');

var _ = require('lodash');

/** Gets list of actions to listen for */
var strategyConstants = require('../constants/strategy');

/** Gets default values to be used until db action is completed */
var strategyDefaults = require('../constants/defaults').strategy;

var _data;
var _fieldsUpdated;

var StrategyStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  get: function() {
    return _data || strategyDefaults;
  }

});

/** Receives a payload from the dispatcher, matches the payload to one
* of the actions defined in Constants, assigns the result to the
* _focus variable, and emits a signal alerting the view (component) of
* the update.
*/
StrategyStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === strategyConstants.FETCH_STRATEGY_SUCCESS || action.actionType === strategyConstants.INITIALIZE_STRATEGY) {
      _data = action.data;
      StrategyStore.emitChange();
  } else if(action.actionType === strategyConstants.UPDATE_STRATEGY) {
      _.forEach(action.data, function(value, key) {
	  _fieldsUpdated.splice(0, 0, key);
      });
      _.assign(_data, action.data);
  } else if(action.actionType === strategyConstants.REMOVE_RELATIONSHIP_STRATEGY) {
      if(_data[action.field]) {
	  _data[action.field] = _.filter(_data[action.field], function(item) {
	      return item.masterid === action.data.masterid;
	  });
      }
  } else if(action.actionType === strategyConstants.ADD_RELATIONSHIP_STRATEGY) {
      if(_data[action.field]) {
	  _data[action.field].splice(0, 0, action.data);
      }
  }

});

module.exports = StrategyStore;
