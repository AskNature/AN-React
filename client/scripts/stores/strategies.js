/**
* Strategy store
*/
'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');

var _ = require('lodash');

/** Gets list of actions to listen for */
var strategyConstants = require('../constants/strategy');
var routesConstants = require('../constants/routes');

/** Gets default values to be used until db action is completed */
var strategyDefaults = require('../constants/defaults').strategyNew;

var _data;
var _fieldsUpdated;
var _error;
var _loaded;

var StrategyStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  get: function() {
    return _data || strategyDefaults;
  },
  getMasterid: function() {
    return _data.masterid;
  },
  getUpdatedFields: function() {
    return _fieldsUpdated;
  },
  getError: function() {
    return _error;
  },
  getLoaded: function() {
    return _loaded;
  }
});

/** Receives a payload from the dispatcher, matches the payload to one
* of the actions defined in Constants, assigns the result to the
* _focus variable, and emits a signal alerting the view (component) of
* the update.
*/
StrategyStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === strategyConstants.FETCH_STRATEGY_SUCCESS) {
      _loaded = true;
      _error = false;
      _data = action.data;
      StrategyStore.emitChange();
  } else if (action.actionType === strategyConstants.FETCH_STRATEGY_ERROR) {
      _error = true;
      StrategyStore.emitChange();
  } else if(action.actionType === routesConstants.SET_CURRENT_ROUTE) {
      _loaded = false;
      _data = strategyDefaults;
      StrategyStore.emitChange();
  } else if (action.actionType === strategyConstants.INITIALIZE_STRATEGY) {
      _data = action.data || strategyDefaults;
      StrategyStore.emitChange();
  } else if(action.actionType === strategyConstants.UPDATE_STRATEGY) {
      _.forEach(action.data, function(value, key) {
	  _fieldsUpdated = _.union(_fieldsUpdated, [key]);
      });
      _.assign(_data, action.data);
      StrategyStore.emitChange();
  } else if(action.actionType === strategyConstants.REMOVE_RELATIONSHIP_STRATEGY) {
      if(_data[action.field]) {
	  _data[action.field] = _.reject(_data[action.field], function(item) {
	      return item.masterid === action.data.masterid;
	  });
	  _fieldsUpdated = _.union(_fieldsUpdated,[action.field]);
	  StrategyStore.emitChange();
      }
  } else if(action.actionType === strategyConstants.ADD_RELATIONSHIP_STRATEGY) {
      if(_data[action.field]) {
	  _data[action.field].push(action.data);
	  _fieldsUpdated = _.union(_fieldsUpdated, [action.field]);
	  StrategyStore.emitChange();
      }
  } else if(action.actionType === strategyConstants.COMMIT_STRATEGY_SUCCESS) {
      if(action.fields) {
	  _fieldsUpdated = _.difference(_fieldsUpdated, action.fields);
      } else {
	  _fieldsUpdated = [];
      }
      StrategyStore.emitChange();
  }

});

module.exports = StrategyStore;
