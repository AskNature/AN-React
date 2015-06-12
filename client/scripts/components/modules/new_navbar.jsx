'use strict';

var React = require('react'),

Link = require('./link.jsx'),
Avatar = require('react-avatar'),
FontAwesome = require('react-fontawesome'),

Well = require('react-bootstrap').Well,
Button = require('react-bootstrap').Button,
Input = require('react-bootstrap').Input,
Navbar = require('react-bootstrap').Navbar,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
MenuItem = require('react-bootstrap').MenuItem,
DropdownButton = require('react-bootstrap').DropdownButton;

var routeActions = require('../../actions/routes');
var accountActions = require('../../actions/accounts');

var NavbarComponent = React.createClass({
    transitionRoute: function(eventKey, href) {
        eventKey.preventDefault();
        routeActions.setRoute(eventKey.target.href);
    },

    onKeyPress: function(e) {
        if(e.charCode === 13) { // if enter pressed
            e.preventDefault();
	    e.target.blur();
	    if (this.props.handleQueryChange) { this.props.handleQueryChange(e.target.value); }
        }
    },

    render: function() {
      var account = this.props.account;
      var settingsurl = '/settings';
      var greeting = 'Howdy '+ (account.firstName ? account.firstName : account.email);
      var navLinks = account.loggedIn === true ? (
        <Nav right className="pull-right navbar-header">
          <DropdownButton noCaret title={<Avatar size={40} round />} className='loggedin-menu'>
            <MenuItem eventKey='0' className='disabled'>{greeting}</MenuItem>
            <MenuItem eventKey="1" href={settingsurl} onClick={this.transitionRoute}>My Account</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="2" onClick={function(e) { e.preventDefault(); accountActions.logoutUser(); }}>Log Out</MenuItem>
          </DropdownButton>
        </Nav>
      ) : (
        <Nav right navbar-header className="pull-right navbar-header">
          <NavItem href="/login" onClick={this.transitionRoute}>Sign In</NavItem>
        </Nav>
      );

        return (
            /* jshint ignore:start */
            <Navbar fluid inverse fixedTop role="banner">
                <Nav left navbar-header className="pull-left navbar-header">
                    <Button
		      className="flat-button drawer-toggle"
		      onClick={this.props.onDrawerToggleClick}
		      bsSize="large">
		        <FontAwesome name='bars' fixedWidth />
		    </Button>
                    <Link className="navbar-brand" url="/" />
                    <form
		      role="search"
		      className='navbar-form navbar-left search'>
                        <Input
                          className='search-input'
                          type="text"
                          placeholder="How might we ..."
                          defaultValue={this.props.query}
		          onFocus={this.props.onSearchFocus}
		          onKeyPress={this.onKeyPress}
                          ref="searchbar" />
                        <label className='search-label'>
                            <FontAwesome name='search'  fixedWidth />
                        </label>
                    </form>
                </Nav>
	        {navLinks}
            </Navbar>
            /* jshint ignore:end */
        );
    },
});

module.exports = NavbarComponent;
