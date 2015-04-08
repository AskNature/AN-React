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
    var routeNameSingle = 'd.strategy';
    var entityName = 'Designed Strategies';
    var data = this.props.data;
    var primaryKey = 'headline';
    var secondaryTitle = data.dsystems[0] ? data.dsystems[0].name : '';
    if(data.dsystems[1]){
      secondaryTitle += ' & others';
    }
    if(data.name) {
      secondaryTitle = data.name;
    }
    var descriptionKey = 'special_text';
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={data[primaryKey]}
          primarykey={primaryKey}
          secondarytitle={secondaryTitle}
          secondarykey={'name'}
          secondarylink=''
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          />
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.dsystems}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'dsystems')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'dsystems')}
                field={'d.system'}
                routeName='d.system'
                title='Designed Systems'
                fieldName='Designed System'
                titleField={'name'} />
            </Col>
            <Col xs={6} sm={4}>
              <RelationshipList
                items={data.outcomes}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'outcomes')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'outcomes')}
                field={'fm'}
                routeName='fm'
                title='Functions'
                fieldName='Functions'
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
        <Grid>
          <Row>
            <Col xs={12}>
              <Gallery items={data} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              {data.special_text || this.props.editable ? (
                <TextArea
                  title='Summary'
                  item={data.special_text}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'special_text'}
                  editable={this.props.editable}/>
              ) : '' }
            </Col>
            </Row>

          </Grid>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
