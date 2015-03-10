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
            <ConsoleLayout plural='Researchers' singular='Researcher'>
                        <GriddleComponent store={researcherStore} actions={researcherActions}
                          columns={[
                            {columnName:'masterid', displayName:'id', type:'id'},
                            {columnName:'name', displayName:'Name', type:'link'},
                            {columnName:'institution', displayName:'Institution', type:'text'},
                            {columnName:'country', displayName:'Country', type:'text'},
                            {columnName:'studied_by', displayName:'Referenced By', type:'list'},
                            {columnName:'timestamp', displayName:'Date Modified', type:'date'}
                          ]}
                          thumb={['media', 'media_id', 'media_entity']}
                          initialSort={['timestamp', false]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ResearcherConsole;
