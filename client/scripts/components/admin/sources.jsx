/**
* Sources Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var sourceStore = require('../../stores/admin/sources');
var sourceActions = require('../../actions/sources');
var GriddleComponent = require('./griddle_component.jsx');

var SourceConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Sources Console">
                        <GriddleComponent store={sourceStore} actions={sourceActions}
                          columns={[
                            {columnName:'masterid', displayName:'id', type:'id'},
                            {columnName:'name', displayName:'Name', type:'link'},
                            {columnName:'status', displayName:'Status', type:'text'},
                            {columnName:'type', displayName:'Source', type:'text'},
                            {columnName:'featured_count', displayName:'Featured Count', type:'text'},
                            {columnName:'featured_in', displayName:'Featured In', type:'list'},
                            {columnName:'added', displayName:'Added By', type:'list'},
                            {columnName:'timestamp', displayName:'Date Modified', type:'date'}
                          ]}
                          thumb={['media', 'media_id', 'media_entity']}
                          initialSort={['featured_count', true]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = SourceConsole;
