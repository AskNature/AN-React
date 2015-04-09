'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
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
    var routeNameSingle = 'context';
    var entityName = 'Context';
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
          primarytitle={data[primaryKey]}
          primarykey={primaryKey}
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          />
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} sm={4}>
            <RelationshipList
              items={data.parent}
              editable={this.props.editable}
              onAdd={this.props.onRelationshipAdd.bind(null, 'parent')}
              onRemove={this.props.onRelationshipRemove.bind(null, 'parent')}
              field={'context'}
              routeName='context'
              title='More General Context'
              fieldName='More General Context'
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
              field={'context'}
              routeName='context'
              title='More Specific Context'
              fieldName='More Specific Context'
              titleField={'name'} />
            </Col>
            <Col xs={12} sm={4}>
            <RelationshipList
              items={data.has_context}
              editable={false}
              onAdd={this.props.onRelationshipAdd.bind(null, 'has_context')}
              onRemove={this.props.onRelationshipRemove.bind(null, 'has_context')}
              field={'has_context'}
              routeName=''
              title={'Listed as Context in'}
              fieldName={'Listed as Context in'}
              titleField={'name'} />
            </Col>
            <Col xs={12} sm={4}>
            <RelationshipList
              items={data.featured_in}
              editable={this.props.editable}
              onAdd={this.props.onRelationshipAdd.bind(null, 'featured_in')}
              onRemove={this.props.onRelationshipRemove.bind(null, 'featured_in')}
              field={'featured_in'}
              routeName={null}
              title={'Has Source'}
              fieldName={'Has Source'}
              titleField={'name'} />
              <RelationshipList
                items={data.studied_by}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'studied_by')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'studied_by')}
                field={'studied_by'}
                routeName={null}
                title={'Studied By'}
                fieldName={'Studied By'}
                titleField={'name'} />
            </Col>
          </Row>
        </Grid>
        <Grid>
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
