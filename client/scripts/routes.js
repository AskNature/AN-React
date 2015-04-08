'use strict';

var React = require('react/addons');
var routeActions = require('./actions/routes');
var IndexPage = React.createFactory(require('./components/index.jsx'));

var ListComponent = React.createFactory(require('./components/admin/adminlist.jsx')),
CollectionList = require('./components/admin/collection'),
ContextList = require('./components/admin/context'),
BSystemList = require('./components/admin/bsystem'),
DSystemList = require('./components/admin/dsystem'),
MediaList = require('./components/admin/media'),
FMList = require('./components/admin/fm'),
DStrategyList = require('./components/admin/dstrategy'),
ResearcherList = require('./components/admin/researcher'),
SourceList = require('./components/admin/source'),
BStrategyList = require('./components/admin/bstrategy'),
OneUserList = require('./components/admin/1user'),
UserList = require('./components/admin/user');

var DetailComponent = React.createFactory(require('./components/detail/component-detail.jsx'));


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

var list_component = function(type) {
    var list;
    if(type === 'b.strategy') {
        list = BStrategyList;
    } else if(type === 'd.strategy') {
        list = DStrategyList;
    } else if(type === 'fm') {
        list = FMList;
    } else if(type === 'users') {
        list = UserList;
    } else if(type === 'collections') {
        list = CollectionList;
    } else if(type === 'context') {
        list = ContextList;
    } else if(type === 'b.system') {
        list = BSystemList;
    } else if(type === 'd.system') {
        list = DSystemList;
    } else if(type === 'media') {
        list = MediaList;
    } else if(type === 'researchers') {
        list = ResearcherList;
    } else if(type === 'sources') {
        list = SourceList;
    } else if(type === '1users') {
        list = OneUserList;
    }
    render(ListComponent, {type: type, component: list});
};

var detail_component = function(type,id) {
    render(DetailComponent, {masterid: id, type: type});
};

var detail_bstrategy = function(id) {
    render(DetailComponent, {masterid: id, type: 'b.strategy'});
};

var detail_dstrategy = function(id) {
    render(DetailComponent, {masterid: id, type: 'd.strategy'});
};

var detail_bsystem = function(id) {
    render(DetailComponent, {masterid: id, type: 'b.system'});
};

var detail_dsystem = function(id) {
    render(DetailComponent, {masterid: id, type: 'd.system'});
};

var detail_fm = function(id) {
    render(DetailComponent, {masterid: id, type: 'fm'});
};

var detail_context = function(id) {
    render(DetailComponent, {masterid: id, type: 'context'});
};

var detail_source = function(id) {
    render(DetailComponent, {masterid: id, type: 'sources'});
};

var detail_researcher = function(id) {
    render(DetailComponent, {masterid: id, type: 'researchers'});};

var detail_collection = function(id) {
    render(DetailComponent, {masterid: id, type: 'collections'});};

var detail_user = function(id) {
    render(DetailComponent, {masterid: id, type: 'users'});};

var detail_1user = function(id) {
    render(DetailComponent, {masterid: id, type: '1users'});};

var detail_media = function(id) {
    render(DetailComponent, {masterid: id, type: 'media'});};

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

var infinite_demo = function(id) {
    render(Infinite, {masterid: id});
};


var routes = {
  '/': index,

  '/list/:type': list_component,

// How do we change the second '/' into another colon?? Remember that we're aiming for a path that contains a bunch of key/value pairs that look like: .../Type:masterid/...
  '/q/:type/:id': detail_component,

  '/b.strategy/:id': detail_bstrategy,
  '/d.strategy/:id': detail_dstrategy,
  '/b.system/:id': detail_bsystem,
  '/d.system/:id': detail_dsystem,
  '/fm/:id': detail_fm,
  '/context/:id': detail_context,
  '/source/:id': detail_source,
  '/researcher/:id': detail_researcher,
  '/collection/:id': detail_collection,
  '/user/:id': detail_user,
  '/1user/:id': detail_1user,
  '/media/:id': detail_media,

  '/login': login,
  '/signup': signup,
  '/settings': account_settings,
  '/forgot': account_forgot,
  '/reset/:token': account_reset,

  '/infinite_demo/:id': infinite_demo
};

module.exports = routes;
