'use strict';

var React = require('react'),

_ = require('lodash'),

Link = require('../../modules/link.jsx'),

Button = require('react-bootstrap').Button,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
Glyphicon = require('react-bootstrap').Glyphicon;

var Combobox = require('react-widgets').Combobox;

var RelationshipListStore = require('../../../stores/relationshiplist.js');
var RelationshipListActions = require('../../../actions/relationshiplist.js');

var getState = function() {
    return RelationshipListStore.get();
};

var InputListComponent = React.createClass({
  render: function() {
    return (
      <div>
        <img src='http://placehold.it/50x50' width='50px' height='auto' />
        {this.props.item.name}
      </div>
    );
  }
});

var RelationshipListItemInput = React.createClass({
  mixins: [RelationshipListStore.mixin],

  getInitialState: function() {
    return getState();
  },

  _onChange: function() {
    var newState = getState();
    this.setState(newState);
  },

  componentWillMount: function() {
    this.inputCallback = _.debounce(function (e, field, target) {
      RelationshipListActions.fetchAutocomplete(field,target,10);
      console.log('Search '+field+' for '+target);
      }, 500);
  },

  onInputInput: function(e) {
      console.log('text entered');
      if(e.target.value !== '') {
        this.inputCallback(e, this.props.field, e.target.value);
      } else {
          RelationshipListActions.initialize();
      }
  },

  onAdd: function() {
    console.log(this.refs.combobox.state.value.masterid);
    if (this.refs.combobox.state.value.masterid) {
      this.props.onAdd(this.refs.combobox.state.value);
    }
    RelationshipListActions.initialize();
  },

  render: function() {
    if(this.props.editable) {
        return (
          <div className='relationship-selector'>
            <Combobox
              textField='name'
              onInput={this.onInputInput}
              data={this.state.results.concat(['Create New'])}
              itemComponent={this.props.media ? InputListComponent : ''}
              filter='contains'
              ref='combobox'
              placeholder={ 'Add ' + this.props.fieldName }
              media={this.props.media}
              />
            <Button
              onClick={this.onAdd}
              ref='addbutton'>
              <Glyphicon glyph='plus' />
            </Button>
          </div>
        );
    } else {
      return (
        <span style={{float:'right'}}>
        </span>
      );
    }
  }
});

module.exports = RelationshipListItemInput;
