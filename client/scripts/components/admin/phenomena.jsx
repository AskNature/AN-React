/**
* PhenomenaConsole Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var phenomenaStore = require('../../stores/admin/phenomena');
var phenomenaActions = require('../../actions/phenomena');
var GriddleComponent = require('./griddle_component.jsx');

var PhenomenaConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Phenomena Console">
                        <GriddleComponent store={phenomenaStore}
			actions={phenomenaActions} linkColumnName={"name"}
			columns={["name", "short_name", "parent", "children", "masterid"]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = PhenomenaConsole;
