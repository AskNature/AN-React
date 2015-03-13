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
          RelationshipListActions.fetchAutocomplete(this.props.field,e.target.value,10);
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
              filter='contains'
              ref='combobox'
              placeholder={ 'Add ' + this.props.fieldName }
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
