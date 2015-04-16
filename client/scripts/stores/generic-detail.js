
/**
* Detail store
*/
'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');

var _ = require('lodash');

/** Gets list of actions to listen for */
var Constants = require('../constants/generic-actions');
var routesConstants = require('../constants/routes');

/** Gets default values to be used until db action is completed */
var Defaults = require('../constants/generic-defaults').entity;

var slug = require('slug');

var _data;
var _type;
var _fieldsUpdated;
var _error;
var _loaded;
var _new = false;

var ThisStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  get: function() {
    return _data || Defaults;
  },
  getMasterid: function() {
    return _data.masterid;
  },
  getEntityType: function() {
    return _type;
  },
  getUpdatedFields: function() {
    return _fieldsUpdated;
  },
  getError: function() {
    return _error;
  },
  getLoaded: function() {
    return _loaded;
  },
  isNew: function() {
    return _new;
  }
});

/** Receives a payload from the dispatcher, matches the payload to one
* of the actions defined in Constants, assigns the result to the
* _focus variable, and emits a signal alerting the view (component) of
* the update.
*/
ThisStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === Constants.FETCH_SUCCESS) {
      _loaded = true;
      _error = false;
      _data = action.data;
      _type = action.entityType;
      ThisStore.emitChange();
  } else if (action.actionType === Constants.FETCH_ERROR) {
      _error = true;
      ThisStore.emitChange();
  } else if (action.actionType === Constants.FETCH) {
      _loaded = false;
      _error = false;
      _data = Defaults;
      _type = action.entityType;
      ThisStore.emitChange();
  } else if(action.actionType === routesConstants.SET_CURRENT_ROUTE) {
      _loaded = false;
      _data = Defaults;
      ThisStore.emitChange();
  } else if (action.actionType === Constants.INITIALIZE) {
      _data = action.data || Defaults;
      ThisStore.emitChange();
  } else if (action.actionType === Constants.CREATE) {
      _data = Defaults;
      _loaded = true;
      _type = action.entityType;
      _new = true;
      ThisStore.emitChange();
  } else if(action.actionType === Constants.UPDATE) {
      _.forEach(action.data, function(value, key) {
 _fieldsUpdated = _.union(_fieldsUpdated, [key]);
	  if(key === 'name' && _new) {
	      console.log('store got updated name');
	      _fieldsUpdated = _.union(_fieldsUpdated, ['masterid']);
	      _data.masterid = slug(action.data[key]).toLowerCase();
	  }
      });
      _.assign(_data, action.data);
      ThisStore.emitChange();

  } else if(action.actionType === Constants.REMOVE_RELATIONSHIP) {
      if(_data[action.field]) {
 _data[action.field] = _.reject(_data[action.field], function(item) {
     return item.masterid === action.data.masterid;
 });
 _fieldsUpdated = _.union(_fieldsUpdated,[action.field]);
    ThisStore.emitChange();
      }
  } else if(action.actionType === Constants.ADD_RELATIONSHIP) {
      if(_data[action.field]) {
 _data[action.field].push(action.data);
 console.log('stores/generic-detail: ADD_RELATIONSHIP to ' + action.data.name + ':');
 console.log(_data[action.field]);
 _fieldsUpdated = _.union(_fieldsUpdated, [action.field]);
    ThisStore.emitChange();
      }
  } else if(action.actionType === Constants.SET_RELATIONSHIP) {
      if(_data[action.field]) {
	  _data[action.field].masterid = action.data;
	  console.log('stores/generic-detail: SET_RELATIONSHIP to ' + action.data + ':');
	  console.log(_data[action.field]);
	  _fieldsUpdated = _.union(_fieldsUpdated, [action.field]);
	  ThisStore.emitChange();
      }
  } else if(action.actionType === Constants.COMMIT_SUCCESS) {
      if(action.fields) {
 _fieldsUpdated = _.difference(_fieldsUpdated, action.fields);
      } else {
 _fieldsUpdated = [];
      }
      ThisStore.emitChange();
  } else if (action.actionType === Constants.GET_ALL) {
    _data = action.focus;

    ThisStore.emitChange();
  }

});

module.exports = ThisStore;
