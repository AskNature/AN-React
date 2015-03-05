/**
* Conditions Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var conditionStore = require('../../stores/admin/conditions');
var conditionActions = require('../../actions/conditions');
var GriddleComponent = require('./griddle_component.jsx');

var ConditionConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Conditions Console">
                        <GriddleComponent store={conditionStore} actions={conditionActions}
                        linkColumnName={"name"}
                        columns={["name", "masterid"]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ConditionConsole;
