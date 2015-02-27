/**
* PhenomenaConsole Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var phenomenaStore = require('../../stores/admin/phenomena');
var phenomenaActions = require('../../actions/phenomena');
var GriddleComponent = require('./griddle_component.jsx');

var PhenomenaConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Phenomena Console</h1>
                        <GriddleComponent store={phenomenaStore}
			actions={phenomenaActions} linkColumnName={"name"}
			columns={["name", "short_name", "parent", "children", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = PhenomenaConsole;
