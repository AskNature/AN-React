/**
* Collection Console Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var collectionStore = require('../../stores/admin/collections');
var collectionActions = require('../../actions/collections');
var GriddleComponent = require('./griddle_component.jsx');

var CollectionConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Collection Console</h1>
                        <GriddleComponent store={collectionStore}
                        actions={collectionActions}
                        linkColumnName={"name"}
                        columns={["name", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = CollectionConsole;