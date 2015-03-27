'use strict';
var React = require('react');
var Scribe = require('scribe-editor');

var ScribeTextField = React.createClass({
  getInitialState: function() {
    var initialStruct = this.props.store.get();
    var initialValue;
    if(this.props.initialValue) {
      initialValue = this.props.initialValue;
    } else {
      initialValue = 'Enter a '+this.props.fieldName;
    }
    return {
      html: initialValue,
      gotUpdate: true
    };
  },
    componentDidMount: function() {
        var that = this;
        var scribeElement = this.refs.scribe.getDOMNode();
	var scribe = new Scribe(scribeElement, { allowBlockElements: (this.props.enableBlockMode ? true : false) });
        this.setState({scribe: scribe}, function() {
            scribe.on('content-changed', updateData);
            function updateData() {
                if(!that.state.gotUpdate) {
		    var html = scribe.getHTML();
                    var index = html.lastIndexOf("<br");
		    var htmlClean = html.substring(0, (((html.length - index) <= 5 && index != -1) ? index : html.length));
                    that.setState({html: htmlClean});
		    var updatedStuff = {};
		    updatedStuff[that.props.fieldName] = htmlClean;
		    that.props.actions.update(updatedStuff);
		} else {
		    that.setState({gotUpdate: false});
		}
            }
            scribe.setContent(this.state.html);
	});
    },
    componentWillReceiveProps: function(newProps) {
	if(this.state.html != newProps.initialValue) {
	    this.setState({gotUpdate: true}, function() {
		this.state.scribe.setContent(newProps.initialValue);
	    });
	}
    },
    render: function() {
        return (
	    <div>
	        {this.state.html == "" ? <div style={{position: 'absolute', color: '#999'}}>{this.props.placeholder}</div> : ""}
	        <div class="dotted" contentEditable="true" ref="scribe" style={{"outline" : "none", "border-bottom": "1px solid #ddd"}}/>
	    </div>
	)
    }
});

module.exports = ScribeTextField;
