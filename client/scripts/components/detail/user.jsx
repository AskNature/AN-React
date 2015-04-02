'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var UserDetail = require('./userDetail.jsx');

var User = React.createClass({
    render: function() {
        var masterid = window.location.pathname.split('/')[2];
        return (
	       <DefaultLayout>
		   <UserDetail masterid={masterid !== 'new' ? masterid : null} />
	       </DefaultLayout>
        );
    }
});

module.exports = User;
