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
    var routeNameSingle = 'user';
    var entityName = 'Users';
    var data = this.props.data;
    var fullname;
    if(this.props.loaded) {
      fullname = data.firstName+' '+data.lastName;
    }

    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={fullname}
          secondarytitle={this.props.data.username}
          description={this.props.data.email}
          userdetail={true}
          />


    </div>
    /* jshint ignore:end */
    );
  }
});

module.exports = Template;
