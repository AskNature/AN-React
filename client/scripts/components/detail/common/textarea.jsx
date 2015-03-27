/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react');
var TextField = require('../../modules/textfield.jsx');

var TextArea = React.createClass({
  render: function() {
    var item = this.props.item;
    var title = this.props.title;
      return (
        <div>
          {this.props.title ? (<h6>
            <strong>
              {title}
            </strong>
          </h6>) : ''}
          {this.props.editable?
                <TextField
                  store={this.props.store}
                  actions={this.props.actions}
                  enableBlockMode={false}
                  fieldName={this.props.fieldName}
                  initialValue={this.props.item}
                  editable={this.props.editable}
                  prompt={this.props.prompt} />
            :
            <p>
              <span dangerouslySetInnerHTML={{__html: item}} />
            </p>
          }
        </div>
      );
  }
});

module.exports = TextArea;
