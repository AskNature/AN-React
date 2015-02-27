/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react');

var TextArea = React.createClass({
  render: function() {
    var item = this.props.item;
    var title = this.props.title;
    if(item){
      return (
        <div>
          <h6><strong>{title}</strong></h6>
          <p dangerouslySetInnerHTML={{__html: item}} />
        </div>
      );
    } else {
      return <div />;
    }
  }
});

module.exports = TextArea;
