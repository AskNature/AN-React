/**
* Strategy Console
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var FocusTable = require('../modules/strategytable.jsx');

var FocusConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Strategy Console</h1>
                        <FocusTable />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = FocusConsole;
