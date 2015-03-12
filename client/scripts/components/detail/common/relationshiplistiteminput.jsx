'use strict';

var React = require('react'),

Link = require('../../modules/link.jsx'),
Panel = require('react-bootstrap').Panel,
Input = require('react-bootstrap').Input,
Glyphicon = require('react-bootstrap').Glyphicon;

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
      this.setState({dropdownVisible: true});
  },

  handleBlur: function(e) {
      console.log('blurred');
      this.setState({dropdownVisible: false});
  },

  onSuggestionClick: function(suggestion, e) {
      console.log('clicked ' + suggestion.masterid);
      e.preventDefault();
      this.props.onAdd(suggestion);
      this.refs.relationshipInput.getDOMNode().value = '';
      RelationshipListActions.initialize();
      this.setState({input_value: ''});
  },

  handleInputChange: function(e) {
    this.setState({input_value: e.target.input_value});
  },

  render: function() {
    if (this.props.editable) {
    return (
      <div style={{position:'relative' }} >
            <Panel style={{position:'relative'}}>
              <form className='autocomplete-input'>
               <Input type="text"
                 value={this.state.input_value}
                 placeholder={ 'Connect your ' +
                 this.props.fieldName }
                 onFocus={this.onInputFocus}
                 onInput={this.onInputInput}
                 onChange={this.handleInputChange}
                 ref={'relationshipInput'}
                 addonBefore={<Glyphicon
                   glyph='plus' />} />
                <Input
                  type="text"
                  value={this.state.input_value}
                  onChange={this.handleInputChange}
                  placeholder={this.state.results.length > 0 ? this.state.results[0].name : '' }
                  addonBefore={<Glyphicon
                    glyph='plus' />}/>
            </form>
          </Panel>
{this.state.dropdownVisible ? (
        <ul>
          {this.state.results.map(function(result,
            i) { var boundSuggestionClick = this.onSuggestionClick.bind(this, result);
              return (
                <li
                  tabindex={i}
                  onClick={boundSuggestionClick}
                  className={'autocomplete-dropdown'}
                  key={result.masterid}>
                  <span>
                    {result.name}
                  </span>

                </li>
              );
            }, this)
          }
        </ul>
      ) : '' }
      </div>
    );
  } else {
    return '';
  }
  }
});

module.exports = RelationshipListItemInput;
