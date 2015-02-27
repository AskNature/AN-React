/**
* UserConsole Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userStore = require('../../stores/admin/users');
var userActions = require('../../actions/users');
var GriddleComponent = require('./griddle_component.jsx');

var UserConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Users Griddle Console</h1>
                        <GriddleComponent store={userStore} actions={userActions}
			linkColumnName={"name"}
                        columns={["name", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = UserConsole;
