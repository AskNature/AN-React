'use strict';

var React = require('react/addons'),

moment = require('moment'),

Dropzone= require('./common/dropzone.jsx'),

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

  onNewImage : function(url) {
    console.log("got media_url: '" + url + "'");
    this.props.actions.update({media_url: url});
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
    if(!data.media_url && data.entity){
      data.media_url = 'http://www.asknature.org/uploads/' + data.entity + '/' + imgID + '/' + data.filename;
    }
    var upload_date = moment(data.timestamp, 'YYYY-MM-DD HH:mm:ss').format('MMM Do, YYYY');
    /* Conditional auto-fills media_url field for legacy media records: */

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
          imgurl={data.media_url} />
        <Grid>

          <Row>
            <Col xs={12} >
              {this.props.editable ?
                <div>
                  <Dropzone onUpload={this.onNewImage} />
                  <h4 style={{textAlign:'center'}}>
                    ...or enter a custom URL below:
                  </h4>
                </div>
              : ''}
              <TextArea
                title='Image URL'
                item={data.media_url}
                store={this.props.store}
                actions={this.props.actions}
                fieldName={'media_url'}
                editable={this.props.editable}
                initialValue='test'
                placeholder="or add a custom URL here"
                forceWrap
                link
                 />
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col xs={12} sm={8}>
                <FadeImage className='fadeimage' src={data.media_url} getWidth={this._getImageWidth}/>
              </Col>
              <Col xs={12} sm={4}>
                <TextArea
                  title='Name'
                  item={data.name}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'name'}
                  editable={this.props.editable}
                  placeholder="Enter a brief phrase to identify this image" />

                {data.description || this.state.editable ? (
                  <TextArea
                    title='Caption'
                    item={data.description}
                    store={this.props.store}
                    actions={this.props.actions}
                    fieldName={'description'}
                    editable={this.props.editable}
                    placeholder="Enter a caption that will be displayed with this image" />
                  ) : '' }

                  {this.state.width ? (
                    <div>
                      <h6 className='heading'>Pixel Dimensions</h6>
                      <p>{this.state.width + ' x ' + this.state.height}</p>
                    </div>
                  ) : '' }
                  {data.timestamp ? (
                    <div>
                      <h6 className='heading'>Upload Date</h6>
                      <p>{upload_date}</p>
                    </div>
                  ) : '' }
                </Col>
              </Row>
              <hr/>

              <Row>
                <Col xs={12} sm={4}>

                  <h6 className='heading'>License Type</h6>
                  {data.license ? (
                    <form>
                      <Select editable={this.props.editable} selected={data.license.masterid} options={data.license.options} field='status' onRelationshipSet={this.props.onRelationshipSet} />
                    </form>
                  ) : ''}
                </Col>
                <Col xs={12} sm={4}>

                  <h6 className='heading'>Original Attribution</h6>
                    <TextArea
                      item={data.author}
                      store={this.props.store}
                      actions={this.props.actions}
                      fieldName={'author'}
                      editable={this.props.editable}
                      placeholder="Attribute this image (photographer/illustrator/owner/etc)"
                      forceWrap />
                </Col>
                <Col xs={12} sm={4}>

                  <h6 className='heading'>Original Media URL</h6>
                      <TextArea
                        item={data.source_url}
                        store={this.props.store}
                        actions={this.props.actions}
                        fieldName={'source_url'}
                        editable={this.props.editable}
                        placeholder="Enter the URL of the original image"
                        forceWrap
                        link />
                </Col>
              </Row>
              <hr/>
{this.props.editable || data.has_media ?
              <Row>
                <Col xs={12}>
                  <RelationshipList
                    items={data.has_media}
                    editable={false}
                    onAdd={this.props.onRelationshipAdd.bind(null, 'has_media')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'has_media')}
                    field='V'
                    title={'Displayed as Media in'}
                    fieldName={'Displayed as Media in'}
                    titleField={'name'} />
                  </Col>
                </Row>
                : '' }
              </Grid>


            </div>
            /* jshint ignore:end */
          );
        }
      });

module.exports = Template;
