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
    var routeNameSingle = 'researcher';
    var entityName = 'R&D Team';
    var data = this.props.data;
    var primaryKey = 'name';
    var primaryLinkKey = 'url';
    var secondaryKey = 'institution';
    var descriptionKey = 'special_text';

    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          label={entityName}
          primarytitle={data[primaryKey]}
          primarykey={primaryKey}
          primarylink={data[primaryLinkKey]}
          secondarytitle={data[secondaryKey]}
          secondarykey={secondaryKey}
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          />
          <Grid>
            <Row className='show-grid'>
              <Col xs={12}>
                <RelationshipList
                  items={data.studied_by}
                  editable={this.props.editable}
                  onAdd={this.props.onRelationshipAdd.bind(null, 'studied_by')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'studied_by')}
                  field={'b.strategy'}
                  title='Area/s of Expertise'
                  fieldName='Area/s of Expertise'
                  titleField={'name'} />
              </Col>
              {this.props.editable ? (
                <RelationshipList
                  items={data.media}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'media')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'media')}
                  field={'media'}
                  routeName={'media'}
                  title={'Media'}
                  fieldName={'Media'}
                  media />
              ) : '' }
            </Row>
          </Grid>


      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
