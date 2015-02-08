/**
* Outcome datatable (component)
*/
'use strict';

var React = require('react');

/** Gets incoming information from the store */

var focusStore = require('../../stores/product');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/product');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    items: focusStore.get()
   }
}

var initializeTable = function(state) {
  var listitems = state.items.results;
  $('#list').dataTable({
   "destroy": true,
   "data": listitems,
   "language": {
      search: "",
      searchPlaceholder: "Filter",
      "lengthMenu": "_MENU_"
    },
    "columns" : [
    {"data":"function","title": "Functions"},
    {"data":"name","title": "Headline"},
    {"data":"description","title": "Abstract"},
    {"data":"inspiredby","title": "Inspired By"}
    ]
 });
  $('.dataTables_filter input[type="search"], .dataTables_length select').addClass('form-control input-lg');


}

/** OutcomeFilter class contains a search field that filters items in
* an unordered list in real time.
*/

var ItemsFilter = React.createClass({

  mixins: [focusStore.mixin],

  getInitialState: function() {
    return getState();
  },
  componentWillMount: function() {

  },
  componentDidMount: function(){
    focusActions.getList();
    initializeTable(this.state);
  },
  render: function() {
    return (
      <div>
        <table className='table display' id='list'>

        </table>
        <button className='btn btn-primary' onClick={this.handleClick} label="Reset">Reset</button>
      </div>
    )
  },
  handleClick: function() {
    focusActions.getList();
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
      this.setState(getState());
      initializeTable(this.state);
  }
});

module.exports = ItemsFilter;
