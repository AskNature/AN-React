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
    if(item){
      return (
        <div>
          <h6>
            <strong>
              {title}
            </strong>
          </h6>
          {this.props.editable?
            <span>
              <p>
                <TextField
                  store={this.props.store}
                  actions={this.props.actions}
                  enableBlockMode={false}
                  fieldName={this.props.fieldName}
                  initialValue={this.props.item}
                  editable={this.props.editable} />
              </p>
            </span>
            :
            <p>
              <span dangerouslySetInnerHTML={{__html: item}} />
            </p>
          }
        </div>
      );
    } else {
      return <div />;
    }
  }
});

module.exports = TextArea;
