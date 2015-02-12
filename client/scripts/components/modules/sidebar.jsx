'use strict';

var React = require('react');

var focusStore = require('../../stores/strategy');

var focusActions = require('../../actions/strategy');

var Link = require('./link.jsx');
var Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
TabbedArea = require('react-bootstrap').TabbedArea,
TabPane = require('react-bootstrap').TabPane,
Table = require('react-bootstrap').Table;


var getState = function() {
  return {
    items: focusStore.get()
   }
}

var initializeTable = function(state) {
  var listitems = state.items.results;
  $('#sidebar_list').dataTable({
   "info": false,
   ordering: false,
   "pagingType": "simple",
   "destroy": true,
   "data": listitems,
   stateSave: true,
   "language": {
      search: "",
      searchPlaceholder: "Search AskNature",
      "lengthMenu": "_MENU_"
    },
    "columns" : [
      {"data":"name","title": "Headline", "render": function(data,type,row) {
          var url = '../strategy/'+row['masterid'];
          return '<a href="'+url+'"><strong>'+data+'</strong></a>';
        }
      }
    ]
 });
 $('.dataTables_filter input[type="search"], .dataTables_length select').addClass('form-control input');
};

var SidebarFilter = React.createClass({

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
        <Table id='sidebar_list' className='compact, hover' />
      </div>
    )
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
      this.setState(getState());
      initializeTable(this.state);
  }
});

var SidebarComponent = React.createClass({
    // mixins: [userStore.mixin],
    getInitialState: function() {
        return getState();
    },
    render: function() {
        return (
            /* jshint ignore:start */
              <div className="navmenu navmenu-default navmenu-fixed-left offcanvas-sm">
                <TabbedArea defaultActiveKey={1} justified>
                  <TabPane eventKey={1} tab="Search">
                    <SidebarFilter />
                  </TabPane>
                  <TabPane eventKey={2} tab="Console">
                    <Nav stacked>
                      <li eventKey={1}><Link url="/">Dashboard</Link></li>
                      <li eventKey={2}><Link url="../admin/outcomes">Phenomena</Link></li>
                      <li eventKey={3}><Link url="../admin/strategies">Natural Solutions</Link></li>
                      <li eventKey={4}><Link url="../admin/products">Inspired Solutions</Link></li>
                      <li eventKey={5}><Link url="#">Sources</Link></li>
                      <li eventKey={6}><Link url="#">Challenges</Link></li>
                      <li eventKey={7}><Link url="#">Users</Link></li>
                      <li eventKey={8}><Link url="#">Living Systems</Link></li>
                      <li eventKey={9}><Link url="#">Researchers</Link></li>
                      <li eventKey={10}><Link url="#">Collections</Link></li>
                    </Nav>
                  </TabPane>
                </TabbedArea>
              </div>

            /* jshint ignore:end */
        );
    },
    // Event handler for 'change' events coming from store mixins.
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports =SidebarComponent;
