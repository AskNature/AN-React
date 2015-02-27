'use strict';

var React = require('react');

var Link = require('./link.jsx');
var Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
TabbedArea = require('react-bootstrap').TabbedArea,
TabPane = require('react-bootstrap').TabPane,
Table = require('react-bootstrap').Table;

var SidebarComponent = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
              <div className="navmenu navmenu-default navmenu-fixed-left offcanvas-xs">
                <TabbedArea defaultActiveKey={2} justified>
                  <TabPane eventKey={1} tab="Search">
                    <p>Placeholder</p>
                  </TabPane>
                  <TabPane eventKey={2} tab='Admin'>
                    <Nav stacked>
                      <li eventKey={2}><Link url="../admin/phenomena">Phenomena</Link></li>
                      <li eventKey={3}><Link url="../admin/strategies">Biological Strategies</Link></li>
                      <li eventKey={4}><Link url="../admin/products">Inspired Solutions</Link></li>
                      <li eventKey={5}><Link url="../admin/sources">Sources</Link></li>
                      <li eventKey={6}><Link url="../admin/conditions">Challenges</Link></li>
                      <li eventKey={7}><Link url="../admin/users">Users</Link></li>
                      <li eventKey={8}><Link url="../admin/living-systems">Living Systems</Link></li>
                      <li eventKey={9}><Link url="../admin/researchers">Researchers</Link></li>
                      <li eventKey={10}><Link url="../admin/collections">Collections</Link></li>
                      <li eventKey={11}><Link url="../admin/media">Media</Link></li>
                    </Nav>
                  </TabPane>
                </TabbedArea>
              </div>

            /* jshint ignore:end */
        );
    }

});

module.exports =SidebarComponent;
