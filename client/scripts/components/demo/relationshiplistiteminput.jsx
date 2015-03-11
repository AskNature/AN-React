/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
ListGroupItem = require('react-bootstrap').ListGroupItem,
Glyphicon = require('react-bootstrap').Glyphicon;

var RelationshipListStore = require('../../stores/relationshiplist.js');
var RelationshipListActions = require('../../actions/relationshiplist.js');

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
      console.log("text entered");
      if(e.target.value != "") {
          RelationshipListActions.fetchAutocomplete(this.props.field,e.target.value,5);
      } else {
          RelationshipListActions.initialize();
      }
  },

  onInputFocus: function(e) {
      console.log("focused");
      RelationshipListActions.initialize();
      var domNode = this.getDOMNode();
      var targetNode = e.target;
      if(targetNode.value != "") {
          RelationshipListActions.fetchAutocomplete(this.props.field,targetNode.value,5);
      }
  },

  onSuggestionClick: function(suggestion) {
      console.log("clicked " + suggestion.masterid);
      this.props.onAdd(suggestion);
      this.refs.relationshipInput.getDOMNode().value = "";
      RelationshipListActions.initialize();
  },
  
  render: function() {
    if (this.props.editable) {
    return (
        <div>
            <ListGroupItem style={{"height": "50px", "padding-top": "5px"}}>
                <h6>
		    <Glyphicon glyph="plus" style={{"z-index": 4}} />
		    <input className={"relationship-input"} placeholder={ "Connect your " + this.props.fieldName }
		        onInput={this.onInputInput} onFocus={this.onInputFocus} ref={"relationshipInput"} />
		    <input className={"relationship-input-autocomplete"} placeholder={ this.state.results.length > 0 ? this.state.results[0].name : "" } />
		</h6>
            </ListGroupItem>
	<div>
	    {
	        this.state.results.map(function(result, i) {
		    var boundSuggestionClick = this.onSuggestionClick.bind(this, result);
		    return (
		        <div onClick={boundSuggestionClick} className={"autocomplete-dropdown"} key={result.masterid}>
			    <a href="#">
			        {result.name}
		            </a>
			</div>
		    );
		}, this)
	    }
	</div></div>
    ) } else { 
          return "";
      }
  }
});

module.exports = RelationshipListItemInput;
