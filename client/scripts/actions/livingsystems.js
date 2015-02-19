/**
* Outcome actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/livingsystem');
var Defaults = require('../constants/defaults').livingsystem;
var request = require('superagent');
var assign = require('object-assign');

module.exports = {

  /**
  * setList is called by getList and sends a request to the dispatcher.
  */

  setList: function(focus) {
    Dispatcher.handleViewAction({
      actionType: Constants.GET_ALL_LIVINGSYSTEMS,
      focus: assign({}, Defaults, focus)
    });
    console.log('setList action returning '+focus.results.length + ' results.');
  },

  /**
  * getList is called by the strategytable component. It defines the URI
  * that the router uses to pass a request to the controller.
  */

  getList: function(callback) {
    var self = this;
    request
    .get('/api/living-systems')
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

  setItem: function(focus, next) {
    Dispatcher.handleViewAction({
      actionType: Constants.GET_LIVINGSYSTEM,
      focus: assign({}, Defaults, focus)
    });
    console.log('setItem action returning '+ focus.results + ' result.');
  },

  /**
  * getItem is called by the strategytable component. It defines the URI
  * that the router uses to pass a request to the controller.
  */

  getItem: function(load, callback) {
    var self = this;
    var id = load;
    request
    .get('/api/living-system/'+id)
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
