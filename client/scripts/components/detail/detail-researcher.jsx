'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
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

var Select = require('react-select');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'researcher';
    var entityName = 'Team';
    var data = this.props.data;
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          dataType={entityName}
          primarytitle={this.props.data.name}
          secondarytitle={this.props.data.institution}
          secondarylink=''
          description={this.props.data.special_text}
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
                  routeName='phenomenon'
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
          {this.props.user.role === 'admin' ? (
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
