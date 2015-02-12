/**
* Index Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var UserSpan = require('./modules/userspan.jsx');

var IndexComponent = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                  <div className="jumbotron">
                    <h1>Welcome to AskNature!</h1>
                    <p>Where dreams come true.</p>
		    <UserSpan />
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
                  </div>
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = IndexComponent;
