'use strict';

var React = require('react/addons');
var routeActions = require('./actions/routes');
var IndexPage = React.createFactory(require('./components/index.jsx'));

var StrategiesConsole = React.createFactory(require('./components/admin/strategies.jsx'));
var ProductsConsole = React.createFactory(require('./components/admin/products.jsx'));
var LivingSystemsConsole = React.createFactory(require('./components/admin/livingsystems.jsx'));
var PhenomenaConsole = React.createFactory(require('./components/admin/phenomena.jsx'));
var ConditionsConsole = React.createFactory(require('./components/admin/conditions.jsx'));
var SourcesConsole = React.createFactory(require('./components/admin/sources.jsx'));
var ResearchersConsole = React.createFactory(require('./components/admin/researchers.jsx'));
var CollectionsConsole = React.createFactory(require('./components/admin/collections.jsx'));
var UsersConsole = React.createFactory(require('./components/admin/users.jsx'));
var MediaConsole = React.createFactory(require('./components/admin/media.jsx'));


var StrategyDetail = React.createFactory(require('./components/detail/strategy.jsx'));
var ProductDetail = React.createFactory(require('./components/detail/product.jsx'));
var LivingSystemsDetail = React.createFactory(require('./components/detail/livingsystem.jsx'));
var PhenomenonDetail = React.createFactory(require('./components/detail/phenomenon.jsx'));
var ConditionDetail = React.createFactory(require('./components/detail/condition.jsx'));
var SourceDetail = React.createFactory(require('./components/detail/source.jsx'));
var ResearcherDetail = React.createFactory(require('./components/detail/researcher.jsx'));
var CollectionDetail = React.createFactory(require('./components/detail/collection.jsx'));
var UserDetail = React.createFactory(require('./components/detail/user.jsx'));
var MediaDetail = React.createFactory(require('./components/detail/media.jsx'));


var Login = React.createFactory(require('./components/account/login.jsx'));
var Signup = React.createFactory(require('./components/account/signup.jsx'));
var AccountSettings = React.createFactory(require('./components/account/account_settings.jsx'));
var AccountForgot = React.createFactory(require('./components/account/forgot.jsx'));
var AccountReset = React.createFactory(require('./components/account/reset.jsx'));

var Infinite = React.createFactory(require('./components/demo/infinite.jsx'));


var render = function(Page, props) {
    React.render(new Page(props), document.getElementById('app-wrapper'));
};

var index = function() {
    render(IndexPage);
};

var console_strategies = function() {
    render(StrategiesConsole);
};

var console_products = function() {
    render(ProductsConsole);
};

var console_livingsystems = function() {
    render(LivingSystemsConsole);
};

var console_phenomena = function() {
    render(PhenomenaConsole);
};

var console_conditions = function() {
    render(ConditionsConsole);
};

var console_sources = function() {
    render(SourcesConsole);
};

var console_researchers = function() {
    render(ResearchersConsole);
};

var console_collections = function() {
    render(CollectionsConsole);
};

var console_users = function() {
    render(UsersConsole);
};

var console_media = function() {
    render(MediaConsole);
};

var detail_strategy = function(id) {
    render(StrategyDetail, {masterid: id, type: 'strategies'});
};

var detail_product = function() {
    render(ProductDetail);
};

var detail_livingsystems = function() {
    render(LivingSystemsDetail);
};

var detail_phenomenon = function() {
    render(PhenomenonDetail);
};

var detail_condition = function() {
    render(ConditionDetail);
};

var detail_source = function() {
    render(SourceDetail);
};

var detail_researcher = function() {
    render(ResearcherDetail);
};

var detail_collection = function() {
    render(CollectionDetail);
};

var detail_user = function() {
    render(UserDetail);
};

var detail_media = function() {
    render(MediaDetail);
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

var account_forgot = function() {
    render(AccountForgot);
};

var account_reset = function(token) {
    render(AccountReset);
};

var infinite_demo = function() {
    render(Infinite);
};


var routes = {
  '/': index,
  '/admin/strategies': console_strategies,
  '/admin/products': console_products,
  '/admin/living-systems': console_livingsystems,
  '/admin/phenomena': console_phenomena,
  '/admin/conditions': console_conditions,
  '/admin/sources': console_sources,
  '/admin/researchers': console_researchers,
  '/admin/collections': console_collections,
  '/admin/users': console_users,
  '/admin/media': console_media,
  '/strategy/:id': detail_strategy,
  '/product/:id': detail_product,
  '/living-system/:id': detail_livingsystems,
  '/phenomenon/:id': detail_phenomenon,
  '/condition/:id': detail_condition,
  '/source/:id': detail_source,
  '/researcher/:id': detail_researcher,
  '/collection/:id': detail_collection,
  '/user/:id': detail_user,
  '/media/:id': detail_media,
  '/login': login,
  '/signup': signup,
  '/settings': account_settings,
  '/forgot': account_forgot,
  '/reset/:token': account_reset,
  '/infinite_demo': infinite_demo
};

module.exports = routes;
