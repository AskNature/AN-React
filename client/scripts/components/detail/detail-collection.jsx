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

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'collection';
    var entityName = 'Collection';
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
          description={this.props.data.description} />
        <Grid>
          <Row>
            <Col xs={12} sm={12}>
              <RelationshipList
                items={data.in_collection}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'in_collection')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'in_collection')}
                field={'strategy'}
                title={'In this collection:'}
                fieldName={'In this collection:'}
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
