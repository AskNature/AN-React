'use strict';

var React = require('react'),
Link = require('./link.jsx'),

Button = require('react-bootstrap').Button,
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
      var brand = <Link url="/">AskNature</Link>;
      var user = this.props.user;
      var settingsurl = "/settings";
      var greeting = 'Howdy '+ (user.firstName ? user.firstName : user.email);
      var navLinks = user.loggedIn ? (
        <Nav right navbar role="navigation">
          <DropdownButton title={greeting}>
            <MenuItem eventKey="1"><Link url={settingsurl}>My Account</Link></MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="2"><a href="#" onClick={userActions.logoutUser}>Log Out</a></MenuItem>
          </DropdownButton>
        </Nav>
      ) : (
        <Nav right navbar-header className="pull-right navbar-header">
          <NavItem href="/login" onSelect={transitionRoute}>Login</NavItem>
          <NavItem href="/signup" onSelect={transitionRoute}>Sign Up</NavItem>
        </Nav>
      );
        return (
            /* jshint ignore:start */
            <Navbar fluid inverse fixedTop role="banner">
              {/* Temp button for left offcanvas menu */}
                  <Nav left className="pull-left navbar-header">
                  <button type="button" className="navbar-toggle sidebar-toggle" data-toggle="offcanvas" data-target=".navmenu-fixed-left">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" url="/">AskNature</Link>
                  </Nav>
              {/* End temp button for left offcanvas menu */}

            </Navbar>
            /* jshint ignore:end */
        );
    },
});

module.exports = NavbarComponent;
