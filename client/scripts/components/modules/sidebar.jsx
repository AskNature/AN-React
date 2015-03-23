'use strict';

var React = require('react/addons'),

Link = require('./link.jsx'),

FontAwesome = require('react-fontawesome'),
Nav = require('react-bootstrap').Nav;

var ReactCSSTransition = React.addons.CSSTransitionGroup;

var SidebarComponent = React.createClass({
    render: function() {
        var items = [];
        if (this.props.open) {
          items.push(
                    <Nav stacked className='drawer'>
                      <li eventKey={2}><Link url="/list/phenomena"><FontAwesome name='fire' size='lg' fixedWidth className='pull-left' />&nbsp; Phenomena</Link></li>
                      <li eventKey={3}><Link url="/list/strategies"><FontAwesome name='leaf' size='lg' fixedWidth className='pull-left' />&nbsp; Biological Strategies</Link></li>
                      <li eventKey={4}><Link url="/list/products"><FontAwesome name='recycle' size='lg' fixedWidth className='pull-left' />&nbsp; Inspired Solutions</Link></li>
                      <li eventKey={5}><Link url="/list/sources"><FontAwesome name='book' size='lg' fixedWidth className='pull-left' />&nbsp; Sources</Link></li>
                      <li eventKey={6}><Link url="/list/conditions"><FontAwesome name='cloud' size='lg' fixedWidth className='pull-left' />&nbsp; Context</Link></li>
                      <li eventKey={7}><Link url="/list/users"><FontAwesome name='users' size='lg' fixedWidth className='pull-left' />&nbsp; Users</Link></li>
                      <li eventKey={8}><Link url="/list/living-systems"><FontAwesome name='tree' size='lg' fixedWidth className='pull-left' />&nbsp; Living Systems</Link></li>
                      <li eventKey={9}><Link url="/list/researchers"><FontAwesome name='university' size='lg' fixedWidth className='pull-left' />&nbsp; Researchers</Link></li>
                      <li eventKey={10}><Link url="/list/collections"><FontAwesome name='bookmark' size='lg' fixedWidth className='pull-left' />&nbsp; Collections</Link></li>
                      <li eventKey={11}><Link url="/list/media"><FontAwesome name='photo' size='lg' fixedWidth className='pull-left' />&nbsp; Media</Link></li>
                    </Nav>

          );
        }

        return (
            /* jshint ignore:start */
            <ReactCSSTransition transitionName="drawer">
                {items}
            </ReactCSSTransition>

            /* jshint ignore:end */
        );
    }

});

module.exports =SidebarComponent;
