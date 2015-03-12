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
Button = require('react-bootstrap').Button,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
Glyphicon = require('react-bootstrap').Glyphicon;

var SubHero = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <Grid>
        <Row>
          <Col xs={12} sm={8}>
            <h5 className="lead">
              {this.props.first ? (<strong>{this.props.first} </strong>) : ''}
              {this.props.descriptionlink ? (<Link url={this.props.descriptionlink}>{this.props.description}</Link>) : (<span><TextField store={this.props.store} actions={this.props.actions} fieldName={"description"} initialValue={this.props.description} editable={this.props.editable} /></span>)}
              </h5>
          </Col>
          <Col xs={12} sm={4}>
            <ButtonToolbar style={{"marginTop": "11.5px"}}>
	      {this.props.editable? <ButtonGroup><Button active={true} style={{"cursor": "default"}} disabled={true} bsStyle="primary"><Glyphicon glyph="pencil" /></Button><Button bsStyle="success" onClick={this.props.editFinish}><Glyphicon glyph="ok" /></Button><Button bsStyle="danger" onClick={this.props.editCancel}><Glyphicon glyph="remove" /></Button></ButtonGroup> : <Button onClick={this.props.editBegin}>
                <Glyphicon glyph="pencil" />
              </Button>}
              <Button>
                <Glyphicon glyph="share-alt" />
              </Button>
              <Button>
                <Glyphicon glyph="print" />
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Grid>
      /* jshint ignore:end */
    );
  }
});

module.exports = SubHero;
