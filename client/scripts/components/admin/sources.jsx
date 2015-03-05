/**
* Sources Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var sourceStore = require('../../stores/admin/sources');
var sourceActions = require('../../actions/sources');
var GriddleComponent = require('./griddle_component.jsx');

var SourceConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Sources Console">
                        <GriddleComponent store={sourceStore} actions={sourceActions}
                        linkColumnName={"name"}
                        columns={["name", "status", "type", "featured_count", "masterid"]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = SourceConsole;
