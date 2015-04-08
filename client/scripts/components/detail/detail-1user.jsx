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
    var routeNameSingle = '1user';
    var entityName = '1Users';
    var data = this.props.data;
    var fullname;
    if(this.props.loaded) {
      fullname = data.first+' '+data.last;
    }
    var secondaryKey = 'name';
    var descriptionKey = 'special_text';
    var avatar = 'http://www.asknature.org/images/uploads/user/'+this.props.masterid+'/avatar/lg_avatar.jpg';
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={fullname}
          primarykey=''
          secondarytitle={data[secondaryKey]}
          secondarykey={secondaryKey}
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          innerimage={avatar}
          userdetail={true}
          />

    </div>
    /* jshint ignore:end */
    );
  }
});

module.exports = Template;
