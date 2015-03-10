/**
* Collection Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var collectionStore = require('../../stores/admin/collections');
var collectionActions = require('../../actions/collections');
var GriddleComponent = require('./griddle_component.jsx');

var CollectionConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural='Collections' singular='Collection'>
                        <GriddleComponent store={collectionStore}
                        actions={collectionActions}
                        linkColumnName={"name"}
                        columns={["name", "masterid"]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = CollectionConsole;
