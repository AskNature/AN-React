/**
* StrategyConsole Component
*/
'use strict';

var React = require('react'),

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

var lists = [
    {
        'list_name' : 'strategy',
        'plural_name' : 'Biological Strategies',
        'singular_name' : 'Biological Strategy',
        'store' : require('../../stores/admin/strategies'),
        'actions' : require('../../actions/strategies'),
        'columns' : [
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
            {columnName:'flag_media', displayName:'Media', type:'boolean'}
        ],
        'initialSort' : [
            'timestamp',
            false
        ],
        'thumb' : [
            'media',
            'media_id',
            'media_entity'
        ]
    }
];

var StrategyConsole = React.createClass({
    getInitialState: function() {
        return (
            getState()
        );
    },
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural={lists[0].plural_name} singular={lists[0].singular_name}>
              <GriddleComponent store={lists[0].store} actions={lists[0].actions}
                columns={lists[0].columns}
                thumb={lists[0].thumb}
                initialSort={lists[0].initialSort}
                credentials={this.state.user.role === 'admin' ? true : false}
                 />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = {strategy_list:StrategyConsole};
