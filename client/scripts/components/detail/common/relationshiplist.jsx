'use strict';

var React = require('react'),

ListGroup = require('react-bootstrap').ListGroup,
RelationshipListItem = require('./relationshiplistitem.jsx'),
RelationshipListItemInput = require('./relationshiplistiteminput.jsx'),

ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var RelationshipList = React.createClass({
  onAdd: function(added) {
    console.log('list onAdd ' + added.masterid);
    this.props.onAdd(added);
  },
  onRemove: function(removed, e) {
    console.log('list onRemove ' + removed.masterid);
    e.preventDefault();
    this.props.onRemove(removed);
  },
  render: function() {
    return (
      <div>
        <h6>
          <strong>
            {this.props.title}
          </strong>
        </h6>
        <ButtonToolbar>
          {this.props.items.map(function(item) {
            return <RelationshipListItem
              item={item}
              routeName={this.props.routeName}
              key={item.masterid}
              onRemove={this.onRemove}
              editable={this.props.editable} />;
            }, this)
          }
          {this.props.editable ?
            <RelationshipListItemInput
              editable={this.props.editable}
              fieldName={this.props.fieldName}
              field={this.props.field}
              onAdd={this.onAdd} />
            : ''
          }
        </ButtonToolbar>
      </div>
    );
  }
});

module.exports = RelationshipList;
