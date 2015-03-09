/**
* ProductConsole Component
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
            <ConsoleLayout title='Biological Strategy Console'>
              <GriddleComponent store={strategySt} actions={strategyAc}
                columns={[
                  {columnName:'masterid', displayName:'id', type:'id'},
                  {columnName:'name', displayName:'Name', type:'link'},
                  {columnName:'description', displayName:'Description', type:'text'},
                  {columnName:'outcomes', displayName:'Outcomes', type:'list'},
                  {columnName:'living_system', displayName:'Living Systems', type:'list'},
                  {columnName:'timestamp', displayName:'Date Modified', type:'date'},
                  {columnName:'is_deleted', displayName:'Deleted', type:'boolean'}
                  ]}
                thumb={['media', 'media_id', 'media_entity']}
                initialSort={['timestamp', false]} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = StrategyConsole;
