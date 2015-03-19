'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var PhenomenonDetail = require('./phenomenonDetail.jsx');

var Phenomenon = React.createClass({
    render: function() {
        var masterid = window.location.pathname.split('/')[2];
        return (
               <DefaultLayout>
                   <PhenomenonDetail masterid={masterid !== 'new' ? masterid : null} />
               </DefaultLayout>
        );
    }
});

module.exports = Phenomenon;
