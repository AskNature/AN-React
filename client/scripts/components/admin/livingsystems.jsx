/**
* Living System Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var livingSystemStore = require('../../stores/admin/livingsystems');
var livingSystemActions = require('../../actions/livingsystems');
var GriddleComponent = require('./griddle_component.jsx');

var LivingSystemConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Living System Console">
                        <GriddleComponent store={livingSystemStore} actions={livingSystemActions}
                        linkColumnName={"name"}
                        columns={["name", "status", "type", "featured_count", "masterid"]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = LivingSystemConsole;
