/**
* ProductConsole Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var productStore = require('../../stores/admin/products');
var productActions = require('../../actions/products');
var GriddleComponent = require('./griddle_component.jsx');

var ProductConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                        <h1>Inspired Solutions Console</h1>
                        <GriddleComponent store={productStore} actions={productActions}
			linkColumnName={"name"}
			columns={["name", "description", "inspiredby", "outcomes", "masterid"]} />
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ProductConsole;
