var React = require('react');

var ListGroup = require('react-bootstrap').ListGroup;
var RelationshipListItem = require('./relationshiplistitem.jsx');
var RelationshipListItemInput = require('./relationshiplistiteminput.jsx');

var RelationshipList = React.createClass({
    onAdd: function(added) {
        console.log("list onAdd " + added.masterid);
	this.props.onAdd(added);
    },
    onRemove: function(removed) {
        console.log("list onRemove " + removed.masterid);
	this.props.onRemove(removed);
    },
    render: function() {
        return (
	    <div>
	        <h6><strong>{this.props.title}</strong></h6>
		<ListGroup>
		    {
		        this.props.items.map(function(item) {
	            	    return <RelationshipListItem item={item} routeName={this.props.routeName} key={item.masterid} onRemove={this.onRemove} editable={this.props.editable} />;
			}, this)
		    }
		    {
			this.props.editable ? <RelationshipListItemInput editable={this.props.editable} fieldName={this.props.fieldName} field={this.props.field} onAdd={this.onAdd} /> : ""
		    }
		</ListGroup>
	    </div>
	);
    }
});

module.exports = RelationshipList;
