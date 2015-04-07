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
    var routeNameSingle = '1user';
    var entityName = '1Users';
    var data = this.props.data;
    var fullname;
    if(this.props.loaded) {
      fullname = data.first+' '+data.last;
    }
    var avatar = 'http://www.asknature.org/images/uploads/user/'+this.props.masterid+'/avatar/lg_avatar.jpg';
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={fullname}
          secondarytitle={this.props.data.name}
          description={this.props.data.special_text}
          innerimage={avatar}
          userdetail={true}
          />

        {this.props.user.role == 'admin' ? (
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
