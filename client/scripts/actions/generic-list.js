/**
* List actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default'),
Constants = require('../constants/generic-actions'),
Defaults = require('../constants/generic-defaults'),
request = require('superagent'),
assign = require('object-assign'),

routeActions = require('./routes');


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
  var entity = window.location.pathname.split('/')[2];
  var self = this;
  request
  .get('/api/'+entity)
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
  var entity = window.location.pathname.split('/')[2];
  var getString = '/api/'+entity+'?offset='+index*size+'&limit='+size;
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
  setList: setList,
  getList: getList,
  getListPaginated: getListPaginated
};
