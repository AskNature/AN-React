/**
* User actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var Constants = require('../constants/user');
var Defaults = require('../constants/defaults').user;
var request = require('superagent');
var assign = require('object-assign');

module.exports = {

  setUser: function(data) {
      Dispatcher.handleViewAction({
	  actionType: Constants.SET_USER,
	  account: data
	});
  },

  createUser: function(data, success, failure) {
    console.log(data);
    var self = this;
    request
    .post('/api/account/create')
    .send(data)
    .end(function(res) {
	if(res.ok) {
	    if(res) {
		self.fetchUser();
		success();
	    }
	} else {
	    failure(res.text);
	}
    });
  },

  forgotUser: function(data, success, failure) {
    var self = this;
    request
    .post('/api/account/forgot')
    .send(data)
    .end(function(res) {
	if(res.ok) {
	    if(res) {
		success();
	    }
	} else {
	    failure(res.text);
	}
    });
  },

  resetUser: function(data, success, failure) {
    var self = this;
    request
    .post('/api/account/reset')
    .send(data)
    .end(function(res) {
	if(res.ok) {
	    if(res) {
		success();
	    }
	} else {
	    failure(res.text);
	}
    });
  },

  updateUser: function(data) {
    var self = this;
    request
    .post('/api/account')
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
    .get('/api/account/logout')
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
    .get('/api/account')
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var accountData = res.body;
          self.setUser(accountData);
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
      actionType: Constants.GET_USER,
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
