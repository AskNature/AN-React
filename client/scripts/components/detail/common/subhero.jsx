/**
* Detail Hero (component)
*/
'use strict';

var React = require('react'),

TextArea = require('./textarea.jsx'),
TextField = require('../../modules/textfield.jsx'),
RestrictOptions = require('../../modules/restrictoptions.jsx'),

FontAwesome = require('react-fontawesome'),

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
Tooltip = require('react-bootstrap').Tooltip,
OverlayTrigger = require('react-bootstrap').OverlayTrigger,

Link = require('../../modules/link.jsx'),

Select = require('../../modules/select.jsx');

var Restrict = require('../../modules/restrict.jsx');

var SubHero = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <Grid>
        <Row>
          <Col xs={12} sm={8}>
            <h5 className="lead">
              {this.props.first ? (
                <strong>
                  {this.props.first}
                </strong>)
              : ''}
              {this.props.descriptionlink ? (
                <Link url={this.props.descriptionlink}>
                  {this.props.description}
                </Link>
              ) : (
                <span>
                  {this.props.descriptionKey ? (
                  <TextArea
                    store={this.props.store}
                    actions={this.props.actions}
                    item={this.props.description}
                    fieldName={this.props.descriptionKey}
                    editable={this.props.editable}
                    placeholder='Add a description'
                    />
                ) : (
                  <TextArea
                    item={this.props.description}
                    editable={false}
                    />
                )}
                </span>
              )}
            </h5>
          </Col>
          <Col xs={12} sm={4}>
            <Nav justified activeKey={0} bsStyle='pills' style={{"margin-top": "11.5px"}}>
              {/*<RestrictOptions user={this.props.user.status} options={{"EditStrategy": {'disabled': true, 'eventKey':1, onClick: this.props.toggleEditable}}}>*/}
	      <NavItem
                eventKey={1}
                onClick={this.props.toggleEditable}
                disabled={
                  this.props.credentials === false ? true : false
                } >
                <FontAwesome name='pencil' size='lg' fixedWidth />
              </NavItem>
	      {/*</RestrictOptions>*/}
              <NavItem eventKey={3}>
                <FontAwesome name='share-alt' size='lg' fixedWidth />
              </NavItem>
              <NavItem eventKey={4}>
                <FontAwesome name='print' size='lg' fixedWidth />
              </NavItem>
              <NavItem eventKey={5}>
                <FontAwesome name='bookmark-o' size='lg' fixedWidth />
              </NavItem>

            </Nav>
                {this.props.editable ?
                    <div>
                    <ButtonGroup>
                      <Button block bsStyle='link' disabled={true} style={{"cursor": "default"}}>
                        Edit Mode Active
                      </Button>
                      <Button block bsStyle="success" onClick={this.props.editFinish}>
                        <FontAwesome name='check' size='lg' fixedWidth /> <strong>Update</strong>
                      </Button>
                      <Button block bsStyle="warning" onClick={this.props.editCancel}>
                        <FontAwesome name='undo' size='lg' fixedWidth /> Cancel
                      </Button>
                      {this.props.user.role === 'admin' ?
                      <Button block bsStyle="danger" onClick={this.props.onDelete}>
                        <FontAwesome name='trash' size='lg' fixedWidth /> Delete
                      </Button>
                      : ''}
                    </ButtonGroup>
                    <hr/>
                    <fieldset>
                      {this.props.status ?
                      <Select editable={this.props.editable} selected={this.props.status.masterid} options={this.props.status.options} field='status' onRelationshipSet={this.props.onRelationshipSet} />
                      : ''}

                      <div className='form-group'>
                        <label className="checkbox-inline">
                          <input type='checkbox' checked={this.props.flags.flagText}
                            onClick={this.props.onBooleanSet} id='flag_text' /><FontAwesome name='font' size='lg' fixedWidth />
                        </label>
                        <label className="checkbox-inline">
                          <input type='checkbox' checked={this.props.flags.flagTags} id='flag_tags' onClick={this.props.onBooleanSet}/><FontAwesome name='tags' size='lg' fixedWidth />
                        </label>
                        <label className="checkbox-inline">
                          <input type='checkbox' checked={this.props.flags.flagMedia} id='flag_media' onClick={this.props.onBooleanSet}/><FontAwesome name='picture-o' size='lg' fixedWidth />
                        </label>
                      </div>
                      </fieldset>
                    <TextArea
                      title='Editor Comments'
                      item={this.props.editorComments}
                      store={this.props.store}
                      actions={this.props.actions}
                      fieldName={'editor_comments'}
                      editable={this.props.editable} />
                  </div>
                : this.props.user.role === 'admin' ?

                  <fieldset disabled>
                    {this.props.status ?
                      <Select editable={this.props.editable} selected={this.props.status.masterid} options={this.props.status.options} field='status' onRelationshipSet={this.props.onRelationshipSet} />
                    : ''}
                    <div className='form-group'>
                      <label className="checkbox-inline">
                        <input type='checkbox' checked={this.props.flags.flagText} id='flag_text' /><FontAwesome name='font' size='lg' fixedWidth />
                      </label>
                      <label className="checkbox-inline">
                        <input type='checkbox' checked={this.props.flags.flagTags} id='flag_tags' /><FontAwesome name='tags' size='lg' fixedWidth />
                      </label>
                      <label className="checkbox-inline">
                        <input type='checkbox' checked={this.props.flags.flagMedia} id='flag_media' /><FontAwesome name='picture-o' size='lg' fixedWidth />
                      </label>
                    </div>
                  </fieldset>
                  : ''
                 }
              </Col>
            </Row>
          </Grid>
      /* jshint ignore:end */
    );
  }
});

module.exports = SubHero;
