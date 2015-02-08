'use strict';

var React = require('react');
var routeActions = require('./actions/routes');
var IndexPage = require('./components/index.jsx');
var OutcomesConsole = require('./components/admin/outcomes.jsx');
var StrategiesConsole = require('./components/admin/strategies.jsx');
var ProductsConsole = require('./components/admin/products.jsx');

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

var routes = {
  '/': index,
  '/admin/outcomes': console_outcomes,
  '/admin/strategies': console_strategies,
  '/admin/products': console_products

};

module.exports = routes;
