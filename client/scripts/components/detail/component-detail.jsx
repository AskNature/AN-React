'use strict';

var React = require('react'),

/** Sends outgoing requests to an action */
actions = require('../../actions/model-detail'),

/** Gets incoming information from the store */
store = require('../../stores/model-detail'),
accountStore = require('../../stores/accounts'),

DefaultLayout = require('../layouts/default.jsx');

// Temporary way to set name that gets passed to actions:

var path = window.location.pathname.split('/');
var Template, routeNamePlural;

if(path[1] === 'strategy') {
  Template = require('./detail-strategy.jsx');
  routeNamePlural = 'strategies';
} else if(path[1] === 'product') {
  Template = require('./detail-product.jsx');
  routeNamePlural = 'products';
} else if(path[1] === 'phenomenon') {
  Template = require('./detail-phenomenon.jsx');
  routeNamePlural = 'phenomena';
} else if(path[1] === 'user') {
  Template = require('./detail-user.jsx');
  routeNamePlural = 'users';
} else if(path[1] === 'collection') {
  Template = require('./detail-collection.jsx');
  routeNamePlural = 'collections';
} else if(path[1] === 'condition') {
  Template = require('./detail-condition.jsx');
  routeNamePlural = 'conditions';
} else if(path[1] === 'living-system') {
  Template = require('./detail-livingsystem.jsx');
  routeNamePlural = 'livingsystems';
} else if(path[1] === 'media') {
  Template = require('./detail-media.jsx');
  routeNamePlural = 'media';
} else if(path[1] === 'researcher') {
  Template = require('./detail-researcher.jsx');
  routeNamePlural = 'researcher';
} else if(path[1] === 'source') {
  Template = require('./detail-source.jsx');
  routeNamePlural = 'sources';
}

var masterid = path[2];

var getState = function() {
  return {
    object: store.get(),
    loaded: store.getLoaded(),
    error: store.getError(),
    user: accountStore.get()
  };
};

var DetailComponent = React.createClass({

      mixins: [store.mixin],

      getInitialState: function() {
          return ({
              object: store.get(),
              editable: !masterid ? true : false,
              loaded: store.getLoaded(),
              masterid: masterid,
              user: accountStore.get()
          });
      },

      componentDidMount: function(){
          if(this.state.masterid) {
              actions.fetch(this.state.masterid, routeNamePlural);
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
          actions.fetch(this.state.masterid, routeNamePlural);
          this.setState({editable: false});
      },
      editFinish: function(e) {
          e.preventDefault();
          actions.commit();
          this.setState({editable: false});
      },
      onDelete: function() {
          var r = confirm('Do you really want to delete this record?');
          if(r) {actions.del(this.state.masterid, routeNamePlural);}
      },
    render: function() {

        return (
            <DefaultLayout>
              {!this.state.loaded ? (
                <div>
                  {this.state.error ? 'Error' : 'Loading'}
                </div>
              ) : (
                <div>
                <Template
                    masterid={masterid !== 'new' ? masterid : null}
                    routenameplural={routeNamePlural}
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
