'use strict';

var React = require('react');
var ReactSelect = require('react-select');
var Input = require('react-bootstrap').Input;

var Select = React.createClass({
	onChange: function(e) {
		this.props.onRelationshipSet(this.props.field, e.target.value);
		console.log(e.target.value);
	},
	render: function() {
		return (
			<Input block type="select" label={this.props.title} value={this.props.selected} onChange={this.onChange}>
				<option key="null" value={null}></option>
				{
						this.props.options.map(function(option) {
						return (
							<option key={option.masterid} value={option.masterid}>
							{option.label}
						</option>
						);
					})
				}
			</Input>
		);
	}

});

module.exports = Select;
