/**
* Living System Console Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var livingSystemStore = require('../../stores/admin/livingsystems');
var livingSystemActions = require('../../actions/livingsystems');
var GriddleComponent = require('./griddle_component.jsx');

var LivingSystemConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Living System Console</h1>
                        <GriddleComponent store={livingSystemStore} actions={livingSystemActions}
                        linkColumnName={"name"}
                        columns={["name", "status", "type", "featured_count", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = LivingSystemConsole;