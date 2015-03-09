/**
* ProductConsole Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var productStore = require('../../stores/admin/products');
var productActions = require('../../actions/products');
var GriddleComponent = require('./griddle_component.jsx');

var ProductConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title="Inspired Solutions Console">
                        <GriddleComponent store={productStore} actions={productActions}
			linkColumnName={"description"}
			columns={["description", "name", "masterid"]}
      listColumns={["inspiredby", "outcomes"]}
      thumb={['media', 'media_id', 'media_entity']} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ProductConsole;
