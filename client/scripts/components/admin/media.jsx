/**
* Media Console Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var mediaStore = require('../../stores/admin/media');
var mediaActions = require('../../actions/media');
var GriddleComponent = require('./griddle_component.jsx');

var MediaConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Media Console</h1>
                        <GriddleComponent store={mediaStore}
                        actions={mediaActions}
                        linkColumnName={"filename"}
                        columns={["filename", "name", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = MediaConsole;