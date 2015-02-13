'use strict';

var React = require('react/addons');
var routeActions = require('./actions/routes');
var IndexPage = React.createFactory(require('./components/index.jsx'));
var OutcomesConsole = React.createFactory(require('./components/admin/outcomes.jsx'));
var StrategiesConsole = React.createFactory(require('./components/admin/strategies.jsx'));
var ProductsConsole = React.createFactory(require('./components/admin/products.jsx'));
var StrategyDetail = React.createFactory(require('./components/detail/strategy.jsx'));
var Login = React.createFactory(require('./components/modules/login.jsx'));
var Signup = React.createFactory(require('./components/modules/signup.jsx'));
var AccountSettings = React.createFactory(require('./components/modules/account_settings.jsx'));


var render = function(Page) {
    React.render(new Page(), document.getElementById('app-wrapper'));
};

var index = function() {
    render(IndexPage);
};

var console_outcomes = function() {
    render(OutcomesConsole);
};

var console_strategies = function() {
    render(StrategiesConsole);
};

var console_products = function() {
    render(ProductsConsole);
};

var detail_strategy = function() {
    render(StrategyDetail);
};

var login = function() {
    render(Login);
};

var signup = function() {
    render(Signup);
};

var account_settings = function() {
    render(AccountSettings);
};

var routes = {
  '/': index,
  '/admin/outcomes': console_outcomes,
  '/admin/strategies': console_strategies,
  '/admin/products': console_products,
  '/strategy/:id': detail_strategy,
  '/login': login,
  '/signup': signup,
  '/settings/:username': account_settings
};

module.exports = routes;
