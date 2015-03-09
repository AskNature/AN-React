/**
* ProductConsole Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var strategySt = require('../../stores/admin/strategies');
var strategyAc = require('../../actions/strategies');
var GriddleComponent = require('./griddle_component.jsx');

var StrategyConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Biological Strategy Console">
              <GriddleComponent store={strategySt} actions={strategyAc}
                linkColumnName={"name"}
                columns={["name", "description", "masterid"]}
                listColumns={["outcomes", "living_system"]}
                thumb={['media', 'media_id', 'media_entity']} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = StrategyConsole;
