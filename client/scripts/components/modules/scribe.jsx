var React = require('react');
var Scribe = require('scribe-editor');

ScribeTextField = React.createClass({
    getInitialState: function() {
        var initialStruct = this.props.store.get();
        return {
	    html: this.props.initialValue,
	    gotUpdate: true
        }
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
	        <div class="dotted" contentEditable="true" ref="scribe" style={{"outline" : "none", "border-bottom": "1px dashed #999"}}/>
	    </div>
	)
    }
});

module.exports = ScribeTextField;