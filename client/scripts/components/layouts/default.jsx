'use strict';

var React = require('react');

var pageStore = require('../../stores/page');
var accountStore = require('../../stores/accounts');
var accountActions = require('../../actions/accounts');
var Navbar = require('../modules/navbar.jsx');
var Drawer = require('../modules/sidebar.jsx');

var getState = function() {
  var drawerSwitch = false;
  if(window.innerWidth >= 768) {
    drawerSwitch = true;
  }
    return {
        title: pageStore.get().title,
	      account: accountStore.get(),
        drawerOpen: drawerSwitch
    };
};

var Detail = React.createClass({
  render: function() {
    return (
        <div className={this.props.narrow ? 'default detail' : 'default'}>
            <div className="main-container">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        </div>
    );
  }
});

var DefaultComponent = React.createClass({
    mixins: [pageStore.mixin, accountStore.mixin],
    getInitialState: function() {
        return (
          getState()
        );
    },
    componentWillMount: function() {
    	accountActions.fetchUser();
    },
    componentDidMount: function() {
        pageStore.emitChange();
    },
    handleDrawerToggleClick: function(e){
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  },
    render: function() {
        return (
            /* jshint ignore:start */
            <div>

            <Navbar account={this.state.account} onDrawerToggleClick={this.handleDrawerToggleClick} accountActions={accountActions}  />
            <Drawer open={this.state.drawerOpen} searchResultElements={this.props.searchResultElements} searchResultComponent={this.props.searchResultComponent}/>
            <Detail narrow={this.state.drawerOpen} {...this.props}/>

            </div>
            /* jshint ignore:end */
        );
    },
    // Event handler for 'change' events coming from store mixins.
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = DefaultComponent;
