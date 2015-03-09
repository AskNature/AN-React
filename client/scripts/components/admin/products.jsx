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
                        columns={[
                          {columnName:'masterid', displayName:'id', type:'id'},
                          {columnName:'description', displayName:'Name', type:'link'},
                          {columnName:'name', displayName:'System', type:'text'},
                          {columnName:'outcomes', displayName:'Outcomes', type:'list'},
                          {columnName:'inspiredby', displayName:'Inspiration', type:'list'},
                          {columnName:'timestamp', displayName:'Date Modified', type:'date'}
                          ]}
                        thumb={['media', 'media_id', 'media_entity']}
                        initialSort={['timestamp', false]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ProductConsole;
