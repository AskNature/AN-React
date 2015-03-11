var React = require('react')
DefaultLayout = require('../layouts/default.jsx'),
store = require('../../stores/strategy.js');
actions = require('../../actions/strategy.js');

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
	actions.fetch("d1cb32be3c76489375e383e6ed53a736");
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
	            <a href="#" onClick={this.toggleEditable}>Toggle editable</a><br />
		    <a href="#" onClick={this.saveItem}>Save</a>
                    <Grid><Row><Col xs={12} sm={6}>
		    <RelationshipList items={this.state.object.products} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, "products")} onRemove={this.onRelationshipRemove.bind(null, "products")} field={"products"} routeName={"product"} title={"Inspired Solutions"} fieldName={"Inspired Solution"}/>
		    </Col></Row></Grid>
            </DefaultLayout>
        )
    }
});

module.exports = StrategyDetail;