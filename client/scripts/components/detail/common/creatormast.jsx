/**
* Detail Admin Bar (component)
*/
'use strict';

var React = require('react'),

Link = require('../../modules/link.jsx'),

Panel = require('react-bootstrap').Panel,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
Button = require('react-bootstrap').Button,
Glyphicon = require('react-bootstrap').Glyphicon;

var CreatorMast = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <Panel className="nomargin">
        <img src={this.props.img} alt="Thumb" width="40px" height="40px" className="img-circle" />
        <span> <Link url="#"><strong>AskNature Team</strong></Link> contributed this <strong>{entityName}</strong> / 2 hours ago</span>
      </Panel>
      /* jshint ignore:end */
    );
  }
});

module.exports = CreatorMast;
