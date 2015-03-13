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

var AdminBar = React.createClass({
  render: function() {
    var console_url = '../admin/' + this.props.pluralroute;
    var legacy_url = 'http://www.asknature.org/'+ this.props.routename +'/'+ this.props.masterid;
    return (
      /* jshint ignore:start */
      <Panel className="nomargin bgTexture">
        <ButtonToolbar>
          <Link url={console_url}><Button bsSize="small"><Glyphicon glyph="chevron-left" /> {this.props.entityname} Console</Button></Link>
          <Button bsSize="small" href={legacy_url} target="_blank" bsStyle="primary">View on legacy site</Button>
          <span style={{marginLeft:'15px',color:'#ccc'}}><strong>ID: </strong>{this.props.masterid}</span>
        </ButtonToolbar>
      </Panel>
      /* jshint ignore:end */
    );
  }
});

module.exports = AdminBar;
