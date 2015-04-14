'use strict';

var React = require('react'),

ListGroup = require('react-bootstrap').ListGroup,
RelationshipListItem = require('./relationshiplistitem.jsx'),
RelationshipListItemInput = require('./relationshiplistiteminput.jsx'),

Label = require('react-bootstrap').Label;

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
          &nbsp;
          <Label>
            {this.props.items ? this.props.items.length : ''}
          </Label>
        </h6>

          {this.props.items ? this.props.items.map(function(item,i) {
            return <RelationshipListItem
              item={item}
              routeName={this.props.routeName}
              key={i}
              onRemove={this.onRemove}
              editable={this.props.editable}
              titleField={item[this.props.titleField]}
              subtitleField={item[this.props.subtitleField]}
              media={this.props.media} />;
            }, this) : ''
          }
            <RelationshipListItemInput
              editable={this.props.editable}
              fieldName={this.props.fieldName}
              field={this.props.field}
              onAdd={this.onAdd}
              media={this.props.media} />

      </div>
    );
  }
});

module.exports = RelationshipList;
