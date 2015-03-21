'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var SourceDetail = require('./sourceDetail.jsx');

var Source = React.createClass({
    render: function() {
        return (
	       <DefaultLayout>
		   <SourceDetail masterid={this.props.masterid !== 'new' ? this.props.masterid : null} type={this.props.type} />
	       </DefaultLayout>
        );
    }
});

module.exports = Source;
