var React = require('react');
var Scribe = require('./scribe.jsx');

TextField = React.createClass({
    render: function() {
        return (
            <div style={this.props.editable? {}:{"borderBottom": "1px solid transparent"}}>
                {this.props.editable ?
                    <Scribe
                        initialValue={this.props.initialValue}
                        store={this.props.store}
                        actions={this.props.actions}
                        enableBlockMode={this.props.enableBlockMode}
                        fieldName={this.props.fieldName}
                        prompt={this.props.prompt} />
                : this.props.initialValue}
            </div>
        );
    }
});

module.exports = TextField;
