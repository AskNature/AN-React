/**
* Adminlist Component
*/
'use strict';

var React = require('react'),

accountStore = require('../../stores/accounts'),

store = require('../../stores/admin/generic-list'),
actions = require('../../actions/generic-list'),

EntityList = require('./bstrategy.js'),

GriddleQueryComponent = require('./query_griddle_component.jsx');

var getState = function() {
    return (
        {

        }
    );
};

var SearchComponent = React.createClass({
    mixins: [store.mixin],
    getInitialState: function() {
        return (
            getState()
        );
    },
    render: function() {
        return (
            /* jshint ignore:start */
            <div>
              <GriddleQueryComponent store={store} actions={actions}
                columns={EntityList.columns}
                thumb={EntityList.thumb}
                initialSort={EntityList.initialSort}
                slug='b.strategy'
                 />
         </div>
            /* jshint ignore:end */
        );
    },

    _onChange: function() {
        //this.setState(getState());
    }
});

module.exports = SearchComponent;
