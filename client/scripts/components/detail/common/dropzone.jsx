/**
* Dropzone (component)
*/
'use strict';

var React = require('react'),

FontAwesome = require('react-fontawesome'),

Panel = require('react-bootstrap/Panel'),
Button = require('react-bootstrap').Button,
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid'),

S3Upload = require('react-s3-uploader/s3upload');

var Dropzone = React.createClass({
  getInitialState: function() {
    return {
      isDragActive: false
    };
  },

  propTypes: {
    onDrop: React.PropTypes.func.isRequired,
    size: React.PropTypes.number,
    style: React.PropTypes.object
  },

  onDragLeave: function(e) {
    this.setState({
      isDragActive: false
    });
  },

  onDragOver: function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    this.setState({
      isDragActive: true
    });
  },

  onDrop: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false
    });

    var files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    for (var i = 0; i < files.length; i++) {
      files[i].preview = URL.createObjectURL(files[i]);
    }

    if (this.props.onDrop) {
      files = Array.prototype.slice.call(files);
      this.props.onDrop(files, this.refs.fileInput.getDOMNode());
    }
  },

  onClick: function () {
    this.refs.fileInput.getDOMNode().click();
  },

  render: function() {

    var className = this.props.className || 'dropzone';
    if (this.state.isDragActive) {
      className += ' active';
    }

    var style = this.props.style || {
      width: '100%',
      height: 'auto',
      padding: '10px 20px 20px',
      marginBottom: '20px',
      borderSize: '4px',
      borderColor: '#ccc',
      borderStyle: this.state.isDragActive ? 'solid' : 'dashed',
      backgroundColor: this.state.isDragActive ? 'white' : 'transparent',
      textAlign: 'center',
      cursor: 'pointer'
    };

    if (this.props.className) {
      style = this.props.style;
    }

    return (
      <div className={className} style={style} onClick={this.onClick} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}>
        <input style={{display: 'none' }} type='file' single ref='fileInput' onChange={this.onDrop} />
        {this.props.children}
      </div>
    );
  }

});

var DropzoneComponent = React.createClass({displayName: 'DropzoneComponent',
    getInitialState: function () {
      return {
        files: []
      };
    },

    onDrop: function (files, fileElement) {
      console.log('Received files: ', files);
      this.setState({
        files: files,
	fileElement: fileElement
      });
    },

    onUploadProgress: function(percent, message) {
      console.log('Upload progress: ' + percent + '% ' + message);
    },

    onUploadFinish: function(signResult) {
      console.log("Upload finished: " + signResult.publicUrl);
    },

    onUploadError: function(message) {
      console.log("Upload error: " + message);
    },

    uploadHandler: function() {
      new S3Upload({
        fileElement: this.state.fileElement,
        signingUrl: '/s3/sign',
        onProgress: this.onUploadProgress,
        onFinishS3Put: this.onUploadFinish,
        onError: this.onUploadError
      });
    },

    cancelHandler: function () {
      this.setState({
        files: []
      });
    },

    showFiles: function () {
      if (this.state.files.length <= 0) {
        return '';
      } else if (this.state.files.length > 1) {
        return (
          <h4>Sorry, you may only upload one file per media item.</h4>
        );
      }

      var files = this.state.files;
      var that = this;
      return (
        <div>
            {files.map(function (f, i) {
              return (
                <Panel key={i}>
                    <Row>
                      <Col xs={12} sm={8}>
                        <div className='media'>
                          <div className='media-left media-middle'>
                            <img src={f.preview} width='auto' height='100px' />
                          </div>
                          <div className='media-body media-middle' style={{textAlign:'left'}}>
                            <h4>
                                <strong> {f.name}</strong><br/>
                                <small> {f.size} bytes</small>
                            </h4>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={4}>
                          <Button bsStyle='success' block onClick={that.uploadHandler}>
                            <FontAwesome
                            name='upload'
                            fixedWidth
                            className='pull-left' />
                            Upload
                          </Button>
                          <Button bsStyle='warning' block onClick={that.cancelHandler}>
                            <FontAwesome
                            name='undo'
                            fixedWidth
                            className='pull-left' />
                          Cancel
                          </Button>
                      </Col>
                    </Row>
                </Panel>
              );
            })}
        </div>

        );
    },

    render: function () {


      return (
        <div>
          <Dropzone onDrop={this.onDrop}  >
            <h3>
              <strong>Drop files here</strong> or click to choose
            </h3>
          </Dropzone>
          <div>
            {this.showFiles()}
          </div>
        </div>
      );
    }
});


module.exports = DropzoneComponent;
