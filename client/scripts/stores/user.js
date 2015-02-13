'use strict';

var _ = require('lodash');
var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var userConstants = require('../constants/user');
var userDefaults = require('../constants/defaults').user;

var _user;

var UserStore = new Store({

    // Gets metadata associated with the current user.
    get: function() {
        return _user || userDefaults;
    }

});

UserStore.dispatcherToken = Dispatcher.register(function(payload) {

    var action = payload.action;

    if (action.actionType === userConstants.SET_USER) {
        if(_user) {
	    _.assign(_user, action.user);
	} else {
	    _user = action.user;
	}
	

        UserStore.emitChange();
    }

});

module.exports = UserStore;
