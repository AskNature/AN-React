/**
* Sources Console Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var sourceStore = require('../../stores/admin/sources');
var sourceActions = require('../../actions/sources');
var GriddleComponent = require('./griddle_component.jsx');

var SourceConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Sources Console</h1>
                        <GriddleComponent store={sourceStore} actions={sourceActions}
                        linkColumnName={"name"}
                        columns={["name", "status", "type", "featured_count", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = SourceConsole;