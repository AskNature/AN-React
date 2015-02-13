'use strict';

var React = require('react'),
Link = require('./link.jsx'),

Navbar = require('react-bootstrap').Navbar,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
MenuItem = require('react-bootstrap').MenuItem,
DropdownButton = require('react-bootstrap').DropdownButton;


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
            <MenuItem eventKey="2">Log Out</MenuItem>
          </DropdownButton>
        </Nav>
      ) : (
        <Nav right navbar role="navigation">
          <NavItem href="/auth/google">Login</NavItem>
          <NavItem href="/auth/google">Create Account</NavItem>
        </Nav>
      );
        return (
            /* jshint ignore:start */
            <Navbar fluid inverse fixedTop role="banner">
              {/* Temp button for left offcanvas menu */}
                  <button type="button" className="navbar-toggle sidebar-toggle" data-toggle="offcanvas" data-target=".navmenu-fixed-left">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" url="/">AskNature</Link>
              {/* End temp button for left offcanvas menu */}
                {navLinks}

            </Navbar>
            /* jshint ignore:end */
        );
    },
});

module.exports = NavbarComponent;
