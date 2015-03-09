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
            <ConsoleLayout title='Media Console'>
                        <GriddleComponent store={mediaStore}
                        actions={mediaActions}
                        linkColumnName={[{column:"name", display:"Name"}]}
                        idColumnName={["masterid"]}
                        columns={[{column:"media", display:"Filename"}]}
                        timestamp={['timestamp']}
                        thumb={['media_id', 'media_entity']}
                        initialSort={['timestamp', false]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = MediaConsole;
