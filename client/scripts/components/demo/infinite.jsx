var React = require('react')
DefaultLayout = require('../layouts/default.jsx'),
InfiniteList = require('./infinitelist.jsx');
var Scribe = require('../modules/scribe.jsx');
var strategyDetailStore = require('../../stores/detail/strategies.js');

var ListItem = React.createClass({
    render: function() {
        return <div className="infinite-list-item" style={{height: "500px", "borderBottom": "1px solid #ddd", cursor: "pointer"}}
        onClick={this.props.extendListener(this.props.num)}>
            <a onClick={this.props.extendListener(this.props.num)}>List Item {this.props.num}</a><br />
            <img src={"http://thecatapi.com/api/images/get?format=src&type=gif&x=" + this.props.num} />
        </div>;
    }
});

var BigListItem = React.createClass({
    getInitialState: function() {
        return {enabled: false};
    },
    componentDidMount: function() {
        this.props.heightUpdateListener(this.getDOMNode().offsetHeight); // flexible-height list item needs to implement this on mount
    },
    toggleEnabled: function() {
        this.setState({enabled: !this.state.enabled});
    },
    render: function() {
        return <div className="infinite-list-item" style={{height: "1000px", "borderBottom": "1px solid #ddd", "font-size": "32px"}}>
	    <span style={{"font-size" : "16px", "cursor": "pointer"}}><a onClick={this.props.contractListener(this.props.num)}>Contract</a><br /><a onClick={this.toggleEnabled}>{this.state.enabled ? 'Disable' : 'Enable'}</a></span><br />
	    {this.state.enabled ? <Scribe store={strategyDetailStore} fieldName={"name"}/> : <div>List Item extended {this.props.num}</div>}
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
