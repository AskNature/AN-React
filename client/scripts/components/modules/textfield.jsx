'use strict';

var React = require('react'),

Scribe = require('./scribe.jsx');

var TextField = React.createClass({
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
