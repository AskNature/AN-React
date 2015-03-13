/**
* Product store
*/
'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');

var _ = require('lodash');

/** Gets list of actions to listen for */
var productConstants = require('../constants/product');
var routesConstants = require('../constants/routes');

/** Gets default values to be used until db action is completed */
var productDefaults = require('../constants/defaults').productNew;

var _data;
var _fieldsUpdated;
var _error;
var _loaded;

var ProductStore = new Store({

/** getOutcomes is called by the getState function in
* ../components/modules/outcomefilter and returns the response from the
* completed action below if there is one, or default values if the action
* hasn't completed. */
  get: function() {
    return _data || productDefaults;
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
ProductStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === productConstants.FETCH_PRODUCT_SUCCESS) {
      _loaded = true;
      _error = false;
      _data = action.data;
      ProductStore.emitChange();
  } else if (action.actionType === productConstants.FETCH_PRODUCT_ERROR) {
      _error = true;
      ProductStore.emitChange();
  } else if(action.actionType === routesConstants.SET_CURRENT_ROUTE) {
      _loaded = false;
      _data = productDefaults;
      ProductStore.emitChange();
  } else if (action.actionType === productConstants.INITIALIZE_PRODUCT) {
      _data = action.data || productDefaults;
      ProductStore.emitChange();
  } else if (action.actionType === productConstants.CREATE_PRODUCT) {
      _data = productDefaults;
      _loaded = true;
      ProductStore.emitChange();
  } else if(action.actionType === productConstants.UPDATE_PRODUCT) {
      _.forEach(action.data, function(value, key) {
	  _fieldsUpdated = _.union(_fieldsUpdated, [key]);
      });
      _.assign(_data, action.data);
      ProductStore.emitChange();
  } else if(action.actionType === productConstants.REMOVE_RELATIONSHIP_PRODUCT) {
      if(_data[action.field]) {
	  _data[action.field] = _.reject(_data[action.field], function(item) {
	      return item.masterid === action.data.masterid;
	  });
	  _fieldsUpdated = _.union(_fieldsUpdated,[action.field]);
	  ProductStore.emitChange();
      }
  } else if(action.actionType === productConstants.ADD_RELATIONSHIP_PRODUCT) {
      if(_data[action.field]) {
	  _data[action.field].push(action.data);
	  _fieldsUpdated = _.union(_fieldsUpdated, [action.field]);
	  ProductStore.emitChange();
      }
  } else if(action.actionType === productConstants.COMMIT_PRODUCT_SUCCESS) {
      if(action.fields) {
	  _fieldsUpdated = _.difference(_fieldsUpdated, action.fields);
      } else {
	  _fieldsUpdated = [];
      }
      ProductStore.emitChange();
  }

});

module.exports = ProductStore;
