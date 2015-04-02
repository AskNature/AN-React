'use strict';

var React = require('react'),

DefaultLayout = require('../layouts/default.jsx'),

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
    var routeNameSingle = 'collection';
    var entityName = 'Collections';
    var data = this.props.data;
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={this.props.name}
          description={this.props.data.description} />

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
