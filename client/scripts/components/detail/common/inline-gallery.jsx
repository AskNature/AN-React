'use strict';

var React = require('react'),

PackeryMixin = require('react-packery-mixin'),

Button = require('react-bootstrap').Button,
ModalTrigger = require('react-bootstrap').ModalTrigger,
Modal = require('react-bootstrap').Modal;

var Slider = require('react-slick');

var packeryOptions = {
    transitionDuration: 500,
    itemSelector: '.gallery-item',
    gutter: 0,
    columnWidth: '.grid-sizer'
};

var GalleryModal = React.createClass({
  render: function() {
    var settings = {
      accessibility: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: this.props.mediaKey ? this.props.mediaKey : 0
    };
    return (
      <Modal {...this.props} bsStyle='primary' title={this.props.title} animation={true} key>
        <div className='modal-body an-gallery'>
            <Slider {...settings}>
              {this.props.galleryElements}
            </Slider>
        </div>
      </Modal>
    );
  }
});

var Gallery = React.createClass({

  mixins: [new PackeryMixin('packeryContainer', packeryOptions)],

  render: function() {

    var detail = this.props.items;
    var pictures = detail.media;
    var masterid = detail.masterid;
    var that = this;
    var galleryElements = this.props.items.media ? this.props.items.media.map(function(image, i){
      var mediaurl = image.media_url ? image.media_url : 'http://www.asknature.org/images/uploads/'+ image.entity + '/' + masterid + '/' + image.filename;

      return (
        <div>
          <img key={i} src={mediaurl} style={{maxHeight: that.props.windowHeight*0.6, maxWidth: '100%'}}/>
          <p>{image.description}</p>
          </div>
      );
    }) : [];

    var childElements = this.props.items.media ? this.props.items.media.map(function(image, i){
      var mediaurl = image.media_url ? image.media_url : 'http://www.asknature.org/images/uploads/'+ image.entity + '/' + masterid + '/' + image.filename;
      return (
        <div className='gallery-item' key={i}>
        <ModalTrigger key={i} modal={<GalleryModal galleryElements={galleryElements} mediaKey={i} key={i} title={that.props.title} />}>
          <div className='gallery-thumbnail' style={{backgroundImage: 'url('+mediaurl+')'}} />
    </ModalTrigger>
  </div>
      );
    }) : [];

    return (
      <div>
      <div ref='packeryContainer'>
        <div className='grid-sizer'></div>
        {childElements}
      </div>

      </div>
    );
  }
});

module.exports = Gallery;
