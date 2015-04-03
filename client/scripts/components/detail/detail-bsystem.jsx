'use strict';

var React = require('react'),

//Temp:
request = require('superagent'),

DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),
TextArea = require('./common/textarea.jsx'),
DataTable = require('./common/datatable.jsx'),

Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Button = require('react-bootstrap').Button,
Glyphicon = require('react-bootstrap/Glyphicon'),
Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({
  render: function() {
    var routeNameSingle = 'b.system';
    var entityName = 'Biological System';
    var data = this.props.data;
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          datatype={entityName+': Organism'}
          primarytitle={this.props.data.common_name}
          primarydisplay={this.props.data.common_name ? this.props.data.common_name : 'Common Name'}
          secondarytitle={this.props.data.name}
          secondarylink=''
          description={data.description ? data.description : 'Description goes here'} />
          <Grid>
            <Row className='show-grid'>
              <Col xs={12} sm={4}>
                <RelationshipList
                  items={data.parent}
                  editable={false}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'living_systems')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'living_systems')}
                  field={'living_systems'}
                  routeName={'b.system'}
                  title={'Higher Level System'}
                  fieldName={'Higher Level System'}/>
                  <Button bsStyle='link' block
                        disabled={true} >
                      <Glyphicon glyph='arrow-down' />
                  </Button>
                  <h5 style={{fontWeight: 'bold',marginLeft:'12px'}}>
                    {this.props.data.common_name ? this.props.data.common_name : 'Common Name'}
                    <br/>
                    <small>
                      {this.props.data.taxon}: <i>{this.props.data.name}</i>
                  </small>
                  </h5>
                  {data.children ? (
                  <Button bsStyle='link' block
                        disabled={true} >
                      <Glyphicon glyph='arrow-down' />
                  </Button>
                  ) : ''}
                <RelationshipList
                  items={data.children}
                  editable={false}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'living_systems')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'living_systems')}
                  field={'living_systems'}
                  routeName={'b.system'}
                  title={'Lower Level System'}
                  fieldName={'Lower Level System'}/>
              </Col>
              <Col xs={6} sm={4}>
                <RelationshipList
                  items={data.has_livingsystem}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null,'strategies')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'strategies')}
                  field={'strategies'}
                  routeName={'b.strategy'}
                  title={'Biological Strategies'}
                  fieldName={'Biological Strategies'}/>
                </Col>
                <Col xs={6} sm={4}>
                  <RelationshipList
                    items={data.out_featuredin}
                    editable={this.props.editable}
                    titleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'sources')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'sources')}
                    field={'sources'}
                    routeName={'source'}
                    title={'Referenced by'}
                    fieldName={'Referenced by'}/>

                    <RelationshipList
                      items={data.out_studiedby}
                      editable={this.props.editable}
                      titleField='name'
                      onAdd={this.props.onRelationshipAdd.bind(null, 'researchers')}
                      onRemove={this.props.onRelationshipRemove.bind(null, 'researchers')}
                      field={'researchers'}
                      routeName={'researchers'}
                      title={'Studied by'}
                      fieldName={'Studied by'}/>
                </Col>
              </Row>
             </Grid>
        {this.props.user.role === 'admin' ? (
            <PanelGroup defaultActiveKey='0' accordion>
              <Panel header='Table View' eventKey='1'>
                <DataTable data={data} />
              </Panel>
            </PanelGroup>
          ) : '' }

      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;