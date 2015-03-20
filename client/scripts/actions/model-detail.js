/**
* Detail model actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default'),
request = require('superagent'),
assign = require('object-assign'),
_ = require('lodash'),

store = require('../stores/model-detail'),
Constants = require('../constants/model'),
Defaults = require('../constants/defaults_compiled.js'),

routeActions = require('./routes');

// this doesn't work:

var entity = window.location.pathname.split('/');
console.log(entity);
var route;
if(entity[1] === 'product') {
    route = 'products';
} else if(entity[1] === 'strategy') {
    route = 'strategies';
}

/**
* initialize begins the load of a detail instance. It takes
* seed data and either empties the store if the data is null or
* fills it with the seed data (from a list or from a dehydrated store).
*/

var initialize = function(initialData) {
    Dispatcher.handleViewAction({
	actionType: Constants.INITIALIZE
    });
};

/**
* fetch begins to fetch additional data for the object from the server. It takes
* the masterid of the object
*/

var fetch = function(masterid,entity) {
    // do the async fetch with masterid
    var self = this;
    /*Dispatcher.handleViewAction({
	actionType: Constants.FETCH_STRATEGY
    });*/
    request
    .get('/api/v2/'+entity+'/'+masterid+'?expand=true')
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var itemData = res.body;
            Dispatcher.handleViewAction({
		actionType: Constants.FETCH_SUCCESS,
		data: itemData
	    });
        }
      }
      else {
	  Dispatcher.handleViewAction({
	      actionType: Constants.FETCH_ERROR
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
	actionType: Constants.UPDATE,
	data: data
    });
};

var removeRelationship = function(field, data) {
    Dispatcher.handleViewAction({
	actionType: Constants.REMOVE_RELATIONSHIP,
	field: field,
	data: data
    });
};

var addRelationship = function(field, data) {
    Dispatcher.handleViewAction({
	actionType: Constants.ADD_RELATIONSHIP,
	field: field,
	data: data
    });
};

/**
* commit submits a set of changes to the server, and marks them as saved in the store
*/

var commit = function(fields) {
    Dispatcher.handleViewAction({
	actionType: Constants.COMMIT,
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
    .post('/api/v2/'+route+'/'+masterid)
    .send(dataToSend)
    .end(function(res) {
        if(res.ok) {
	    Dispatcher.handleViewAction({
		actionType: Constants.COMMIT_SUCCESS,
		fields: fields,
		data: res
	    });
        } else {
	    Dispatcher.handleViewAction({
		actionType: Constants.COMMIT_ERROR,
		fields: fields,
		error: res
	    });
	}
    });
};

var del = function(masterid) {
    request
    .del('/api/v2/'+route+'/'+masterid)
    .end(function(res) {
	if(res.ok) {
	    routeActions.setRoute('/admin/'+entity);
	}
    });
};

var create = function() {
    Dispatcher.handleViewAction({
	actionType: Constants.CREATE
    });
};

/**
* setList is called by getList and sends a request to the dispatcher.
*/

var setList = function(focus) {
  Dispatcher.handleViewAction({
    actionType: Constants.GET_ALL,
    focus: assign({}, Defaults, focus)
  });
};

/**
* getList is called by the strategytable component. It defines the URI
* that the router uses to pass a request to the controller.
*/

var getList = function(callback) {
  var self = this;
  request
  .get('/api/'+route)
  .type('json')
  .end(function(res) {
    if (res.ok) {
      if (res) {
        var listData = res.body;
        self.setList(listData);
      }
      if (callback && callback.success) {
        callback.success(res);
      }
    }
    else {
      if (callback && callback.error) {
        callback.error(res);
      }
    }

    if (callback && callback.complete) {
      callback.complete(res);
    }
  });
};

var getListPaginated = function(index, size, sortCol, asc, filter, callback) {
  var self = this;
  var getString = '/api/'+route+'?offset='+index*size+'&limit='+size;
  if (sortCol) { getString += '&order='+(asc ? '+' : '-')+sortCol; }
  if (filter) { getString += '&filter='+filter; }
  request.get(getString)
  .type('json')
  .end(function(res) {
    if (res.ok) {
      if (res) {
        var listData = res.body;
        self.setList(listData);
      }
      if (callback && callback.success) {
        callback.success(res);
      }
    }
    else {
      if (callback && callback.error) {
        callback.error(res);
      }
    }

    if (callback && callback.complete) {
      callback.complete(res);
    }
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
    create: create,
    setList: setList,
    getList: getList,
    getListPaginated: getListPaginated
};
