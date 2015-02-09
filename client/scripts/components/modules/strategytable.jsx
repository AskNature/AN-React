/**
* Outcome datatable (component)
*/
'use strict';

var React = require('react');
var routeActions = require('../../actions/routes');

/** Gets incoming information from the store */

var focusStore = require('../../stores/strategy');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/strategy');

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
   stateSave: true,
   "language": {
      search: "",
      searchPlaceholder: "Filter",
      "lengthMenu": "_MENU_"
    },
    "columns" : [
    {"data":"name","title": "Headline", "render": function(data,type,row) {
      var url = '../strategy/'+row['masterid'];
      return '<a href="'+url+'"><strong>'+data+'</strong></a>';
    }
    },
    {"data":"description","title": "Abstract"},
    {"data":"function","title": "Functions"},
    {"data":"living_system","title": "Living Systems"}
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
      </div>
    )
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
      this.setState(getState());
      initializeTable(this.state);
  }
});

module.exports = ItemsFilter;
