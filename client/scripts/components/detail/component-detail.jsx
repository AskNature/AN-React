'use strict';

var React = require('react'),

/** Sends outgoing requests to an action */
actions = require('../../actions/model-detail'),

/** Gets incoming information from the store */
store = require('../../stores/model-detail'),
accountStore = require('../../stores/accounts'),

DefaultLayout = require('../layouts/default.jsx'),
Template = require('./product-detail.jsx');

// Temporary way to set name that gets passed to actions:
var routeNamePlural = 'products';

var masterid = window.location.pathname.split('/')[2];

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
                <Template
                    masterid={masterid !== 'new' ? masterid : null}
                    routenameplural={routeNamePlural}
                    data={this.state.object}
                    userrole={this.state.user.role}
                    editable={this.state.editable}
                    store={store}
                    actions={actions}
                    editBegin={this.editBegin}
                    editFinish={this.editFinish}
                    onDelete={this.onDelete}
                    onRelationshipAdd={this.onRelationshipAdd}
                    onRelationshipRemove={this.onRelationshipRemove} />
           </DefaultLayout>
        );
    },
    componentWillReceiveProps: function () {
    this.setState(getState());
  }
});

module.exports = DetailComponent;
