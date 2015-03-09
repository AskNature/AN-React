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
                        <GriddleComponent store={phenomenaStore} actions={phenomenaActions}
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
