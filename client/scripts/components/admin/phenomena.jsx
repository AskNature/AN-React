/**
* PhenomenaConsole Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var focusStore = require('../../stores/admin/phenomena');
var focusActions = require('../../actions/phenomena');

var getState = function() {
  return {
    items: focusStore.get()
  };
};

var initializeTable = function(state) {
  var listitems = state.items.results;
  $('#list').dataTable({
   'destroy': true,
   'data': listitems,
   stateSave: true,
   'language': {
      search: '',
      searchPlaceholder: 'Filter',
      'lengthMenu': '_MENU_'
    },
    'columns' : [
      {'data':'name','title': 'Name', 'render': function(data,type,row) {
          var url = '../phenomenon/'+row.masterid;
          return '<a href="'+url+'"><strong>'+data+'</strong></a>';
        }
      },
      {'data':'short_name','title': 'Short Name'},
      {'data':'parent','title': 'Parent Phenomenon', 'render': function(data,type,row) {
          var url = '../phenomenon/'+row.parentid;
          return '<a href="'+url+'"><strong>'+data+'</strong></a>';
        }
      },
      {'data':'children','title': 'Child Phenomena'}
    ]
 });
 $('.dataTables_filter input[type="search"], .dataTables_length select').addClass('form-control input-lg');
};

/** ItemsFilter class contains a search field that filters items in
* an unordered list in real time.
*/

var FocusTable = React.createClass({

  mixins: [focusStore.mixin],

  getInitialState: function() {
    return getState();
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
    );
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

var FocusConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Phenomena Console</h1>
                        <FocusTable />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = FocusConsole;
