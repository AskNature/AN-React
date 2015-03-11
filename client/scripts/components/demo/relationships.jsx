var React = require('react')
DefaultLayout = require('../layouts/default.jsx'),
strategyDetailStore = require('../../stores/detail/strategies.js');

var RelationshipList = require('./relationshiplist.jsx');

var elements = [{name: "One", masterid:"one"}, {name: "Two", masterid:"two"}];

var Relationships = React.createClass({
    getInitialState: function() {
        return ({ editable: true });
    },
    onRelationshipAdd: function(field, addedValue) {
        console.log(field + " added " + addedValue);
	//this.setState(newValue);
    },
    onRelationshipRemove: function(field, removedValue) {
    	console.log(field + " removed " + removedValue);
    },
    render: function() {
        return (
            <DefaultLayout>
                    <Grid><Row><Col xs={12} sm={6}>
		    <RelationshipList items={elements} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, "products")} onRemove={this.onRelationshipRemove.bind(null, "products")} field={"products"} title={"Inspired Solutions"} fieldName={"Inspired Solution"}/>
		    </Col></Row></Grid>
            </DefaultLayout>
        )
    }
});

module.exports = Relationships;