'use strict';

var React = require('react'),
Link = require('./link.jsx'),
userActions = require('../../actions/user'),
userStore = require('../../stores/user'),

Navbar = require('react-bootstrap').Navbar,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
MenuItem = require('react-bootstrap').MenuItem,
DropdownButton = require('react-bootstrap').DropdownButton;


var getState = function() {
    return {
        user: userStore.get()
    };
};

var NavbarComponent = React.createClass({
    // mixins: [userStore.mixin],
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
      userActions.fetchUser();
    },

    render: function() {

      var brand = <Link url="/">AskNature</Link>;
      var user = this.state.user;
      var settingsurl = "/settings/" + user.username;
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
    // Event handler for 'change' events coming from store mixins.
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports =NavbarComponent;
