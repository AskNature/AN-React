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
            <ConsoleLayout plural='Users' singular='User'>
                        <GriddleComponent store={userStore} actions={userActions}
                          columns={[
                            {columnName:'masterid', displayName:'id', type:'id'},
                            {columnName:'name', displayName:'Name', type:'link'},
                            {columnName:'first', displayName:'First Name', type:'text'},
                            {columnName:'last', displayName:'Last Name', type:'text'},
                            {columnName:'registration_date', displayName:'Registered On', type:'date'},
                            {columnName:'status', displayName:'Status', type:'text'}
                            ]}
                          initialSort={['registration_date', false]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = UserConsole;
