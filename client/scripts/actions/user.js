/**
* Outcome actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/user');
//var Defaults = require('../constants/defaults').userNew;
var request = require('superagent');
var assign = require('object-assign');
var _ = require('lodash');

var store = require('../stores/user.js');

var routeActions = require('./routes');

/**
* initialize begins the load of a user detail instance. It takes
* seed data and either empties the store if the data is null or
* fills it with the seed data (from a list or from a dehydrated store).
*/

var initialize = function(initialData) {
    Dispatcher.handleViewAction({
	actionType: Constants.INITIALIZE_USER
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
	actionType: Constants.FETCH_USER
    });*/
    request
    .get('/api/v2/users/'+masterid+'?expand=true')
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var itemData = res.body;
            Dispatcher.handleViewAction({
		actionType: Constants.FETCH_USER_SUCCESS,
		data: itemData
	    });
        }
      }
      else {
	  Dispatcher.handleViewAction({
	      actionType: Constants.FETCH_USER_ERROR
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
	actionType: Constants.UPDATE_USER,
	data: data
    });
};

var removeRelationship = function(field, data) {
    Dispatcher.handleViewAction({
	actionType: Constants.REMOVE_RELATIONSHIP_USER,
	field: field,
	data: data
    });
};

var addRelationship = function(field, data) {
    Dispatcher.handleViewAction({
	actionType: Constants.ADD_RELATIONSHIP_USER,
	field: field,
	data: data
    });
};

/**
* commit submits a set of changes to the server, and marks them as saved in the store
*/

var commit = function(fields) {
    Dispatcher.handleViewAction({
	actionType: Constants.COMMIT_USER,
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
    .post('/api/v2/users/'+masterid)
    .send(dataToSend)
    .end(function(res) {
        if(res.ok) {
	    Dispatcher.handleViewAction({
		actionType: Constants.COMMIT_USER_SUCCESS,
		fields: fields,
		data: res
	    });
        } else {
	    Dispatcher.handleViewAction({
		actionType: Constants.COMMIT_USER_ERROR,
		fields: fields,
		error: res
	    });
	}
    });
};

var del = function(masterid) {
    request
    .del('/api/v2/users/'+masterid)
    .end(function(res) {
	if(res.ok) {
	    routeActions.setRoute('/admin/users');
	}
    });
};

var create = function() {
    Dispatcher.handleViewAction({
	actionType: Constants.CREATE_USER
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
