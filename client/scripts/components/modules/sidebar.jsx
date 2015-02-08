'use strict';

var React = require('react');
var Link = require('./link.jsx');

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
            <div>
              <div className="navmenu navmenu-default navmenu-fixed-left offcanvas-sm">
                <ul className="nav navmenu-nav">
                  <li><Link url="#"><strong>Content Management Tools</strong></Link></li>
                  <li><Link url="/">Dashboard</Link></li>
                  <li><Link url="../admin/outcomes">Outcomes Console</Link></li>
                  <li><Link url="../admin/strategies">Strategy Console</Link></li>
                  <li><Link url="../admin/products">Product Console</Link></li>
                </ul>
              </div>

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
