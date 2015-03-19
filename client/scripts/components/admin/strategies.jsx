/**
* StrategyConsole Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var strategySt = require('../../stores/admin/strategies');
var strategyAc = require('../../actions/strategies');
var GriddleComponent = require('./griddle_component.jsx');

var StrategyConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural='Biological Strategies' singular='Biological Strategy'>
              <GriddleComponent store={strategySt} actions={strategyAc}
                columns={[
                  {columnName:'masterid', displayName:'id', type:'hidden'},
                  {columnName:'name', displayName:'Name', type:'link'},
                  {columnName:'description', displayName:'Description', type:'longtext'},
                  {columnName:'mechanisms', displayName:'Mechanisms', type:'list'},
                  {columnName:'outcomes', displayName:'Outcomes', type:'list'},
                  {columnName:'addedby', displayName:'Added By', type:'text'},
                  {columnName:'timestamp', displayName:'Date Modified', type:'date'},
                  {columnName:'status', displayName:'Status', type:'text'},
                  {columnName:'is_deleted', displayName:'Deleted', type:'boolean'},
                  {columnName:'flag_text', displayName:'Text', type:'boolean'},
                  {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
                  {columnName:'flag_media', displayName:'Media', type:'boolean'},
                  ]}
                thumb={['media', 'media_id', 'media_entity']}
                initialSort={['timestamp', false]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = StrategyConsole;
