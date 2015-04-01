/**
* Outcome actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/product');
var Defaults = require('../constants/defaults').product;
var request = require('superagent');
var assign = require('object-assign');

module.exports = {

  /**
  * setOutcome is called by getOutcomes and sends a request to the dispatcher.
  */

  setList: function(focus) {
    Dispatcher.handleViewAction({
      actionType: Constants.GET_ALL_PRODUCTS,
      focus: assign({}, Defaults, focus)
    });
    console.log('setList action returning '+focus.results.length + ' results.');
  },

  /**
  * getOutcomes is called by the outcomefilter component. It defines the URI
  * that the router uses to pass a request to the controller.
  */

  getList: function(callback) {
    var self = this;
    request
    .get('/api/products')
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var listData = res.body;
          self.setList(listData);
          console.log(res.body);
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
    var getString = '/api/products?offset='+index*size+'&limit='+size;
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
      actionType: Constants.GET_PRODUCT,
      focus: assign({}, Defaults, focus)
    });
    console.log('setItem action returning '+ focus.results + ' result.');
  },

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
          console.log(res.body);
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

  };
