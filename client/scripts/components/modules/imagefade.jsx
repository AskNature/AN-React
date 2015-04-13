'use strict';

var React = require('react/addons');

var ImageComponent = React.createClass({
  getInitialState: function() {
    return {
      imageLoaded: false
    };
  },

  onImageLoad: function(img) {
    if (this.isMounted()) {
      this.setState({imageLoaded: true});
    }
  },

  componentDidMount: function() {
    var imgTag = this.refs.img.getDOMNode();
    imgTag.onload = this.onImageLoad(imgTag);
  },

  render: function() {
    var className = this.props.className ? this.props.className + ' image' : 'image';

    if (this.state.imageLoaded) {
      className += ' image-loaded';
    }
    return (
      /* jshint ignore:start */
      <div>
      <img src={this.props.src} className={className} ref='img' onLoad={this.props.getWidth}/>
      </div>
      /* jshint ignore:end */
    );
  }
});
module.exports = ImageComponent;
