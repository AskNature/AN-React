/**
* User actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var userConstants = require('../constants/user');
var userDefaults = require('../constants/defaults').user;
var request = require('superagent');
var assign = require('object-assign');

module.exports = {

  setUser: function(data) {
      Dispatcher.handleViewAction({
	  actionType: userConstants.SET_USER,
	  user: data
	});
  },

  updateUser: function(data) {
    var self = this;
    request
    .post('/api/user')
    .send(data)
    .end(function(res) {
	if(res.ok) {
	    if(res) {
		self.setUser(data);
	    }
	}
    });
  },

  fetchUser: function(callback) {
    var self = this;
    request
    .get('/api/user')
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var userData = res.body;
          self.setUser(userData);
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
