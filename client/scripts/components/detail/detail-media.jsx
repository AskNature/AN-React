'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
FadeImage = require('../modules/imagefade.jsx'),
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
    var routeNameSingle = 'media';
    var entityName = 'Media';
    var data = this.props.data;
    var img = new Image();
    img.id = data.has_media.length > 0 ? this.props.data.has_media[0].masterid : '';
    img.src='http://www.asknature.org/images/uploads/'+ data.entity + '/' + img.id + '/' + data.filename;
    console.log(img.src);
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
              <FadeImage src={img.src} />
              </Col>
            </Row>
          </Grid>


      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
