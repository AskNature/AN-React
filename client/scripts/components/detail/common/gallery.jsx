'use strict';

var React = require('react'),

CarouselItem = require('react-bootstrap').CarouselItem,
Carousel = require('react-bootstrap').Carousel,
OverlayTrigger = require('react-bootstrap').OverlayTrigger,
Tooltip = require('react-bootstrap').Tooltip;

var Gallery = React.createClass({
  render: function() {
    var detail = this.props.items;
    var pictures = detail.media;
    var masterid = detail.masterid;
    return (
      <Carousel {...this.props}>
        {
          pictures.map(function(image, i){
            var mediaurl = image.media_url ? image.media_url : 'http://www.asknature.org/images/uploads/'+ image.entity + '/' + masterid + '/' + image.filename;
            var imgStyle = {
              backgroundImage: 'url(' + mediaurl + ')'
            };
            return (
              <CarouselItem key={i}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip><strong>{image.description ? image.description : image.name}</strong></Tooltip>}>
                  <div className="image-bg" style={imgStyle} />
                </OverlayTrigger>
              </CarouselItem>
            );
          })
        }
      </Carousel>
    );
  }
});

module.exports = Gallery;
