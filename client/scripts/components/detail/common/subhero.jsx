/**
* Detail Hero (component)
*/
'use strict';

var React = require('react'),

Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
Glyphicon = require('react-bootstrap').Glyphicon;

var SubHero = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <Grid>
        <Row>
          <Col xs={12} sm={8}>
            <h5 className="lead">{this.props.description}</h5>
          </Col>
          <Col xs={12} sm={4}>
            <Nav bsStyle="pills">
              <NavItem>
                <Glyphicon glyph="pencil" />
              </NavItem>
              <NavItem>
                <Glyphicon glyph="share-alt" />
              </NavItem>
              <NavItem>
                <Glyphicon glyph="print" />
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Grid>
      /* jshint ignore:end */
    );
  }
});

module.exports = SubHero;
