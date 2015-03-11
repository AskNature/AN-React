/**
* Researcher Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var researcherStore = require('../../stores/admin/researchers');
var researcherActions = require('../../actions/researchers');
var GriddleComponent = require('./griddle_component.jsx');

var ResearcherConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Researchers Console">
                        <GriddleComponent store={researcherStore}
			actions={researcherActions}
                        linkColumnName={"name"}
                        columns={["name", "masterid"]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ResearcherConsole;
