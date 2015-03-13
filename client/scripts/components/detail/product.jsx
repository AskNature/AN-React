var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var ProductDetail = require('./productDetail.jsx');

var Product = React.createClass({
    render: function() {
        var masterid = window.location.pathname.split('/')[2];
        return (
               <DefaultLayout>
                   <ProductDetail masterid={masterid != 'new' ? masterid : null} />
               </DefaultLayout>
        );
    }
});

module.exports = Product;
