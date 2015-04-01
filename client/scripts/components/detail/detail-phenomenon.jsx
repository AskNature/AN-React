'use strict';

var React = require('react'),

DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),
TextArea = require('./common/textarea.jsx'),
DataTable = require('./common/datatable.jsx'),

Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'phenomenon';
    var entityName = 'Phenomena';
    var data = this.props.data;
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={this.props.data.name}
          secondarytitle=''
          secondarylink=''
          description={this.props.data.description} />
      
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.parent}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'parent')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'parent')}
                field={'function'}
                routeName='phenomenon'
                title='Parent Phenomenon'
                fieldName='Parent Phenomenon'
                titleField={'name'} />
              <RelationshipList
                items={data.children}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'children')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'children')}
                field={'functions'}
                routeName='phenomenon'
                title='Child Phenomena'
                fieldName='Child Phenomena'
                titleField={'name'} />
            </Col>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.mechanism}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'mechanism')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'mechanism')}
                field={'mechanism'}
                routeName={null}
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
                routeName={null}
                title={'Listed as an Outcome in'}
                fieldName={'Listed as an Outcome in'}
                titleField={'name'} />
            </Col>
          </Row>
        </Grid>

        {this.props.userrole == 'admin' || 'editor' ? (
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
