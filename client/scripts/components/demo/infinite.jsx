var React = require('react')
DefaultLayout = require('../layouts/default.jsx'),
InfiniteList = require('./infinitelist.jsx');

var Infinite = React.createClass({
    render: function() {
        return (
            <DefaultLayout>
                    <InfiniteList />
            </DefaultLayout>
        )
    }
});

module.exports = Infinite;