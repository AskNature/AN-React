'use strict';

var React = require('react'),

/** Sends outgoing requests to an action */
actions = require('../../actions/model-detail'),

/** Gets incoming information from the store */
store = require('../../stores/model-detail'),
accountStore = require('../../stores/accounts'),

DefaultLayout = require('../layouts/default.jsx'),

CollectionDetail = require('./detail-collection.jsx'),
ContextDetail = require('./detail-condition.jsx'),
LivingSystemDetail = require('./detail-livingsystem.jsx'),
MediaDetail = require('./detail-media.jsx'),
PhenomenonDetail = require('./detail-phenomenon.jsx'),
ProductDetail = require('./detail-product.jsx'),
ResearcherDetail = require('./detail-researcher.jsx'),
SourceDetail = require('./detail-source.jsx'),
StrategyDetail = require('./detail-strategy.jsx'),
UserDetail = require('./detail-user.jsx');


var getTemplate = function() {
  var path = window.location.pathname.split('/');
  var Template, routeNamePlural;
  if(path[1] === 'strategy') {
    Template = StrategyDetail;
    routeNamePlural = 'strategies';
  } else if(path[1] === 'product') {
    Template = ProductDetail;
    routeNamePlural = 'products';
  } else if(path[1] === 'phenomenon') {
    Template = PhenomenonDetail;
    routeNamePlural = 'phenomena';
  } else if(path[1] === 'user') {
    Template = UserDetail;
    routeNamePlural = 'users';
  } else if(path[1] === 'collection') {
    Template = CollectionDetail;
    routeNamePlural = 'collections';
  } else if(path[1] === 'condition') {
    Template = ContextDetail;
    routeNamePlural = 'conditions';
  } else if(path[1] === 'living-system') {
    Template = LivingSystemDetail;
    routeNamePlural = 'livingsystems';
  } else if(path[1] === 'media') {
    Template = MediaDetail;
    routeNamePlural = 'media';
  } else if(path[1] === 'researcher') {
    Template = ResearcherDetail;
    routeNamePlural = 'researcher';
  } else if(path[1] === 'source') {
    Template = SourceDetail;
    routeNamePlural = 'sources';
  }
  return ({
    masterid: path[2],
    activeTemplate: Template,
    routeNamePlural: routeNamePlural
  });
};

var Template = getTemplate().activeTemplate;

var getState = function() {
  return {
    object: store.get(),
    loaded: store.getLoaded(),
    error: store.getError(),
    user: accountStore.get(),
    masterid: getTemplate().masterid,
    routeNamePlural: getTemplate().routeNamePlural,
    editable: !getTemplate().masterid ? true : false
  };
};

var DetailComponent = React.createClass({

      mixins: [store.mixin],

      getInitialState: function() {
          return (
            getState()
          );
      },

      componentDidMount: function(){
          if(this.state.masterid) {
              actions.fetch(this.state.masterid, this.state.routeNamePlural);
          } else {
              actions.create();
          }
          console.log(this.state);
      },
      _onChange: function() {
          this.setState(getState());
      },
      onRelationshipAdd: function(field, addedValue) {
          console.log(field + ' added ' + addedValue);
          actions.addRelationship(field, addedValue);
      },
      onRelationshipRemove: function(field, removedValue) {
          console.log(field + ' removed ' + removedValue);
          actions.removeRelationship(field, removedValue);
      },
      toggleEditable: function() {
          this.setState({editable: !this.state.editable});
      },
      editBegin: function(e) {
          e.preventDefault();
          if(this.state.user.role !== 'admin') { this.setState({editable: true}); }
      },
      editCancel: function(e) {
          e.preventDefault();
          actions.fetch(this.state.masterid, this.state.routeNamePlural);
          this.setState({editable: false});
      },
      editFinish: function(e) {
          e.preventDefault();
          actions.commit();
          this.setState({editable: false});
      },
      onDelete: function() {
          var r = confirm('Do you really want to delete this record?');
          if(r) {actions.del(this.state.masterid, this.state.routeNamePlural);}
      },
    render: function() {
      console.log(this.state);
        return (
            <DefaultLayout>
              {!this.state.loaded ? (
                <div>
                  {this.state.error ? 'Error' : 'Loading'}
                </div>
              ) : (
                <div>
                <Template
                    masterid={this.state.masterid !== 'new' ? this.state.masterid : null}
                    routenameplural={this.state.routeNamePlural}
                    data={this.state.object}
                    loaded={this.state.loaded}
                    user={this.state.user}
                    editable={this.state.editable}
                    store={store}
                    actions={actions}
                    editBegin={this.editBegin}
                    editFinish={this.editFinish}
                    onDelete={this.onDelete}
                    onRelationshipAdd={this.onRelationshipAdd}
                    onRelationshipRemove={this.onRelationshipRemove} />
                </div>
              )}
           </DefaultLayout>
        );
    },
    componentWillReceiveProps: function () {
    this.setState(getState());
  }
});

module.exports = DetailComponent;
