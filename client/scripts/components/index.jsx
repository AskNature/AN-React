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
                    <h2>Welcome to the AskNature 2 Incubator!</h2>
                    <p>Be warned, this site is in a <strong>very early stage of development</strong>. We welcome you to check it out, but be warned that everything is still very rough and many things won't work.</p>
                    <p>Cheers, The AskNature Team</p>
                    <p><a href="http://www.biomimicry.org" target="_blank">The Biomimicry Institute</a></p>
                    <p><a className="btn btn-primary btn-lg" href="http://www.asknature.org" role="button">Go to AskNature.org</a></p>
                  </div>
                </div>
                </div>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = IndexComponent;
