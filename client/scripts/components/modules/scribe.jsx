'use strict';
var React = require('react');
var Scribe = require('scribe-editor');

var ScribeTextField = React.createClass({
  getInitialState: function() {
    var initialStruct = this.props.store.get();
    var initialValue, placeholder;
    if(this.props.initialValue) {
      initialValue = this.props.initialValue;
    } else {
      initialValue = 'Enter a '+this.props.fieldName;
    }
    return {
      html: initialValue,
      placeholder: placeholder,
      gotUpdate: true
    };
  },
  componentWillMount: function() {
    this.props.store.addChangeListener(this._onChange);
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
                    console.log('ScribeHTML: '+html);
                    that.setState({html: html});
		                var updatedStuff = {};
		                updatedStuff[that.props.fieldName] = html.substring(0, html.length-4);
		                that.props.actions.update(updatedStuff);
                } else {
            		    that.setState({gotUpdate: false});
            		}
            }
            scribe.setContent(this.state.html);
        });
    },
    componentWillUnmount: function() {
        this.props.store.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var newData = this.props.store.get();
	this.setState({gotUpdate: true}, function() {
	    this.state.scribe.setContent(newData[this.props.fieldName]);
	});
    },
    render: function() {
        return (
	    <div>
	        <div
            className="dotted textarea_editable"
            contentEditable={true}
            data-ph={this.state.placeholder ? this.state.placeholder : 'Huh'}
            ref="scribe" />
	    </div>
	);
    }
});

module.exports = ScribeTextField;
