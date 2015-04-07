var React = require('react')
DefaultLayout = require('../layouts/default.jsx'),
InfiniteList = require('./infinitelist.jsx');
var Scribe = require('../modules/scribe.jsx');
var strategyDetailStore = require('../../stores/generic-detail.js');
var strategyDetailActions = require('../../actions/generic-detail.js');

var TopSection = require('../detail/common/topsection.jsx');

var ListItem = React.createClass({
    render: function() {
        return <div className="infinite-list-item" style={{height: "500px", "borderBottom": "1px solid #ddd", cursor: "pointer"}}>
            <TopSection primarytitle={this.props.data.name} user={{}} data={this.props.data} />
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
    mixins: [strategyDetailStore.mixin],
    getInitialState: function() {
        return { elements: [<ListItem num={0} key={0} data={{name: "first element", media:[]}}  extendListener={this.extendListener} />, <ListItem num={1} key={1} data={{name: "second element", media:[]}} extendListener={this.extendListener} />] }
    },
    componentWillMount: function() {
        strategyDetailActions.fetch('b.strategy', this.props.masterid);//'740c420618b1b9abb92630cdaff6e0dd');
    },
    _onChange: function() {
        var newElements = this.state.elements;
	newElements[0] = <ListItem num={0} key={0} data={strategyDetailStore.get()} />;
        this.setState({elements: newElements})
    },
    render: function() {
        return (
            <DefaultLayout>
                    <InfiniteList itemComponent={ListItem} extendedItemComponent={BigListItem} elements={this.state.elements} />
            </DefaultLayout>
        )
    }
});

module.exports = Infinite;
