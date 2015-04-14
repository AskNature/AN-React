'use strict';

var React = require('react'),

Link = require('./link.jsx'),
Avatar = require('react-avatar'),

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

var transitionRoute = function(eventKey, href) {
    routeActions.setRoute(href);
};

var NavbarComponent = React.createClass({
    render: function() {
      var brand = <Link url="/">AN</Link>;
      var account = this.props.account;
      var settingsurl = '/settings';
      var greeting = 'Howdy '+ (account.firstName ? account.firstName : account.email);
      console.log(this.props.account.firstName);
      var navLinks = account.loggedIn === true ? (
        <Nav right navbar-header className="pull-right navbar-header">
          <DropdownButton noCaret title={<Avatar size='40' round />} className='loggedin-menu'>
            <MenuItem eventKey='0' className='disabled'>{greeting}</MenuItem>
            <MenuItem eventKey="1"><Link url={settingsurl}>My Account</Link></MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="2"><a href="#" onClick={this.props.accountActions.logoutUser}>Log Out</a></MenuItem>
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
                     <Button className="flat-button drawer-toggle" onClick={this.props.onDrawerToggleClick} bsSize="large"><Glyphicon glyph="menu-hamburger" /></Button>
                  <Link className="navbar-brand" url="/">AN</Link>
                  <form role="search" className='navbar-form navbar-left'>
                    <Input addonBefore={<Glyphicon glyph='search' />} type="text" placeholder="Search AskNature" value={this.props.searchQuery} onFocus={this.props.onSearchFocus} onChange={this.props.searchQueryChange}/>
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
