/**
* StrategyConsole Component
*/
'use strict';

var React = require('react'),

accountStore = require('../../stores/accounts'),

store = require('../../stores/admin/generic-list'),
actions = require('../../actions/generic-list'),

ConsoleLayout = require('./consolelayout.jsx'),
GriddleComponent = require('./griddle_component.jsx'),

CollectionList = require('./collection'),
ContextList = require('./context'),
LivingSystemList = require('./livingsystem'),
MediaList = require('./media'),
PhenomenonList = require('./phenomenon'),
ProductList = require('./product'),
ResearcherList = require('./researcher'),
SourceList = require('./source'),
StrategyList = require('./strategy'),
UserList = require('./user');

// For now, this temp solution is permanently set to StrategyList:

var getState = function() {
    var path = window.location.pathname.split('/');
    var List;
    if(path[2] === 'strategies') {
      List = StrategyList;
    } else if(path[2] === 'products') {
        List = ProductList;
    } else if(path[2] === 'phenomena') {
        List = PhenomenonList;
    } else if(path[2] === 'users') {
        List = UserList;
    } else if(path[2] === 'collections') {
        List = CollectionList;
    } else if(path[2] === 'conditions') {
        List = ContextList;
    } else if(path[2] === 'living-systems') {
        List = LivingSystemList;
    } else if(path[2] === 'media') {
        List = MediaList;
    } else if(path[2] === 'researchers') {
        List = ResearcherList;
    } else if(path[2] === 'sources') {
        List = SourceList;
    }

    return (
    {
    user: accountStore.get(),
    entityList: List
    }
    );
};

var AdminList = React.createClass({
    mixins: [store.mixin],
    getInitialState: function() {
        return (
            getState()
        );
    },
    getList: function() {
        var List;
        if(this.props.type === 'strategies') {
            List = StrategyList;
        } else if(this.props.type === 'products') {
            List = ProductList;
        } else if(this.props.type === 'phenomena') {
            List = PhenomenonList;
        } else if(this.props.type === 'users') {
            List = UserList;
        } else if(this.props.type === 'collections') {
            List = CollectionList;
        } else if(this.props.type === 'conditions') {
            List = ContextList;
        } else if(this.props.type === 'living-systems') {
            List = LivingSystemList;
        } else if(this.props.type === 'media') {
            List = MediaList;
        } else if(this.props.type === 'researchers') {
            List = ResearcherList;
        } else if(this.props.type === 'sources') {
            List = SourceList;
        }
        return List;
},
    render: function() {
        var entityList=this.getList();
        return (
            /* jshint ignore:start */
            <ConsoleLayout plural={entityList.plural_name} singular={entityList.singular_name}>
              <GriddleComponent store={store} actions={actions}
                columns={entityList.columns}
                thumb={entityList.thumb}
                initialSort={entityList.initialSort}
                credentials={this.state.user.role === 'admin' ? true : false}
                 />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    },
    _onChange: function() {
    this.setState(getState());
}
});

module.exports = AdminList;
