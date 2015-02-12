'use strict';

var React = require('react');

var getState = function() {
    return {
        // user: userStore.get()
    };
};

var NavbarComponent = React.createClass({
    // mixins: [userStore.mixin],
    getInitialState: function() {
        return getState();
    },
    render: function() {
        return (
            /* jshint ignore:start */
            <div className="navbar navbar-inverse navbar-fixed-top">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <button type="button" className="navbar-toggle sidebar-toggle" data-toggle="offcanvas" data-target=".navmenu-fixed-left">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">AskNature</a>
                </div>
                <div className="navbar-collapse collapse navbar-inverse-collapse">

                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Your Account <b className="caret"></b></a>
                      <ul className="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li className="divider"></li>
                        <li><a href="#">Separated link</a></li>
                      </ul>
                    </li>
                  </ul>
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

module.exports =NavbarComponent;
