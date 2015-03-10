'use strict';

var React = require('react'),
Link = require('./link.jsx'),

Well = require('react-bootstrap').Well,
Glyphicon = require('react-bootstrap').Glyphicon,
Button = require('react-bootstrap').Button,
Input = require('react-bootstrap').Input,
Navbar = require('react-bootstrap').Navbar,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
MenuItem = require('react-bootstrap').MenuItem,
DropdownButton = require('react-bootstrap').DropdownButton;

var routeActions = require('../../actions/routes');
var userActions = require('../../actions/users');

var transitionRoute = function(eventKey, href) {
    routeActions.setRoute(href);
};

var NavbarComponent = React.createClass({
    render: function() {
      var brand = <Link url="/">AN</Link>;
      var user = this.props.user;
      var settingsurl = '/settings';
      var greeting = 'Howdy '+ (user.firstName ? user.firstName : user.email);
      var navLinks = user.loggedIn ? (
        <Nav right navbar-header className="pull-right navbar-header">
          <DropdownButton title={greeting}>
            <MenuItem eventKey="1"><Link url={settingsurl}>My Account</Link></MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="2"><a href="#" onClick={userActions.logoutUser}>Log Out</a></MenuItem>
          </DropdownButton>
        </Nav>
      ) : (
        <Nav right navbar-header className="pull-right navbar-header">
          <NavItem href="/login" onSelect={transitionRoute}>Sign In</NavItem>
        </Nav>
      );
        return (
            /* jshint ignore:start */
            <Navbar fluid inverse fixedTop role="banner">
              {/* Temp button for left offcanvas menu */}
                  <Nav left navbar-header className="pull-left navbar-header">
                  <button type="button" className="navbar-toggle sidebar-toggle" data-toggle="offcanvas" data-target=".navmenu-fixed-left">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" url="/">AN</Link>
                  <form role="search" className='navbar-form navbar-left'>
                    <Input type="text" placeholder="Search AskNature" />
                  </form>
                </Nav>
              {/* End temp button for left offcanvas menu */}
	      {navLinks}
            </Navbar>
            /* jshint ignore:end */
        );
    },
});

module.exports = NavbarComponent;
