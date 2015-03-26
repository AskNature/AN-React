'use strict';

var React = require('react');
var ReactSelect = require('react-select');

var Select = React.createClass({
    onChange: function(newValue) {
        this.props.onRelationshipChange(this.props.fieldName, [newValue]);
    },
    render: function() {
        <ReactSelect value={this.props.value} options={this.props.options} onChange={this.onChange} />
    }
});

module.exports = Select;