var React = require('react')
DefaultLayout = require('../layouts/default.jsx'),
InfiniteList = require('./infinitelist.jsx');

var ListItem = React.createClass({
    render: function() {
        return <div className="infinite-list-item" style={{height: "500px", "border-bottom": "1px solid #ddd", cursor: "pointer"}}
        onClick={this.props.extendListener(this.props.num)}>
            List Item {this.props.num}<br />
            <img src={"http://thecatapi.com/api/images/get?format=src&type=gif&x=" + this.props.num} />
        </div>;
    }
});

var BigListItem = React.createClass({
    componentDidMount: function() {
        this.props.heightUpdateListener(this.getDOMNode().offsetHeight); // flexible-height list item needs to implement this on mount
    },
    render: function() {
        return <div className="infinite-list-item" style={{height: "1000px", "border-bottom": "1px solid #ddd", cursor: "pointer", "font-size": "32px"}}
        onClick={this.props.contractListener(this.props.num)}>
            List Item extended {this.props.num}
        </div>;
    }
});

var Infinite = React.createClass({
    render: function() {
        return (
            <DefaultLayout>
                    <InfiniteList itemComponent={ListItem} extendedItemComponent={BigListItem} />
            </DefaultLayout>
        )
    }
});

module.exports = Infinite;