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
Input = require('react-bootstrap').Input,
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
              {this.props.descriptionlink ? (<Link url={this.props.descriptionlink}>{this.props.description}</Link>) : (<span><TextField store={this.props.store} actions={this.props.actions} fieldName={"summary"} initialValue={this.props.description} editable={this.props.editable} /></span>)}
              </h5>
          </Col>
          <Col xs={12} sm={4}>
            <ButtonToolbar className='flat-button' style={{"margin-top": "11.5px"}}>
	             {this.props.editable ?
                 <span>
                   <ButtonGroup>
                     <Button block disabled={this.props.credentials === true ? false : true } active={true} style={{"cursor": "default"}}>
                       <Glyphicon glyph="pencil" /> Edit Mode Active
                     </Button>
                     <Input block type="select" label='Status' defaultValue="Active">
                       <option value="published">Published</option>
                       <option value="draft">Draft</option>
                       <option value="holding">Ready for Review</option>
                         <option value="archived">Archived</option>
                     </Input>
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
                 </span>
               :  <Button onClick={this.props.editBegin}>
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
