/**
* Outcome actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/product');
//var Defaults = require('../constants/defaults').strategyNew;
var request = require('superagent');
var assign = require('object-assign');
var _ = require('lodash');

var store = require('../stores/strategy.js');

var routeActions = require('./routes');

/**
* initialize begins the load of a strategy detail instance. It takes
* seed data and either empties the store if the data is null or
* fills it with the seed data (from a list or from a dehydrated store).
*/

var initialize = function(initialData) {
    Dispatcher.handleViewAction({
	actionType: Constants.INITIALIZE_PRODUCT
    });
};

/**
* fetch begins to fetch additional data for the object from the server. It takes
* the masterid of the object
*/

var fetch = function(masterid) {
    // do the async fetch with masterid
    var self = this;
    /*Dispatcher.handleViewAction({
	actionType: Constants.FETCH_STRATEGY
    });*/
    request
    .get('/api/v2/products/'+masterid+'?expand=true')
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var itemData = res.body;
            Dispatcher.handleViewAction({
		actionType: Constants.FETCH_PRODUCT_SUCCESS,
		data: itemData
	    });
        }
      }
      else {
	  Dispatcher.handleViewAction({
	      actionType: Constants.FETCH_PRODUCT_ERROR
	  });
      }
    });
};

/**
* update takes new user data from the view and updates the model in the background.
* It takes a map of the new data, and doesn't update the server until commit is called.
*/

var update = function(data) {
    Dispatcher.handleViewAction({
	actionType: Constants.UPDATE_PRODUCT,
	data: data
    });
};

var removeRelationship = function(field, data) {
    Dispatcher.handleViewAction({
	actionType: Constants.REMOVE_RELATIONSHIP_PRODUCT,
	field: field,
	data: data
    });
};

var addRelationship = function(field, data) {
    Dispatcher.handleViewAction({
	actionType: Constants.ADD_RELATIONSHIP_PRODUCT,
	field: field,
	data: data
    });
};

/**
* commit submits a set of changes to the server, and marks them as saved in the store
*/

var commit = function(fields) {
    Dispatcher.handleViewAction({
	actionType: Constants.COMMIT_PRODUCT,
	fields: fields
    });
    var self = this;
    var masterid = store.getMasterid();
    var updatedFields = store.getUpdatedFields();
    var changedData = fields ? _.pick(updatedFields, fields) : updatedFields;
    var model = store.get();
    var dataToSend = {};
    _.forEach(changedData, function(field) {
	dataToSend[field] = model[field];
    });
    request
    .post('/api/v2/products/'+masterid)
    .send(dataToSend)
    .end(function(res) {
        if(res.ok) {
	    Dispatcher.handleViewAction({
		actionType: Constants.COMMIT_PRODUCT_SUCCESS,
		fields: fields,
		data: res
	    });
        } else {
	    Dispatcher.handleViewAction({
		actionType: Constants.COMMIT_PRODUCT_ERROR,
		fields: fields,
		error: res
	    });
	}
    });
};

var del = function(masterid) {
    request
    .del('/api/v2/productss/'+masterid)
    .end(function(res) {
	if(res.ok) {
	    routeActions.setRoute('/admin/products');
	}
    });
};

var create = function() {
    Dispatcher.handleViewAction({
	actionType: Constants.CREATE_PRODUCT
    });
};

module.exports = {
    initialize: initialize,
    fetch: fetch,
    update: update,
    removeRelationship: removeRelationship,
    addRelationship: addRelationship,
    commit: commit,
    del: del,
    create: create
};
