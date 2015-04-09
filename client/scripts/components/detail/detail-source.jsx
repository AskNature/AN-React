'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),

TextArea = require('./common/textarea.jsx'),
Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Select = require('react-select');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'source';
    var entityName = 'Sources';
    var data = this.props.data;
    var primaryKey = 'name';
    var secondaryKey = 'authors';
    var descriptionKey = 'abstract_excerpt';
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={data[primaryKey]}
          primarykey={primaryKey}
          secondarytitle={data[secondaryKey]}
          secondarykey={secondaryKey}
          secondarylink={this.props.data.url}
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          />
          <Grid>
  	        <Row className='show-grid'>
  		        <Col xs={12} sm={4}>

                <RelationshipList
                  items={data.context}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'context')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'context')}
                  field={'context'}
                  routeName={'context'}
                  title={'Context'}
                  fieldName={'Context'}/>
      		    </Col>
      		    <Col xs={6} sm={4}>
                <RelationshipList
                  items={data.mechanisms}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null,'mechanisms')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'mechanisms')}
                  field={'fm'}
                  routeName={'fm'}
                  title={'Mechanisms'}
                  fieldName={'Mechanisms'}/>
        		    </Col>
        		    <Col xs={6} sm={4}>
                  <RelationshipList
                    items={data.functions}
                    editable={this.props.editable}
                    titleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'functions')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'functions')}
                    field={'fm'}
                    routeName={'fm'}
                    title={'Functions'}
                    fieldName={'Functions'}/>
        		    </Col>
          		</Row>
              <Row>
                <Col xs={12}>
                  <RelationshipList
                    items={data.has_source}
                    editable={false}
                    title={'Listed as a Source in'}
                    titleField={'name'} />
                </Col>
              </Row>
       	    </Grid>


      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
