'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var SourceDetail = require('./sourceDetail.jsx');

var Source = React.createClass({
    render: function() {
        var masterid = window.location.pathname.split('/')[2];
        return (
	       <DefaultLayout>
		   <SourceDetail masterid={masterid !== 'new' ? masterid : null} />
	       </DefaultLayout>
        );
    }
});

module.exports = Source;
