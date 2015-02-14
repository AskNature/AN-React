'use strict';

var React = require('react');

var Griddle = require('griddle-react');

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

var LinkComponent = React.createClass({
  render: function(){
    var url ="../strategy/"+ this.props.rowData.masterid;
    return <Link url={url}>{this.props.data}</Link>
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
      this.setState(getState());
  }
});

var columnMeta = [
  {
  "columnName": "name",
  "visible": true,
  "customComponent": LinkComponent
}
];


var SidebarFilter = React.createClass({

  mixins: [focusStore.mixin],

  getInitialState: function() {
    return getState();
  },
  componentWillMount: function() {

  },
  componentDidMount: function(){
    focusActions.getList();
  },
  render: function() {

    return (
      <div>
        <Griddle results={this.state.items.results} columnMetadata={columnMeta} tableClassName="table" showFilter={true}
 columns={["name"]} useGriddleStyles={false} enableInfiniteScroll={true} bodyHeight={800} noDataMessage={"No data could be found, Mr. Awesomepants."}/>
      </div>
    )
  },
  componentWillReceiveProps: function () {
    this.setState(getState());
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
      this.setState(getState());
  }
});

var SidebarComponent = React.createClass({
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
