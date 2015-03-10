/**
* Outcome actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/strategy');
var Defaults = require('../constants/defaults').strategy;
var request = require('superagent');
var assign = require('object-assign');
var _ = require('lodash');

/**
* initialize begins the load of a strategy detail instance. It takes
* seed data and either empties the store if the data is null or
* fills it with the seed data (from a list or from a dehydrated store).
*/

var initialize = function(initialData) {
    Dispatcher.handleViewAction({
	actionType: Constants.INTIALIZE_STRATEGY,
	data: assign({}, Defaults, initialData)
    });
};

/**
* fetch begins to fetch additional data for the object from the server. It takes
* the masterid of the object
*/

var fetch = function(masterid) {
    // do the async fetch with masterid
    var self = this;
    Dispatcher.handleViewAction({
	actionType: Constants.FETCH_STRATEGY
    });
    request
    .get('/api/v2/strategies/'+id)
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var itemData = res.body;
            Dispatcher.handleViewAction({
		actionType: Constants.FETCH_STRATEGY_SUCCESS,
		data: data
	    });
        }
      }
      else {
	  Dispatcher.handleViewAction({
	      actionType: Constants.FETCH_STRATEGY_ERROR
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
	actionType: Constants.UPDATE_STRATEGY,
	data: data
    });
};

/**
* commit submits a set of changes to the server, and marks them as saved in the store
*/

var commit = function(fields) {
    Dispatcher.handleViewAction({
	actionType: Constants.COMMIT_STRATEGY,
	fields: fields
    });
    var self = this;
    var masterid = store.getId();
    var changedData = _.pick(store.getUpdatedFields(), fields);
    request
    .post('/api/v2/strategies/'+data.masterid)
    .send(data)
    .end(function(res) {
        if(res.ok) {
	    Dispatcher.handleViewAction({
		actionType: Constants.COMMIT_STRATEGY_SUCCESS,
		fields: fields,
		data: res
	    });
        } else {
	    Dispatcher.handleViewAction({
		actionType: Constants.COMMIT_STRATEGY_ERROR,
		fields: fields,
		error: res
	    });
	}
    });
};

module.exports = {

  /**
  * setList is called by getList and sends a request to the dispatcher.
  */

  setList: function(focus) {
    Dispatcher.handleViewAction({
      actionType: Constants.GET_ALL_STRATEGIES,
      focus: assign({}, Defaults, focus)
    });
  },

  /**
  * getList is called by the strategytable component. It defines the URI
  * that the router uses to pass a request to the controller.
  */

  getList: function(callback) {
    var self = this;
    request
    .get('/api/strategies')
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
  },

  getListPaginated: function(index, size, sortCol, asc, filter, callback) {
    var self = this;
    var getString = '/api/strategies?offset='+index*size+'&limit='+size;
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
  },

  setItem: function(focus, next) {
    Dispatcher.handleViewAction({
      actionType: Constants.GET_STRATEGY,
      focus: assign({}, Defaults, focus)
    });
  },

  /**
  * getItem is called by the strategytable component. It defines the URI
  * that the router uses to pass a request to the controller.
  */

  getItem: function(load, callback) {
    var self = this;
    var id = load;
    request
    .get('/api'+id)
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var itemData = res.body;
          self.setItem(itemData);
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
  },

  updateField: function(fieldName, newValue, oldValues) {
      var newValues = oldValues;
      newValues.results[0][fieldName] = newValue.substring(0,newValue.length-4);
      this.setItem(newValues);
  },

  saveStrategy: function(data) {
    var self = this;
    request
    .post('/api/strategy/'+data.masterid)
    .send(data)
    .end(function(res) {
        if(res.ok) {
            if(res) {
                console.log('save strategy success!');
            }
        }
    });
  }



};
