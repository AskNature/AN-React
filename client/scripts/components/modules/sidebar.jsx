'use strict';

var React = require('react');
var Link = require('./link.jsx');
var Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem;

var getState = function() {
    return {
        // user: userStore.get()
    };
};

var SidebarComponent = React.createClass({
    // mixins: [userStore.mixin],
    getInitialState: function() {
        return getState();
    },
    render: function() {
        return (
            /* jshint ignore:start */
              <div className="navmenu navmenu-default navmenu-fixed-left offcanvas-sm">
                <Nav stacked>
                  <NavItem eventKey={0}><strong>Content Management Consoles</strong></NavItem>
                  <li eventKey={1}><Link url="/">Dashboard</Link></li>
                  <li eventKey={2}><Link url="../admin/outcomes">Phenomena</Link></li>
                  <li eventKey={3}><Link url="../admin/strategies">Natural Solutions</Link></li>
                  <li eventKey={4}><Link url="../admin/products">Inspired Solutions</Link></li>
                  <li eventKey={5}><Link url="#">Sources</Link></li>
                  <li eventKey={6}><Link url="#">Challenges</Link></li>
                  <li eventKey={7}><Link url="#">Users</Link></li>
                  <li eventKey={8}><Link url="#">Living Systems</Link></li>
                  <li eventKey={9}><Link url="#">Researchers</Link></li>
                  <li eventKey={10}><Link url="#">Collections</Link></li>
                </Nav>
              </div>

            /* jshint ignore:end */
        );
    },
    // Event handler for 'change' events coming from store mixins.
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports =SidebarComponent;
