/**
* Detail Hero (component)
*/
'use strict';

var React = require('react'),

TextArea = require('./textarea.jsx'),
TextField = require('../../modules/textfield.jsx'),

Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
TabbedArea = require('react-bootstrap').TabbedArea,
TabPane = require('react-bootstrap').TabPane,

Button = require('react-bootstrap').Button,
Input = require('react-bootstrap').Input,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
Glyphicon = require('react-bootstrap').Glyphicon,
Tooltip = require('react-bootstrap').Tooltip,
OverlayTrigger = require('react-bootstrap').OverlayTrigger,

Link = require('../../modules/link.jsx'),

Select = require('../../modules/select.jsx');

var SubHero = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <Grid>
        <Row>
          <Col xs={12} sm={8}>
            <h5 className="lead">
              {this.props.first ? (<strong>{this.props.first} </strong>) : ''}
              {this.props.descriptionlink ? (<Link url={this.props.descriptionlink}>{this.props.description}</Link>) : (<span><TextField store={this.props.store} actions={this.props.actions} fieldName={"summary"} initialValue={this.props.description} editable={this.props.editable} placeholder="Add a summary here" /></span>)}
              </h5>
          </Col>
          <Col xs={12} sm={4}>
            <Nav justified activeKey={0} bsStyle='pills' style={{"margin-top": "11.5px"}}>
              <NavItem
                eventKey={1}
                onClick={this.props.toggleEditable}
                disabled={
                  this.props.credentials === false ? true : false
                } >
                <Glyphicon glyph="pencil" />
              </NavItem>
              <NavItem eventKey={3}>
                <Glyphicon glyph="share-alt" />
              </NavItem>
              <NavItem eventKey={4}>
                <Glyphicon glyph="print" />
              </NavItem>
              <NavItem eventKey={5}>
                <Glyphicon glyph="bookmark" />
              </NavItem>

            </Nav>
                {this.props.editable ?
                    <div>
                    <ButtonGroup>
                      <Button block bsStyle='link' disabled={true} style={{"cursor": "default"}}>
                        Edit Mode Active
                      </Button>
                      <Button block bsStyle="success" onClick={this.props.editFinish}>
                        <Glyphicon glyph="ok" /> <strong>Update</strong>
                      </Button>
                      <Button block bsStyle="warning" onClick={this.props.editCancel}>
                        <Glyphicon glyph="remove" /> Cancel
                      </Button>
                      <Button block bsStyle="danger" onClick={this.props.onDelete}>
                        <Glyphicon glyph="trash" /> Delete
                      </Button>
                    </ButtonGroup>
                    <Select selected={this.props.status.masterid} options={this.props.status.options} field="status" title="Status" onRelationshipSet={this.props.onRelationshipSet} />

                    <Input type='checkbox' label='Text' checked={this.props.flagText} />
                      <Input pullLeft type='checkbox' label='Tags' checked={this.props.flagTags} />
                        <Input type='checkbox' label='Media' checked={this.props.flagMedia} />
                    <TextArea
                      title='Editor Comments'
                      item={this.props.editorComments}
                      store={this.props.store}
                      actions={this.props.actions}
                      fieldName={'editor_comments'}
                      editable={this.props.editable} />
                  </div>
                : '' }
              </Col>
            </Row>
          </Grid>
      /* jshint ignore:end */
    );
  }
});

module.exports = SubHero;
