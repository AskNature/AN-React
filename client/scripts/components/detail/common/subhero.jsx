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

var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, ' ');
      str = str.replace(/\\/g, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();

var SubHero = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <Grid>
        <Row>
          <Col xs={12} sm={8}>
            <h5 className="lead">
              {this.props.first ? (<strong>{this.props.first} </strong>) : ''}
              {this.props.descriptionlink ? (<Link url={this.props.descriptionlink}>{this.props.description}</Link>) : (<span><TextField store={this.props.store} actions={this.props.actions} fieldName={"description"} initialValue={decodeEntities(unescape(this.props.description))} editable={this.props.editable} /></span>)}
              </h5>
          </Col>
          <Col xs={12} sm={4}>
            <ButtonToolbar style={{"margin-top": "11.5px"}}>
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
