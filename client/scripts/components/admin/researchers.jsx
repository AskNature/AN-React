/**
* Researcher Console Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var researcherStore = require('../../stores/admin/researchers');
var researcherActions = require('../../actions/researchers');
var GriddleComponent = require('./griddle_component.jsx');

var ResearcherConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Researchers Console</h1>
                        <GriddleComponent store={researcherStore}
			actions={researcherActions}
                        linkColumnName={"name"}
                        columns={["name", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ResearcherConsole;