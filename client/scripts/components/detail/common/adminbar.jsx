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
    var legacy_url = 'http://www.asknature.org/'+ this.props.routename +'/'+ this.props.masterid;
    return (
      /* jshint ignore:start */
      <Panel className="nomargin bgTexture">
        <ButtonToolbar>
          <Link url="../admin/strategies"><Button bsSize="small"><Glyphicon glyph="chevron-left" /> {this.props.entityname} Console</Button></Link>
          <Button bsSize="small" href={legacy_url} target="_blank" bsStyle="primary">View on legacy site</Button>
        </ButtonToolbar>
      </Panel>
      /* jshint ignore:end */
    );
  }
});

module.exports = AdminBar;
