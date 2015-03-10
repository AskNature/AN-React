/**
* Living System Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var livingSystemStore = require('../../stores/admin/livingsystems');
var livingSystemActions = require('../../actions/livingsystems');
var GriddleComponent = require('./griddle_component.jsx');

var LivingSystemConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural='Living Systems' singular='Living System'>
                        <GriddleComponent store={livingSystemStore} actions={livingSystemActions}
                          columns={[
                            {columnName:'masterid', displayName:'id', type:'id'},
                            {columnName:'taxon', displayName:'Taxon', type:'id'},
                            {columnName:'name', displayName:'Latin Name', type:'link'},
                          ]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = LivingSystemConsole;
