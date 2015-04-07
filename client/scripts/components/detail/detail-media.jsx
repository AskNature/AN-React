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
    var routeNameSingle = 'media';
    var entityName = 'Media';
    var data = this.props.data;
    var img = new Image();
    img.id = data.has_media.length > 0 ? this.props.data.has_media[0].masterid : '';
    img.src='http://www.asknature.org/images/uploads/'+ data.entity + '/' + img.id + '/' + data.filename;
    img.onload = function () {
      img.width = this.width;
      img.height = this.height;
    };
    console.log(img.width);
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={this.props.data.name}
          secondarytitle={this.props.data.filename}
          secondarylink=''
          description={this.props.data.description}
          imgurl={img.src} />
        <Grid>
          <Row>
            <Col xs={12}>
              <img src={img.src} style={{maxWidth: '100%', height: 'auto'}} />
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
