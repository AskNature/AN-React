/**
* Outcome datatable (component)
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
    items: outcomeStore.getOutcomes().results
   }
}


/** OutcomeFilter class contains a search field that filters items in
* an unordered list in real time.
*/

var OutcomeFilter = React.createClass({

  /** This mixin is defined in ../../stores/default.js and adds listeners
  * to the componentDidMount and componentWillUnmount functions.
  */

  mixins: [outcomeStore.mixin],

  getInitialState: function() {
    // Calls the function defined above
    return getState();

  },
  componentWillMount: function(){
    outcomeActions.getOutcomes();



  },
  componentDidMount: function(){


   },
   componentWillUpdate: function(){

    },

  render: function() {
    return (
      <div>
        <table className='table table-bordered display' id='functions'>

        </table>
        <button className='btn btn-primary' onClick={this.handleClick} label="Reset">Reset</button>
      </div>
    )
  },
  handleClick: function() {
      outcomeActions.getOutcomes();
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
      this.setState(getState());
      var yipee = this.state.items;
        $('#functions').dataTable({
       "destroy": true,
       "data": yipee,
       "columns" : [
       {"data":"name","title": "Short Name"},
       {"data":"description","title": "Long Name"},
       {"data":"parent","title": "Parent Function"},
       {"data":"children","title": "Child Functions"}
       ]
     });
  }
});

module.exports = OutcomeFilter;
