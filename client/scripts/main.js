'use strict';

// Load and use polyfill for ECMA-402.
if (!global.Intl) {
    global.Intl = require('intl');
}

global.React = require('react');
global.ReactIntl = require('react-intl');

var Router = require('director').Router;
var routes = require('./routes');
var Dispatcher = require('./dispatchers/default');
var pageConstants = require('./constants/page');
var routesConstants = require('./constants/routes');

// Setup router
var router = new Router(routes);
// Enable pushState for compatible browsers
var enablePushState = true;

// Detect is pushState is available
var pushState = !!(enablePushState && window.history && window.history.pushState);

// Fix for Facebook hash garbage on OAuth login
if (window.location.hash && window.location.hash === '#_=_') {
    window.location = '/';
}

if (pushState) {
    // Start listening to route changes with pushState
    router.configure({
        html5history: true
    }).init();
} else {
    // Start listening to route changes without pushState
    router.init();
}

// Handle pushState for incompatible browsers (IE9 and below)
if (!pushState && window.location.pathname !== '/') {
    window.location.replace('/#' + window.location.pathname);
}

// Handle route and page changes
Dispatcher.register(function(payload) {

    var action = payload.action;

    if (action.actionType === routesConstants.SET_CURRENT_ROUTE) {
        router.setRoute(action.route);
    }

    else if (action.actionType === pageConstants.SET_CURRENT_PAGE) {
        // Set current page title
        document.title = action.page.title;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

console.log('Welcome to AskNature');
