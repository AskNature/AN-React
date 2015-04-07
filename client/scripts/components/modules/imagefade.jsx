'use strict';

var React = require('react/addons');

var ImageComponent = React.createClass({
  getInitialState: function() {
    return {
      imageLoaded: false
    };
  },

  onImageLoad: function() {
    if (this.isMounted()) {
      this.setState({imageLoaded: true});
    }
  },

  componentDidMount: function() {
    var imgTag = this.refs.img.getDOMNode();
    imgTag.onload = this.onImageLoad;
  },

  render: function() {
    var className = this.props.className ? this.props.className + ' image' : 'image';
    console.log(this.state);
    if (this.state.imageLoaded) {
      className += ' image-loaded';
    }
    return (
      /* jshint ignore:start */
      <div>
      <img src={this.props.src} className={className} ref='img'/>
      </div>
      /* jshint ignore:end */
    );
  }
});
module.exports = ImageComponent;
