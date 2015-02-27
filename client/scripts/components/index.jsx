/**
* Index Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');


var IndexComponent = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                  <div className="container">
                    <div className="jumbotron">
                    <h1>Welcome to the AskNature Incubator!</h1>
                    <p>Be warned, this is in a very early stage of development. Feel free to poke around, but please understand that everything is still rough and many things won't work.</p>
                    <p><a className="btn btn-primary btn-lg" href="http://www.asknature.org" role="button">Go to the stable version of AskNature.org</a></p>
                  </div>
                </div>
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = IndexComponent;
