var React = require('react');
var Scribe = require('scribe-editor');

ScribeTextField = React.createClass({
    componentDidMount: function() {
        var scribeElement = this.refs.scribe.getDOMNode();
	var scribe = new Scribe(scribeElement);
	scribe.on('content-changed', updateData);
	function updateData() {
	    var html = scribe.getHTML();
	    console.log(scribe.getHTML());
	}
    },
    render: function() {
        return (
	    <div>
	        <div contentEditable="true" ref="scribe" />
	    </div>
	)
    }
});

module.exports = ScribeTextField;