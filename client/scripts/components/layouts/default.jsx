'use strict';

var React = require('react');

var pageStore = require('../../stores/page');
var userStore = require('../../stores/accounts');
var userActions = require('../../actions/users');
var Navbar = require('../modules/navbar.jsx');
var Drawer = require('../modules/sidebar.jsx');


var getState = function() {
    return {
        title: pageStore.get().title,
	      user: userStore.get()
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
    mixins: [pageStore.mixin, userStore.mixin],
    getInitialState: function() {
        var drawerSwitch;
        if(window.innerWidth >= 768) {
          drawerSwitch = true;
        } else {
          drawerSwitch = false;
        }
        return {
          title: pageStore.get().title,
          drawerOpen: drawerSwitch,
  	      user: userStore.get()
        };
    },
    componentWillMount: function() {
    	userActions.fetchUser();
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

            <Navbar user={this.state.user} onDrawerToggleClick={this.handleDrawerToggleClick} />
            <Drawer open={this.state.drawerOpen}/>
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
