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

  createUser: function(data, success) {
    console.log(data);
    var self = this;
    request
    .post('/api/user/create')
    .send(data)
    .end(function(res) {
	if(res.ok) {
	    if(res) {
		self.fetchUser();
		success();
	    }
	}
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

  logoutUser: function(data) {
    request
    .get('/api/user/logout')
    .end(function(res) {
        if(res.ok) {
            if(res) {
                module.exports.fetchUser();
            }
        }
    });
  },

  loginUser: function(data, success, failure) {
      var self = this;
      request
      .post('/auth/db')
      .send(data)
      .end(function(res) {
	  if(res) {
	      if(res.status === 200) {
		  self.fetchUser();
		  success();
	      } else {
		  failure();
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
