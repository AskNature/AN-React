/**
* Relationship list actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/relationshiplist');
var Defaults = require('../constants/generic-defaults').relationshipList;
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
	actionType: Constants.INITIALIZE_REL_LIST,
	data: Defaults
    });
};

/**
* fetchAutocomplete begins to fetch autocomplete data for the given query
* from the server. It takes a class specifier and string search query.
*/

var fetchAutocomplete = function(specifier, text, count) {
    // do the async fetch with masterid
    var self = this;
    Dispatcher.handleViewAction({
	actionType: Constants.FETCH_REL_LIST
    });
    request
    .get('/api/v2/autocomplete/'+specifier+'?query='+text+'&count='+count)
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var itemData = res.body;
            Dispatcher.handleViewAction({
		actionType: Constants.FETCH_REL_LIST_SUCCESS,
		data: res.body
	    });
        }
      }
      else {
	  Dispatcher.handleViewAction({
	      actionType: Constants.FETCH_REL_LIST_ERROR
	  });
      }
    });
};

module.exports = { initialize: initialize, fetchAutocomplete: fetchAutocomplete };
