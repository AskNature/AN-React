/**
* Phenomenon store
*/
'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');

var _ = require('lodash');

/** Gets list of actions to listen for */
var phenomenonConstants = require('../constants/phenomenon');
var routesConstants = require('../constants/routes');

/** Gets default values to be used until db action is completed */
var phenomenonDefaults = require('../constants/defaults').phenomenonNew;

var _data;
var _fieldsUpdated;
var _error;
var _loaded;

var PhenomenonStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  get: function() {
    return _data || phenomenonDefaults;
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
PhenomenonStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === phenomenonConstants.FETCH_PHENOMENON_SUCCESS) {
      _loaded = true;
      _error = false;
      _data = action.data;
      PhenomenonStore.emitChange();
  } else if (action.actionType === phenomenonConstants.FETCH_PHENOMENON_ERROR) {
      _error = true;
      PhenomenonStore.emitChange();
  } else if(action.actionType === routesConstants.SET_CURRENT_ROUTE) {
      _loaded = false;
      _data = phenomenonDefaults;
      PhenomenonStore.emitChange();
  } else if (action.actionType === phenomenonConstants.INITIALIZE_PHENOMENON) {
      _data = action.data || phenomenonDefaults;
      PhenomenonStore.emitChange();
  } else if (action.actionType === phenomenonConstants.CREATE_PHENOMENON) {
      _data = phenomenonDefaults;
      _loaded = true;
      PhenomenonStore.emitChange();
  } else if(action.actionType === phenomenonConstants.UPDATE_PHENOMENON) {
      _.forEach(action.data, function(value, key) {
	  _fieldsUpdated = _.union(_fieldsUpdated, [key]);
      });
      _.assign(_data, action.data);
      PhenomenonStore.emitChange();
  } else if(action.actionType === phenomenonConstants.REMOVE_RELATIONSHIP_PHENOMENON) {
      if(_data[action.field]) {
	  _data[action.field] = _.reject(_data[action.field], function(item) {
	      return item.masterid === action.data.masterid;
	  });
	  _fieldsUpdated = _.union(_fieldsUpdated,[action.field]);
	  PhenomenonStore.emitChange();
      }
  } else if(action.actionType === phenomenonConstants.ADD_RELATIONSHIP_PHENOMENON) {
      if(_data[action.field]) {
	  _data[action.field].push(action.data);
	  _fieldsUpdated = _.union(_fieldsUpdated, [action.field]);
	  PhenomenonStore.emitChange();
      }
  } else if(action.actionType === phenomenonConstants.COMMIT_PHENOMENON_SUCCESS) {
      if(action.fields) {
	  _fieldsUpdated = _.difference(_fieldsUpdated, action.fields);
      } else {
	  _fieldsUpdated = [];
      }
      PhenomenonStore.emitChange();
  }

});

module.exports = PhenomenonStore;
