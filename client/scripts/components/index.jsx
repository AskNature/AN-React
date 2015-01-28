/**
* Index Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');

// For now, this page just displays the OutcomeFilter module */
var OutcomeFilter = require('./modules/outcomefilter.jsx');

var IndexComponent = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <DefaultLayout>
                <div className="main-container">
                    <div className="yeogurt-info">
                        <h1>Welcome to AskNature!</h1>
                        <h2>Check out these mega-awesome functions:</h2>
                        <OutcomeFilter name="Outcomes!!" />
                        <p>
                            Take a look at the <a href="https://github.com/larsonjj/generator-yeogurt#yeogurt-generator">documentation</a> and start mixing up something awesome.
                        </p>
                        <p className="links">
                            <a href="/docs/styleguide/index.html">Styleguide</a>
                            <a href="/docs/api/index.html">API</a>
                        </p>
                    </div>
                </div>
                <code className="version">v0.13.7</code>
            </DefaultLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = IndexComponent;
