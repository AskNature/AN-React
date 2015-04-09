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
    var secondaryTitle = data.designedsystems[0] ? data.designedsystems[0].name : '';
    if(data.designedsystems[1]){
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
                field={'d.system'}
                routeName='d.system'
                title='Designed Systems'
                fieldName='Designed System'
                titleField={'name'} />
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
                onAdd={this.props.onRelationshipAdd.bind(null, 'mechanisms')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'mechanisms')}
                field={'fm'}
                routeName='fm'
                title='Mechanisms'
                fieldName='Mechanisms'
                titleField={'name'} />
            </Col>
            <Col xs={6} sm={4}>
              <RelationshipList
                items={data.functions}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'functions')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'functions')}
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
                field={'b.strategy'}
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
              {data.challenges_solved || this.props.editable ? (
                <TextArea
                  item={data.challenges_solved}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'challenges_solved'}
                  editable={this.props.editable}/>
              ) : '' }
              {data.how_is_it_different || this.props.editable ? (
                <TextArea
                  item={data.how_is_it_different}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'how_is_it_different'}
                  editable={this.props.editable}/>
              ) : '' }
              {data.biomimicry_story || this.props.editable ? (
                <TextArea
                  item={data.biomimicry_story}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'biomimicry_story'}
                  editable={this.props.editable}/>
              ) : '' }
            </Col>
            </Row>
            <Row className='show-grid'>
              <Col xs={12} sm={6}>

                  <RelationshipList
                    items={data.sources}
                    editable={this.props.editable}
                    titleField='name'
                    subtitleField='authors'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'sources')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'sources')}
                    field={'source'}
                    routeName={'source'}
                    title={'Sources'}
                    fieldName={'Sources'}/>
              </Col>
              <Col xs={12} sm={6}>
                <RelationshipList
                  items={data.experts}
                  editable={this.props.editable}
                  titleField='name'
                  subtitleField='institution'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'experts')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'experts')}
                  field={'researcher'}
                  routeName={'researcher'}
                  title={'Researched By'}
                  fieldName={'Researched By'}/>
              </Col>
            </Row>
          </Grid>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
