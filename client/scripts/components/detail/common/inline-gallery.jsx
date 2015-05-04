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
    gutter: 10
};

var GalleryModal = React.createClass({
  render: function() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Modal {...this.props} bsStyle='primary' title='Modal heading' animation={true}>
        <div className='modal-body'>
            <Slider {...settings}>
              {this.props.galleryElements}
            </Slider>
        </div>
        <div className='modal-footer'>
          <span onClick={this.props.onRequestHide}>Close</span>
        </div>
      </Modal>
    );
  }
});

var Gallery = React.createClass({

  mixins: [new PackeryMixin('packeryContainer', packeryOptions)],

  render: function() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    var detail = this.props.items;
    var pictures = detail.media;
    var masterid = detail.masterid;
    var childElements = this.props.items.media ? this.props.items.media.map(function(image, i){
      var mediaurl = image.media_url ? image.media_url : 'http://www.asknature.org/images/uploads/'+ image.entity + '/' + masterid + '/' + image.filename;
      return (
        <img key={i} className='gallery-item' style={{width:'20%'}} src={mediaurl} />
      );
    }) : [];
    var galleryElements = this.props.items.media ? this.props.items.media.map(function(image, i){
      var mediaurl = image.media_url ? image.media_url : 'http://www.asknature.org/images/uploads/'+ image.entity + '/' + masterid + '/' + image.filename;
      return (
        <div><img key={i} src={mediaurl} /></div>
      );
    }) : [];
    return (
      <div>
      <div ref='packeryContainer'>
        {childElements}
      </div>
      <Slider {...settings}>
        {galleryElements}
      </Slider>
      <ModalTrigger modal={<GalleryModal galleryElements={galleryElements}/>}>
    <Button bsStyle='primary' bsSize='large'>Launch demo modal</Button>
  </ModalTrigger>
      </div>
    );
  }
});

module.exports = Gallery;
