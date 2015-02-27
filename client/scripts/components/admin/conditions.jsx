/**
* Conditions Console Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var conditionStore = require('../../stores/admin/conditions');
var conditionActions = require('../../actions/conditions');
var GriddleComponent = require('./griddle_component.jsx');

var ConditionConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Challenge Console</h1>
                        <GriddleComponent store={conditionStore} actions={conditionActions}
                        linkColumnName={"name"}
                        columns={["name", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ConditionConsole;