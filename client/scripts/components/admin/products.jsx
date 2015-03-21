/**
* ProductConsole Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var productStore = require('../../stores/admin/generic-list.js');
var productActions = require('../../actions/generic-list');
var GriddleComponent = require('./griddle_component.jsx');

var ProductConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural='Inspired Solutions' singular='Inspired Solution'>
                      <GriddleComponent store={productStore} actions={productActions}
                        columns={[
                          {columnName:'masterid', displayName:'id', type:'id'},
                          {columnName:'description', displayName:'Name', type:'link'},
                          {columnName:'name', displayName:'System', type:'text'},
                          {columnName:'inspiredby', displayName:'Inspiration', type:'list'},
                          {columnName:'mechanisms', displayName:'Mechanisms', type:'list'},
                          {columnName:'outcomes', displayName:'Outcomes', type:'list'},
                          {columnName:'addedby', displayName:'Added By', type:'text'},
                          {columnName:'timestamp', displayName:'Date Modified', type:'date'},
                          {columnName:'status', displayName:'Status', type:'text'},
                          {columnName:'flag_text', displayName:'Text', type:'boolean'},
                          {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
                          {columnName:'flag_media', displayName:'Media', type:'boolean'}
                          ]}
                        thumb={['media', 'media_id', 'media_entity']}
                        initialSort={['timestamp', false]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = ProductConsole;
