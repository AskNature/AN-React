/**
* StrategyConsole Component
*/
'use strict';

var React = require('react'),

strategySt = require('../../stores/admin/generic-list'),
strategyAc = require('../../actions/generic-list'),
accountStore = require('../../stores/accounts'),

ConsoleLayout = require('./consolelayout.jsx'),
GriddleComponent = require('./griddle_component.jsx');

var getState = function() {
    return (
    {
    user: accountStore.get()
    }
    );
};

var StrategyConsole = React.createClass({
    getInitialState: function() {
        return (
            getState()
        );
    },
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
                  {columnName:'is_deleted', displayName:'Archived', type:'boolean'},
                  {columnName:'flag_text', displayName:'Text', type:'boolean'},
                  {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
                  {columnName:'flag_media', displayName:'Media', type:'boolean'},
                  ]}
                thumb={['media', 'media_id', 'media_entity']}
                initialSort={['timestamp', false]}
                credentials={this.state.user.role === 'admin' ? true : false}
                 />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = StrategyConsole;
