'use strict';

var React = require('react'),

ListGroup = require('react-bootstrap').ListGroup,
RelationshipListItem = require('./relationshiplistitem.jsx'),
RelationshipListItemInput = require('./relationshiplistiteminput.jsx');

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
    console.log('Rendering list for '+this.props.title);
    return (
      <div>
        <h6>
          <strong>
            {this.props.title}
          </strong>
        </h6>

          {this.props.items.map(function(item,i) {
            return <RelationshipListItem
              item={item}
              routeName={this.props.routeName}
              key={i}
              onRemove={this.onRemove}
              editable={this.props.editable}
              titleField={item[this.props.titleField]}
              subtitleField={item[this.props.subtitleField]} />;
            }, this)
          }
            <RelationshipListItemInput
              editable={this.props.editable}
              fieldName={this.props.fieldName}
              field={this.props.field}
              onAdd={this.onAdd} />

      </div>
    );
  }
});

module.exports = RelationshipList;
