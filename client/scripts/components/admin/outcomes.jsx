/**
* PhenomenaConsole
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var OutcomesTable = require('../modules/outcometable.jsx');

var OutcomesConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Outcomes Console</h1>
                        <OutcomesTable />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = OutcomesConsole;
