'use strict';

var React = require('react'),
DefaultLayout = require('../layouts/default.jsx'),
InfiniteList = require('./infinitelist.jsx'),
InfiniteCard = require('./temp-infinitecard.jsx');
var Scribe = require('../modules/scribe.jsx');

var Well = require('react-bootstrap').Well;
//var strategyDetailStore = require('../../stores/generic-detail.js');
//var strategyDetailActions = require('../../actions/generic-detail.js');
var store = require('../../stores/admin/generic-list.js');
var actions = require('../../actions/generic-collection.js');

var TopSection = require('../detail/common/topsection.jsx');
var StrategyDetail = require('../detail/detail-bstrategy.jsx');

var _ = require('lodash');

var ListCard = React.createClass({
    render: function() {
        return (
        <div>
            <Well bsSize='small' className='card'>
                <h6 className='card-label'>
                    Biological Strategy
                </h6>
                <h5 className='card-name'>
                    {this.props.data.name}
                    <br/>
                <small>

                </small>
                </h5>
            </Well>
        </div>
    );
    }
});

var ListItem = React.createClass({
    render: function() {
        return <div className="infinite-list-item" style={{height: "2500px", "borderBottom": "1px solid #ddd", cursor: "pointer"}}>
            <StrategyDetail type="b.strategy" masterid={this.props.data.masterid} loaded={true} editable={false} user={{}} data={this.props.data}
	            editBegin={function() {}}
                    toggleEditable={function() {}}
                    editFinish={function() {}}
                    editCancel={function() {}}
                    onDelete={function() {}}
                    onRelationshipAdd={function() {}}
                    onRelationshipRemove={function() {}}
                    onRelationshipSet={function() {}} />
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
	    {this.state.enabled ? <Scribe store={store} fieldName={"name"}/> : <div>List Item extended {this.props.num}</div>}
        </div>;
    }
});

var SimpleComponent = React.createClass({
    render: function() {
        return <span>"Hello!"</span>;
    }
});

var Infinite = React.createClass({
    mixins: [store.mixin],
    getInitialState: function() {
        return { elements: [],
            cards: [] };

    },
    componentWillMount: function() {
        // actions.getList('b.strategy',this.props.masterid);
        //'740c420618b1b9abb92630cdaff6e0dd');
	 actions.getListPaginated('b.strategy', 0, 20, null, null, null);
    },
    _onChange: function() {
        //var newElements = this.state.elements;
    var newElements = _.map(store.get(), function(r) {
	    return <ListItem key={r.masterid} data={r} />;
	});
    // This needs to be done in concert with the previous map loop
    var newCards = _.map(store.get(), function(r) {
	    return <ListCard key={r.masterid} data={r} />;
	});


	//newElements[0] = <ListItem num={0} key={0} data={store.get()} />;
        this.setState({
            elements: newElements,
            cards: newCards
        });

    },
    render: function() {
        return (
            <DefaultLayout searchResultComponent={InfiniteCard} searchResultElements={this.state.cards}>
                    <InfiniteList itemComponent={ListItem} extendedItemComponent={BigListItem} elements={this.state.elements} />
            </DefaultLayout>
        );
    }
});

module.exports = Infinite;
