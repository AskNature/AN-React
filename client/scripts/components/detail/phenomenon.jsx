'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var FMDetail = require('./FMDetail.jsx');

var FM = React.createClass({
    render: function() {
        var masterid = window.location.pathname.split('/')[2];
        return (
               <DefaultLayout>
                   <FMDetail masterid={masterid !== 'new' ? masterid : null} />
               </DefaultLayout>
        );
    }
});

module.exports = FM;
