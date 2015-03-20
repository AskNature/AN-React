/**
* StrategyConsole Component
*/
'use strict';

var React = require('react'),

accountStore = require('../../stores/accounts'),

ConsoleLayout = require('./consolelayout.jsx'),
GriddleComponent = require('./griddle_component.jsx'),

CollectionList = require('./collection'),
ContextList = require('./context'),
LivingSystemList = require('./livingsystem'),
DesignedSystemList = require('./designedsystem'),
MediaList = require('./media'),
PhenomenonList = require('./phenomenon'),
ProductList = require('./product'),
ResearcherList = require('./researcher'),
SourceList = require('./source'),
StrategyList = require('./strategy'),
UserList = require('./user');

var getState = function() {
    return (
    {
    user: accountStore.get(),
    entityList: StrategyList
    }
    );
};

var AdminList = React.createClass({
    getInitialState: function() {
        return (
            getState()
        );
    },
    render: function() {
        var entityList=this.state.entityList;
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural={entityList.plural_name} singular={entityList.singular_name}>
              <GriddleComponent store={entityList.store} actions={entityList.actions}
                columns={entityList.columns}
                thumb={entityList.thumb}
                initialSort={entityList.initialSort}
                credentials={this.state.user.role === 'admin' ? true : false}
                 />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = AdminList;
