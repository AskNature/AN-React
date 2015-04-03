var React = require('react')
DefaultLayout = require('../layouts/default.jsx'),
store = require('../../stores/generic-detail.js');
actions = require('../../actions/generic-detail.js');

var RelationshipList = require('./relationshiplist.jsx');

var getState = function() {
    return (
    {
	object: store.get()
    }
    );
};

var StrategyDetail = React.createClass({
    mixins: [store.mixin],
    getInitialState: function() {
        return ({
	    object: store.get(),
	    editable: false
	});
    },
    componentWillMount: function() {
	actions.fetch(this.props.masterid);
    },
    _onChange: function() {
    	this.setState(getState());
    },
    onRelationshipAdd: function(field, addedValue) {
        console.log(field + " added " + addedValue);
	actions.addRelationship(field, addedValue);
    },
    onRelationshipRemove: function(field, removedValue) {
    	console.log(field + " removed " + removedValue);
	actions.removeRelationship(field, removedValue);
    },
    toggleEditable: function() {
        this.setState({editable: !this.state.editable});
    },
    saveItem: function() {
    	actions.commit();
    },
    render: function() {
        return (
            <DefaultLayout>

            </DefaultLayout>
        )
    }
});

module.exports = StrategyDetail;
