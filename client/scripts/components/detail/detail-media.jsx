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
    var primaryKey = 'name';
    var secondaryTitle = 'Placeholder: Media Type';
    var descriptionKey = 'description';
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
          label={entityName+': Media Type (Image, embed, etc)'}
          primarytitle={data[primaryKey]}
          primarykey={primaryKey}
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          imgurl={img.src} />
          <Grid>
            <Row>
              <Col xs={12}>
                <RelationshipList
                  items={data.has_media}
                  editable={false}
                  onAdd={this.props.onRelationshipAdd.bind(null, 'has_media')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'has_media')}
                  field={'Media'}
                  title={'Displayed as Media in'}
                  fieldName={'Displayed as Media in'}
                  titleField={'name'} />
              </Col>
            </Row>

          <Row>
            <Col xs={12}>
              <FadeImage className='fadeimage' src={img.src} />
            </Col>
          </Row>
          <Row>
            <Col xs={1} >
              Checkbox
            </Col>
            <Col xs={11} >
              <h6><strong>Legacy Image Path</strong></h6>
              <h6 className='overflow-scroll'>
                <small>HOST</small>/uploads/<strong>{data.entity}</strong>/<strong>{img.id}</strong>/<strong>{data.filename}</strong></h6>
            </Col>
          </Row>
          <Row>
            <Col xs={1} >
              Checkbox
            </Col>
            <Col xs={11} >
              <h6><strong>Uploaded Image</strong></h6>
                <h6 className='overflow-scroll'>
                  <small>HOST</small>/media/<strong>year</strong>/<strong>month</strong>/<strong>date</strong>/<strong>filename</strong></h6>
            </Col>
          </Row>
          <Row>
            <Col xs={1} >
              Checkbox
            </Col>
            <Col xs={11} >
              <h6><strong>Linked Image (Custom URL)</strong></h6>
              <h5 className='overflow-scroll'>
                <TextArea
                item={data.custom_url}
                store={this.props.store}
                actions={this.props.actions}
                fieldName={'custom_url'}
                editable={this.props.editable}
                placeholder="Enter a URL" />
            </h5>
            </Col>
          </Row>
        </Grid>


      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
