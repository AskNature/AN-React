/**
* ProductConsole Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var strategySt = require('../../stores/admin/strategies');
var strategyAc = require('../../actions/strategies');
var GriddleComponent = require('./griddle_component.jsx');

var StrategyConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Life's Solutions Griddle Console</h1>
                        <GriddleComponent store={strategySt} actions={strategyAc}
                        columns={["name", "description", "outcomes", "living_system"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = StrategyConsole;
