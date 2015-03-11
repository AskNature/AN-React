/**
* Media Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var mediaStore = require('../../stores/admin/media');
var mediaActions = require('../../actions/media');
var GriddleComponent = require('./griddle_component.jsx');

var MediaConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural='Media' singular='Media Item'>
                        <GriddleComponent store={mediaStore} actions={mediaActions}
                          columns={[
                            {columnName:'masterid', displayName:'id', type:'id'},
                            {columnName:'name', displayName:'Name', type:'link'},
                            {columnName:'media', displayName:'Filename', type:'text'},
                            {columnName:'timestamp', displayName:'Date Added', type:'date'},
                            ]}
                          thumb={['media_id', 'media_entity']}
                          initialSort={['timestamp', false]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = MediaConsole;
