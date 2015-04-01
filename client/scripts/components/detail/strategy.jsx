'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var StrategyDetail = require('./strategyDetail.jsx');

var Strategy = React.createClass({
    render: function() {
        return (
	       <DefaultLayout>
		   <StrategyDetail masterid={this.props.masterid !== 'new' ? this.props.masterid : null} type={this.props.type} />
	       </DefaultLayout>
        );
    }
});

module.exports = Strategy;
