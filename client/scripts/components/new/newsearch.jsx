'use strict';

var React = require('react');
var Layout = require('../layouts/new.jsx');

var SearchLayout = React.createClass({
    render: function() {
        return (
	    <div>
		<b>SearchLayout</b><br />
	    	query: "{this.props.query}",<br />
	    	type: "{this.props.type}",<br />
	    	id: "{this.props.masterid}"
		<Layout {...this.props} />
	    </div>
        );
    }
});

module.exports = SearchLayout;
