/**
* Outcome filterable list module (component)
*/
'use strict';

var React = require('react');

/** Gets incoming information from the store */

var outcomeStore = require('../../stores/outcome');

/** Sends outgoing requests to an action */

var outcomeActions = require('../../actions/outcome');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    initialItems: outcomeStore.getOutcomes().results,
    items: outcomeStore.getOutcomes().results
   }
}

/** List class contains an unordered list of data mapped to
* individual list items.
*/

var List = React.createClass({
  render: function(){
    return (
      <ul>
      {
        this.props.items.map( function(item) {
          return <li key={item.masterid}>{item.description}</li>
        })
      }
      </ul>
    )
  }
});

/** OutcomeFilter class contains a search field that filters items in
* an unordered list in real time.
*/

var OutcomeFilter = React.createClass({

  /** This mixin is defined in ../../stores/default.js and adds listeners
  * to the componentDidMount and componentWillUnmount functions.
  */

  mixins: [outcomeStore.mixin],

  filterList: function(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.description.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
    console.log('filterList: ' + updatedList.length + ' search results.');
  },

  getInitialState: function() {
    // Calls the function defined above
    return getState();
  },

  componentWillMount: function() {
    // Action invoked at initial rendering to retrieve data from DB.
    outcomeActions.getOutcomes();
    console.log('Data for initial state requested from DB.');
  },

  render: function() {
    return (
      <div className="filter-list">
        <input type="text" placeholder="Filter" onChange={this.filterList}/>
        <h6>Showing {this.state.items.length} Functions</h6>
        <List items={this.state.items}/>
      </div>
    )
  },

  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
     this.setState(getState());
  }
});

module.exports = OutcomeFilter;
