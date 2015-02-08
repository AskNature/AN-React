/**
* PhenomenaConsole
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var FocusTable = require('../modules/producttable.jsx');

var FocusConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Product Console</h1>
                        <FocusTable />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = FocusConsole;
