'use strict';

var pageStore = require('../../stores/page');
var userStore = require('../../stores/accounts');
var userActions = require('../../actions/users');
var Navbar = require('../modules/navbar.jsx');
var Sidebar = require('../modules/sidebar.jsx');

var getState = function() {
    return {
        title: pageStore.get().title,
	user: userStore.get()
    };
};

var DefaultComponent = React.createClass({
    mixins: [pageStore.mixin, userStore.mixin],
    componentWillMount: function() {
    	userActions.fetchUser();
    },
    componentDidMount: function() {
        pageStore.emitChange();
    },
    getInitialState: function() {
        return getState();
    },
    render: function() {
        return (
            /* jshint ignore:start */
            <div>
            <Sidebar />
            <Navbar user={this.state.user} />
                <div className="default">
                    <div className="main-container">
                        <div className="content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
            /* jshint ignore:end */
        );
    },
    // Event handler for 'change' events coming from store mixins.
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = DefaultComponent;
