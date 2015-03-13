'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var StrategyDetail = require('./strategyDetail.jsx');

var Strategy = React.createClass({
    render: function() {
        var masterid = window.location.pathname.split('/')[2];
        return (
	       <DefaultLayout>
		   <StrategyDetail masterid={masterid != 'new' ? masterid : null} />
	       </DefaultLayout>
        );
    }
});

module.exports = Strategy;