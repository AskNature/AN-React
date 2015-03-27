var React = require('react');
var Scribe = require('./scribe.jsx');

TextField = React.createClass({
    render: function() {
        return (
            <div style={this.props.editable? {}:{"borderBottom": "1px solid transparent"}}>
                {this.props.editable ?
                    <Scribe {...this.props} />
                : this.props.initialValue}
            </div>
        );
    }
});

module.exports = TextField;
