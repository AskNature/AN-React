/**
* PhenomenaConsole Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var store = require('../../stores/admin/generic-list.js');
var actions = require('../../actions/generic-list');
var GriddleComponent = require('./griddle_component.jsx');

var PhenomenaConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural='Phenomena' singular='Phenomenon'>
                        <GriddleComponent store={store} actions={actions}
                          columns={[
                            {columnName:'masterid', displayName:'id', type:'id'},
                            {columnName:'name', displayName:'Name', type:'link'},
                            {columnName:'parent', displayName:'Parent', type:'text'},
                            {columnName:'short_name', displayName:'Short Name', type:'text'},
                            {columnName:'child_items', displayName:'Children', type:'list'},
                            {columnName:'outcome_count', displayName:'Outcome Count', type:'text'},
                          ]}
                          thumb={['media', 'media_id', 'media_entity']} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = PhenomenaConsole;
