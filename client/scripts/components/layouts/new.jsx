'use strict';

var React = require('react'),
pageStore = require('../../stores/page'),
routeActions = require('../../actions/routes'),
accountStore = require('../../stores/accounts'),
accountActions = require('../../actions/accounts'),
Navbar = require('../modules/new_navbar.jsx'),
Drawer = require('../modules/sidebar.jsx');

var getState = function() {
    var drawerSwitch = false;
    if(window.innerWidth >= 768) {
        drawerSwitch = true;
    }
    return {
        title: pageStore.get().title,
        account: accountStore.get(),
        drawerOpen: drawerSwitch,
	type: 'b.strategy'
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
            <div className={this.props.narrow ? 'disabled-overlay visible' : 'disabled-overlay'} onClick={this.props.toggle} ></div>
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
        window.addEventListener('resize', this.handleResize);
        if(window.attachEvent) {
            // Provides compatibility for IE <9
            window.attachEvent('onresize', this.handleResize);
        } else if(window.addEventListener) {
            // Compatibility for everything else
            window.addEventListener('resize', this.handleResize, true);
        } else {
            //The browser does not support Javascript event binding
            console.log('The browser does not support Javascript event binding');
        }
    },

    componentWillUnmount: function () {
        if(window.detachEvent) {
            window.detachEvent('onresize', this.handleResize);
        } else if(window.removeEventListener) {
            window.removeEventListener('resize', this.handleResize);
        } else {
            //The browser does not support Javascript event binding
            console.log('The browser does not support Javascript event binding');
        }
    },

    handleDrawerToggleClick: function(e){
        e.preventDefault();
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    },

    handleSearchFocus: function(e){
        this.setState({
            drawerOpen: true
        });
    },

    // This needs to find a new home where it can get events from sidebar drawer clicks:
    handleResultClick: function(e) {
        e.persist();
        var drawerSwitch;
        if(window.innerWidth < 768) {
            drawerSwitch = false;
        } else {
            drawerSwitch = true;
        }
        this.setState({drawerOpen: drawerSwitch});
    },

    handleResize: function(e) {
        var drawerSwitch;
        if(window.innerWidth < 768) {
            drawerSwitch = false;
        } else {
            drawerSwitch = true;
        }
        this.setState({drawerOpen: drawerSwitch});
    },

    handleQueryChange: function(newQuery) {
	routeActions.setRoute(newQuery ? '/query:'+newQuery+'/'+this.state.type : '/');
    },

    defaultContent: (<div className="main-container">
                  <div className="container">
                    <div className="jumbotron">
                    <h2>Welcome to the AskNature 2 Incubator!</h2>
                    <p>This site is in a <strong>very early stage of development</strong>. We welcome you to check it out, but be warned that everything is still very rough and many things won't work.</p>
                    <p>Happy Exploring, The AskNature Team</p>
                    <p><a href="http://www.biomimicry.org" target="_blank">The Biomimicry Institute</a></p>
                  <p><a className="btn btn-primary btn-lg" href="http://www.asknature.org" role="button">Go to AskNature.org</a></p>
                  </div>
                </div>
                </div>),

    handleTypeChange: function(type) {
        console.log("type changed");
	this.setState({type: type.slug});
	routeActions.setRoute('/query:'+this.props.searchQuery+'/'+type.slug);
    },

    render: function() {
        return (
            /* jshint ignore:start */
            <div>
                <Navbar
	          query={this.props.query}
	          handleQueryChange={this.handleQueryChange}
	          account={this.state.account}
	          onDrawerToggleClick={this.handleDrawerToggleClick}
                  onSearchFocus={this.handleSearchFocus} />
	        <Drawer
	          open={this.state.drawerOpen}
	          loggedIn={this.state.account.loggedIn}
	          mobile={window.innerWidth < 768 ? true : false}
		  searchResultElements={this.props.searchResultElements}
		  searchResultComponent={this.props.searchResultComponent}
		  searchResultHeight={this.props.searchResultHeight}
		  handleTypeChange={this.handleTypeChange} />
 		<Detail narrow={this.state.drawerOpen} toggle={this.handleDrawerToggleClick}>
                {!this.props.children ? this.defaultContent : this.props.children}
		</Detail>
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
