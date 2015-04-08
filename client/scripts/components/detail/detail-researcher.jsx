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
    var entityName = 'Team';
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
              <Col xs={12} sm={4}>
                <RelationshipList
                  items={data.designedsystems}
                  editable={this.props.editable}
                  onAdd={this.props.onRelationshipAdd.bind(null, 'designedsystems')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'designedsystems')}
                  field={'designedsystems'}
                  routeName='{null}'
                  title='Area/s of Research'
                  fieldName='Area/s of Research'
                  titleField={'name'} />
              </Col>
              <Col xs={6} sm={4}>
                <RelationshipList
                  items={data.outcomes}
                  editable={this.props.editable}
                  onAdd={this.props.onRelationshipAdd.bind(null, 'functions')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'functions')}
                  field={'functions'}
                  routeName='FM'
                  title='Outcomes'
                  fieldName='Outcome'
                  titleField={'name'} />
              </Col>
              <Col xs={12} sm={8}>
                <RelationshipList
                  items={data.strategies}
                  editable={this.props.editable}
                  onAdd={this.props.onRelationshipAdd.bind(null, 'strategies')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'strategies')}
                  field={'strategies'}
                  routeName='b.strategy'
                  title='Inspiring Biological Strategies'
                  fieldName='Biological Strategy'
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
