'use strict';

var React = require('react');
var Navbar = require('react-bootstrap').Navbar,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
MenuItem = require('react-bootstrap').MenuItem,
DropdownButton = require('react-bootstrap').DropdownButton,
Link = require('./link.jsx');


var getState = function() {
    return {
        // user: userStore.get()
    };
};

var NavbarComponent = React.createClass({
    // mixins: [userStore.mixin],
    getInitialState: function() {
        return getState();
    },
    render: function() {

      var brand = <Link url="/">AskNature</Link>;

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
                  <Nav right navbar role="navigation">
                    <DropdownButton title="Account">
                      <MenuItem eventKey="2">Action</MenuItem>
                      <MenuItem eventKey="3">Another action</MenuItem>
                      <MenuItem eventKey="4">Something else here</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey="5">Separated link</MenuItem>
                    </DropdownButton>
                  </Nav>
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
