/**
* UserConsole Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var userStore = require('../../stores/admin/users');
var userActions = require('../../actions/users');
var GriddleComponent = require('./griddle_component.jsx');

var UserConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Users Console">
                        <GriddleComponent store={userStore} actions={userActions}
			                       linkColumnName={"name"}
                             columns={["name", "first", "last", "masterid"]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = UserConsole;
