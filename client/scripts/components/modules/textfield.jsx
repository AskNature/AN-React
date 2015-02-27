var React = require('react');
var Scribe = require('./scribe.jsx');

TextField = React.createClass({
    render: function() {
        return (
	    <div style={this.props.editable? {}:{"border-bottom": "1px solid transparent"}}>{this.props.editable ? <Scribe initialValue={this.props.initialValue} store={this.props.store} actions={this.props.actions} fieldName={this.props.fieldName} /> : this.props.initialValue}</div>
	)
    }
});

module.exports = TextField;