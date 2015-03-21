'use strict';

var React = require('react'),

/** Sends outgoing requests to an action */
actions = require('../../actions/generic-detail'),

/** Gets incoming information from the store */
store = require('../../stores/generic-detail'),
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
          return (
            getState()
          );
      },

      componentDidMount: function(){
          if(this.props.masterid) {
              actions.fetch(this.props.type,this.props.masterid);
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
          actions.fetch(this.props.type, this.props.masterid);
          this.setState({editable: false});
      },
      editFinish: function(e) {
          e.preventDefault();
          actions.commit();
          this.setState({editable: false});
      },
      onDelete: function() {
          var r = confirm('Do you really want to delete this record?');
          if(r) {actions.del(this.props.type, this.props.masterid);}
      },

      //This is a temporary solution until Scott's mixin replaces it. DOES NOT LOAD CORRECTLY ON REFRESH:
      getTemplate: function() {
        var Template;
        if(this.props.type === 'strategies') {
          Template = StrategyDetail;
        } else if(this.props.type === 'products') {
          Template = ProductDetail;
        } else if(this.props.type === 'phenomena') {
          Template = PhenomenonDetail;
        } else if(this.props.type === 'users') {
          Template = UserDetail;
        } else if(this.props.type === 'collections') {
          Template = CollectionDetail;
        } else if(this.props.type === 'conditions') {
          Template = ContextDetail;
        } else if(this.props.type === 'living-systems') {
          Template = LivingSystemDetail;
        } else if(this.props.type === 'media') {
          Template = MediaDetail;
        } else if(this.props.type === 'researchers') {
          Template = ResearcherDetail;
        } else if(this.props.type === 'sources') {
          Template = SourceDetail;
        }
        return Template;
      },
    render: function() {
      console.log(this.state);
      var Template = this.getTemplate;
        return (
            <DefaultLayout>
              {!this.state.loaded ? (
                <div>
                  {this.state.error ? 'Error' : 'Loading'}
                </div>
              ) : (
                <div>
                <Template
                    masterid={this.props.masterid !== 'new' ? this.props.masterid : null}
                    type={this.props.type}
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
