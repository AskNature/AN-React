'use strict';

var React = require('react/addons');
var routeActions = require('./actions/routes');

var IndexPage = React.createFactory(require('./components/index.jsx'));

var AdminList = React.createFactory(require('./components/admin/adminlist.jsx'));

var StrategyDetail = React.createFactory(require('./components/detail/strategy.jsx'));
var DetailComponent = React.createFactory(require('./components/detail/component-detail.jsx'));
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


var render = function(Page) {
    React.render(new Page(), document.getElementById('app-wrapper'));
};

var index = function() {
    render(IndexPage);
};

var admin_list = function() {
    render(AdminList);
};


var detail_strategy = function() {
    render(StrategyDetail);
};

var detail_component = function() {
    render(DetailComponent);
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

  '/admin/strategies': admin_list,


  '/admin/products': admin_list,
  '/admin/living-systems': admin_list,
  '/admin/phenomena': admin_list,
  '/admin/conditions': admin_list,
  '/admin/sources': admin_list,
  '/admin/researchers': admin_list,
  '/admin/collections': admin_list,
  '/admin/users': admin_list,
  '/admin/media': admin_list,
  '/strategy/:id': detail_component,
  '/product/:id': detail_component,
  '/living-system/:id': detail_component,
  '/phenomenon/:id': detail_component,
  '/condition/:id': detail_condition,
  '/source/:id': detail_source,
  '/researcher/:id': detail_researcher,
  '/collection/:id': detail_collection,
  '/user/:id': detail_user,
  '/media/:id': detail_component,
  '/login': login,
  '/signup': signup,
  '/settings': account_settings,
  '/forgot': account_forgot,
  '/reset/:token': account_reset,
  '/infinite_demo': infinite_demo
};

module.exports = routes;
