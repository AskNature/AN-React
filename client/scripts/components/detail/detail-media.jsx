'use strict';

var React = require('react'),

moment = require('moment'),

Link = require('../modules/link.jsx'),
FadeImage = require('../modules/imagefade.jsx'),
Select = require('../modules/select.jsx'),
DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),

TextArea = require('./common/textarea.jsx'),
Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Panel = require('react-bootstrap/Panel'),
Well = require('react-bootstrap/Well'),

Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({
  getInitialState : function () {
    return {width: 0, height: 0};
  },
  _getImageWidth : function(e) {
    var w = e.target.naturalWidth;
    var h = e.target.naturalHeight;
    console.log(w+' x '+h);
    this.setState({width: w, height: h});
  },

  render: function() {
    var routeNameSingle = 'media';
    var entityName = 'Media';
    var data = this.props.data;
    var primaryKey = 'name';
    var secondaryTitle = 'Placeholder: Media Type';
    var descriptionKey = 'description';
    var addedby = data.added_media;
    var imgID = data.has_media.length > 0 ? data.has_media[0].masterid : '';
    var imgSRC='http://www.asknature.org/images/uploads/'+ data.entity + '/' + imgID + '/' + data.filename;
    var upload_date = moment(data.timestamp, 'YYYY-MM-DD HH:mm:ss').format('MMM Do, YYYY');
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
          addedby={addedby}
          imgurl={imgSRC} />
          <Grid>
            <Row>
              <Col xs={12}>
                <RelationshipList
                  items={data.has_media}
                  editable={this.props.editable}
                  onAdd={this.props.onRelationshipAdd.bind(null, 'has_media')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'has_media')}
                  field={'Content'}
                  title={'Displayed as Media in'}
                  fieldName={'Displayed as Media in'}
                  titleField={'name'} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12} >
                <Panel>
                  <form>
                  <Input type='file' help='Upload a JPG, PNG, or GIF to AskNature. Max file size is 8mb.' />
                  <Input
                    type='text'
                    placeholder='Enter Custom URL'
                    value={data.media_url ? data.media_url : data.entity ? 'http://www.asknature.org/uploads/'+data.entity+'/'+imgID+'/'+data.filename : ''}
                    buttonAfter={<Button>Link to Image</Button>} />
                  </form>
                </Panel>
              </Col>
            </Row>
          <Row>

            <Col xs={12} sm={8}>
              <FadeImage className='fadeimage' src={imgSRC} getWidth={this._getImageWidth}/>
            </Col>
            <Col xs={12} sm={4}>

              <h6><strong>Name</strong></h6>
              <p>
                <TextArea
                item={data.name}
                store={this.props.store}
                actions={this.props.actions}
                fieldName={'name'}
                editable={this.props.editable}
                placeholder="Enter a brief phrase to identify this image" />
              </p>
              <h6><strong>Caption</strong></h6>
              <p>
                <TextArea
                item={data.description}
                store={this.props.store}
                actions={this.props.actions}
                fieldName={'description'}
                editable={this.props.editable}
                placeholder="Enter a caption that will be displayed with this image" />
              </p>
              <h6><strong>Pixel Dimensions: </strong>{this.state.width + ' x ' + this.state.height}</h6>
              <h6><strong>Upload Date: </strong>{upload_date}</h6>
            </Col>
          </Row>
          <Row>
            <Well>
            <Col xs={12} sm={4}>

              <h6><strong>License</strong></h6>
                {data.license ? (
                  <form>
                    <Select editable={this.props.editable} selected={data.license.masterid} options={data.license.options} field='status' onRelationshipSet={this.props.onRelationshipSet} />
                  </form>
                ) : ''}
              </Col>
              <Col xs={12} sm={4}>

              <h6><strong>Original Image Attribution</strong></h6>
                <h6 className='overflow-scroll'>
                <TextArea
                item={data.author}
                store={this.props.store}
                actions={this.props.actions}
                fieldName={'author'}
                editable={this.props.editable}
                placeholder="Attribute this image (photographer/illustrator/owner/etc)" />
            </h6>
            </Col>
            <Col xs={12} sm={4}>

              <h6><strong>Original Image URL</strong></h6>
              <h6 className='overflow-scroll'>
                {this.props.editable ? (
                <TextArea
                item={data.source_url}
                store={this.props.store}
                actions={this.props.actions}
                fieldName={'source_url'}
                editable={this.props.editable}
                placeholder="Enter the URL of the original image" />
            ) : (
              <a href={data.source_url} target='_blank'>{data.source_url}</a>
            ) }
              </h6>
            </Col>
            </Well>
          </Row>
          </Grid>


      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
