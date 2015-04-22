'use strict';

var React = require('react'),

//Temp:
request = require('superagent'),

DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),
TextArea = require('./common/textarea.jsx'),

Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),
FontAwesome = require('react-fontawesome'),

Button = require('react-bootstrap').Button,
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({
  render: function() {
    var routeNameSingle = 'd.system';
    var entityName = 'Designed System';
    var data = this.props.data;
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          label={entityName}
          primarytitle={this.props.data.name}
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
                  onAdd={this.props.onRelationshipAdd.bind(null, 'parent')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'parent')}
                  field={'d.system'}
                  routeName={'d.system'}
                  title={'More General Systems'}
                  fieldName={'More General Systems'}/>
                  <Button bsStyle='link' block
                        disabled={true} >
                        <FontAwesome name='filter' />
                  </Button>
                  <h5 style={{fontWeight: 'bold',marginLeft:'12px'}}>
                    {this.props.data.name ? this.props.data.name : 'Name'}
                  </h5>
                  {data.children ? (
                  <Button bsStyle='link' block
                        disabled={true} >
                        <FontAwesome name='filter' />
                  </Button>
                  ) : ''}
                <RelationshipList
                  items={data.children}
                  editable={false}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'children')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'children')}
                  field={'d.system'}
                  routeName={'d.system'}
                  title={'More Specific Systems'}
                  fieldName={'More Specific Systems'}/>
              </Col>
              <Col xs={6} sm={4}>
                <RelationshipList
                  items={data.has_dsystem}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null,'has_dsystem')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'has_dsystem')}
                  field={'d.strategy'}
                  routeName={'d.strategy'}
                  title={'Bio-inspired Strategies'}
                  fieldName={'Bio-inspired Strategies'}/>
                </Col>
                <Col xs={6} sm={4}>
                  <RelationshipList
                    items={data.has_source}
                    editable={this.props.editable}
                    titleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'out_featuredin')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'out_featuredin')}
                    field={'source'}
                    routeName={'source'}
                    title={'Sources'}
                    fieldName={'Sources'}/>

                    <RelationshipList
                      items={data.studied_by}
                      editable={this.props.editable}
                      titleField='name'
                      onAdd={this.props.onRelationshipAdd.bind(null, 'out_studiedby')}
                      onRemove={this.props.onRelationshipRemove.bind(null, 'out_studiedby')}
                      field={'researcher'}
                      routeName={'researcher'}
                      title={'R&D Teams'}
                      fieldName={'R&D Teams'}/>
                </Col>
              </Row>
             </Grid>


      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
