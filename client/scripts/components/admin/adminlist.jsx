/**
* StrategyConsole Component
*/
'use strict';

var React = require('react'),

accountStore = require('../../stores/accounts'),

store = require('../../stores/admin/generic-list'),
actions = require('../../actions/generic-list'),

ConsoleLayout = require('./consolelayout.jsx'),
GriddleComponent = require('./griddle_component.jsx');

var getState = function() {
    return (
        {
            user: accountStore.get()
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
    render: function() {
        var entityList=this.props.component;
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
        //this.setState(getState());
    }
});

module.exports = AdminList;
