/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),

CarouselItem = require('react-bootstrap').CarouselItem,
Carousel = require('react-bootstrap').Carousel,
OverlayTrigger = require('react-bootstrap').OverlayTrigger,
Tooltip = require('react-bootstrap').Tooltip;

var Gallery = React.createClass({
  render: function() {
    var detail = this.props.items;
    var masterid = detail.masterid;
    var pictures = detail.media;
    var picturenames = detail.media_name;
    return (
      <Carousel {...this.props}>
        {
          pictures.map(function(imageurl, i){
            var mediaurl = 'http://www.asknature.org/images/uploads/'+ detail.media_entity[i] + '/' + detail.media_id[i] + '/' + detail.media[i];
            var imgStyle = {
              backgroundImage: 'url(' + mediaurl + ')'
            };
            return (
              <CarouselItem key={i}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip><strong>{picturenames[i]}</strong></Tooltip>}>
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
