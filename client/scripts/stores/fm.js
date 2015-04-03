/**
* FM store
*/
'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');

var _ = require('lodash');

/** Gets list of actions to listen for */
var FMConstants = require('../constants/FM');
var routesConstants = require('../constants/routes');

/** Gets default values to be used until db action is completed */
var FMDefaults = require('../constants/defaults').FMNew;

var _data;
var _fieldsUpdated;
var _error;
var _loaded;

var FMStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  get: function() {
    return _data || FMDefaults;
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
FMStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === FMConstants.FETCH_FM_SUCCESS) {
      _loaded = true;
      _error = false;
      _data = action.data;
      FMStore.emitChange();
  } else if (action.actionType === FMConstants.FETCH_FM_ERROR) {
      _error = true;
      FMStore.emitChange();
  } else if(action.actionType === routesConstants.SET_CURRENT_ROUTE) {
      _loaded = false;
      _data = FMDefaults;
      FMStore.emitChange();
  } else if (action.actionType === FMConstants.INITIALIZE_FM) {
      _data = action.data || FMDefaults;
      FMStore.emitChange();
  } else if (action.actionType === FMConstants.CREATE_FM) {
      _data = FMDefaults;
      _loaded = true;
      FMStore.emitChange();
  } else if(action.actionType === FMConstants.UPDATE_FM) {
      _.forEach(action.data, function(value, key) {
	  _fieldsUpdated = _.union(_fieldsUpdated, [key]);
      });
      _.assign(_data, action.data);
      FMStore.emitChange();
  } else if(action.actionType === FMConstants.REMOVE_RELATIONSHIP_FM) {
      if(_data[action.field]) {
	  _data[action.field] = _.reject(_data[action.field], function(item) {
	      return item.masterid === action.data.masterid;
	  });
	  _fieldsUpdated = _.union(_fieldsUpdated,[action.field]);
	  FMStore.emitChange();
      }
  } else if(action.actionType === FMConstants.ADD_RELATIONSHIP_FM) {
      if(_data[action.field]) {
	  _data[action.field].push(action.data);
	  _fieldsUpdated = _.union(_fieldsUpdated, [action.field]);
	  FMStore.emitChange();
      }
  } else if(action.actionType === FMConstants.COMMIT_FM_SUCCESS) {
      if(action.fields) {
	  _fieldsUpdated = _.difference(_fieldsUpdated, action.fields);
      } else {
	  _fieldsUpdated = [];
      }
      FMStore.emitChange();
  }

});

module.exports = FMStore;
