'use strict';

var React = require('react'),

DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),
TextArea = require('./common/textarea.jsx'),

Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Button = require('react-bootstrap').Button,
Glyphicon = require('react-bootstrap/Glyphicon'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'fm';
    var entityName = 'Function & Mechanism';
    var data = this.props.data;
    var primaryKey = 'name';
    var descriptionKey = 'description';
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
          description={data[descriptionKey]}
          descriptionKey={descriptionKey} />
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.parent}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'parent')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'parent')}
                field={'fm'}
                routeName='fm'
                title='More General Functions & Mechanisms'
                fieldName='More General Functions & Mechanisms'
                titleField={'name'} />
              <Button bsStyle='link' block
                    disabled={true} >
                  <Glyphicon glyph='arrow-down' />
              </Button>
              <h5 style={{marginLeft:'12px', fontWeight: 'bold'}}>
                {this.props.data.name}
              </h5>
              <Button bsStyle='link' block
                    disabled={true} >
                  <Glyphicon glyph='arrow-down' />
              </Button>
              <RelationshipList
                items={data.children}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'children')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'children')}
                field={'fm'}
                routeName='fm'
                title='More Specific Functions & Mechanisms'
                fieldName='More Specific Functions & Mechanisms'
                titleField={'name'} />
            </Col>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.mechanism}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'mechanism')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'mechanism')}
                field={'mechanism'}
                title={'Listed as a Mechanism in'}
                fieldName={'Listed as a Mechanism in'}
                titleField={'name'} />
            </Col>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.outcome}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'outcome')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'outcome')}
                field={'outcome'}
                title={'Listed as an Outcome in'}
                fieldName={'Listed as an Outcome in'}
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
