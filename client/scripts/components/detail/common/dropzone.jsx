/**
* Dropzone (component)
*/
'use strict';

var React = require('react'),

FontAwesome = require('react-fontawesome'),

Alert = require('react-bootstrap/Alert'),
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
      borderColor: this.state.isDragActive ? '#9EAB0F' : '#ccc'
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
        files: [],
        upload_status : 'Upload',
        upload_percent: ''
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
      this.setState({
        upload_status: message,
        upload_percent: percent
      });
    },

    onUploadFinish: function(signResult) {
      //var media_url = window.location.protocol + '//' + window.location.host + signResult.publicUrl;
      var media_url = signResult.s3Url;
      console.log("Upload finished: " + media_url);
      this.props.onUpload(media_url);
      this.cancelHandler();
      this.setState({
        upload_status: 'Upload',
        upload_percent: ''
      });
    },

    onUploadError: function(message) {
      console.log("Upload error: " + message);
    },

    uploadHandler: function() {
      var upload = new S3Upload({
        rawFiles: this.state.files,
        signingUrl: '/s3/sign',
        onProgress: this.onUploadProgress,
        onFinishS3Put: this.onUploadFinish,
        onError: this.onUploadError
      });
      this.setState({upload: upload});
    },

    cancelHandler: function () {
      var that = this;
      setTimeout(function() {
      that.setState({
        files: [],
        upload_status: 'Upload',
        upload_percent: ''
      });}, 200);
      if(this.state.upload) {
        this.state.upload.abortUpload();
      }
    },

    showFiles: function () {
      if (this.state.files && this.state.files.length <= 0) {
        return '';
      } else if (this.state.files.length > 1) {
        return (
          <h4>Sorry, you may only upload one file per media item.</h4>
        );
      } else {

      var files = this.state.files;
      var that = this;
      return (
        <div>
            {files.map(function (f, i) {
              return (
                <Panel key={i} className='upload-panel'>
                    <Row>
                      <Col xs={12} sm={8}>
                        <div className='media'>
                          <div className='media-left media-middle'>
                            <img src={f.preview} width='100px' height='auto' />
                            <div style={{width: that.state.upload_percent ? that.state.upload_percent * 0.9 + '%' : ''}} className='status-indicator' />
                          </div>
                          <div className='media-body media-middle' style={{textAlign:'left'}}>
                            <h4>
                                <strong> {f.name}</strong><br/>
                                <small> {Math.ceil(f.size / 1000)} KB</small>
                            </h4>
                            {f.size > 10000000 ? (
                              <Alert bsStyle='warning'>
                                <strong>Sorry, files must be smaller than 10 MB.</strong> Please try uploading a smaller file.
                              </Alert>
                            ) : ''}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={4}>
                          <Button
                            bsStyle='success'
                            block
                            onClick={that.uploadHandler}
                            disabled={f.size > 10000000 ? true : false} >
                            <FontAwesome
                            name='upload'
                            fixedWidth
                            className='pull-left' />
                          {that.state.upload_status}
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
      }
    },

    render: function () {


      return (
        <div>
          <Dropzone onDrop={this.onDrop}>
            <FontAwesome
            name='file'
            size='3x'/>
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
