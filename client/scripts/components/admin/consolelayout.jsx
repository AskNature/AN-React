/**
*  Console Layout Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');

var CollectionConsole = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="container">
            <h2>{this.props.title}</h2>
            {this.props.children}
          </div>
        </div>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  }
});

module.exports = CollectionConsole;
