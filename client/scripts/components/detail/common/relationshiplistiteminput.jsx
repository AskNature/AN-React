'use strict';

var React = require('react'),
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
      //RelationshipListActions.initialize();
  },

  onInputInput: function(e) {
      console.log('text entered');
      if(e.target.value !== '') {
          RelationshipListActions.fetchAutocomplete(this.props.field,e.target.value,5);
      } else {
          RelationshipListActions.initialize();
      }
  },

  onInputFocus: function(e) {
      console.log('focused');
      RelationshipListActions.initialize();
      var domNode = this.getDOMNode();
      var targetNode = e.target;
      if(targetNode.value !== '') {
          RelationshipListActions.fetchAutocomplete(this.props.field,targetNode.value,5);
      }
  },

  onSuggestionClick: function(suggestion, e) {
      console.log('clicked ' + suggestion.masterid);
      e.preventDefault();
      this.props.onAdd(suggestion);
      this.refs.relationshipInput.getDOMNode().value = '';
      RelationshipListActions.initialize();
  },

  onAdd: function() {
    console.log(this.refs.combobox);
    this.props.onAdd(this.refs.combobox.state.value);

    React.findDOMNode(this.refs.combobox).value = '';

    RelationshipListActions.initialize();
  },

  render: function() {
    if(this.props.editable) {
        return (
          <div className='relationship-selector'>
            <Combobox
              textField='name'
              onInput={this.onInputInput}
              data={this.state.results}
              filter='contains'
              ref='combobox'
              placeholder={ 'Connect your ' + this.props.fieldName }
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
        <span>
          Sign in to connect more {this.props.fieldName}s.
        </span>
      );
    }
  }
});

module.exports = RelationshipListItemInput;
