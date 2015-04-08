/**
* Detail Hero (component)
*/
'use strict';

var React = require('react'),

TextArea = require('./textarea.jsx'),
Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Avatar = require('react-avatar');


var HeroComponent = React.createClass({
  render: function() {
    var mediaurl, heroStyle;
    if(this.props.imgurl){
      mediaurl = this.props.imgurl;
      heroStyle = {
        backgroundImage: 'url(' + mediaurl + ')'
      };
    } else if(this.props.media && this.props.media.length > 0) {
         mediaurl = 'http://www.asknature.org/images/uploads/'+ this.props.media[0].entity + '/' + this.props.masterid + '/' + this.props.media[0].filename;
        heroStyle = {
          backgroundImage: 'url(' + mediaurl + ')'
        };
      } else {
        heroStyle = {
          backgroundImage: 'url(/images/lichen.JPG)',
          height: '300px !important'
        };
      }
    return (
      /* jshint ignore:start */
      <section className="hero" style={heroStyle}>
        <div className="texture-overlay">
        </div>
        <Grid>
          <Row className="headline">
            <Col xs={12}>
              <div className='media'>
                {this.props.innerimage ? (
                <div className='media-left media-middle'>
                  <Avatar
                    name={this.props.primarytitle} src={this.props.innerimage}
                    round='true'
                    size='100' />
                </div>
              ) : '' }
                <div className='media-body'>
                  <h6 className="animated fadeInDown" style={{textTransform:'uppercase',fontWeight:'800',color:'#ffffff', marginBottom: 0}}>
                    {this.props.label}
                  </h6>
                  <h3 className="animated fadeInDown" style={{marginTop: '8px', marginBottom: 0, fontWeight: '800'}}>
                    {!this.props.editable && this.props.primarylink ? (
                      <Link url={this.props.primarylink}>
                      <TextArea
                        item={!this.props.editable && this.props.primarydisplay ? this.props.primarydisplay : this.props.primarytitle}
                        editable={this.props.editable}
                        store={this.props.store}
                        actions={this.props.actions}
                        fieldName={this.props.primarykey}
                        placeholder='Enter a name' />
                    </Link>
                    ) : (
                      this.props.primarykey ?
                      <TextArea
                        item={!this.props.editable && this.props.primarydisplay ? this.props.primarydisplay : this.props.primarytitle}
                        editable={this.props.editable}
                        store={this.props.store}
                        actions={this.props.actions}
                        fieldName={this.props.primarykey}
                        placeholder='Enter a name' />
                      :
                        <TextArea
                          item={this.props.primarydisplay ? this.props.primarydisplay : this.props.primarytitle}
                          editable={false}
                           />
                    )}
                  </h3>
                  <h5 style={{fontWeight: '600', color: '#ffffff', fontStyle: 'italic', marginTop: 0}}>
                    {!this.props.editable && this.props.secondarylink ? (
                      <Link url={this.props.secondarylink}>
                        <TextArea
                          item={this.props.secondarytitle}
                          editable={this.props.editable}
                          store={this.props.store}
                          actions={this.props.actions}
                          fieldName={this.props.secondarykey}
                          placeholder='Enter a subtitle' />
                      </Link>
                    ) : (
                      <TextArea
                        item={this.props.secondarytitle}
                        editable={this.props.editable}
                        store={this.props.store}
                        actions={this.props.actions}
                        fieldName={this.props.secondarykey}
                        placeholder='Enter a subtitle' />
                    ) }
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
      /* jshint ignore:end */
    );
  }
});

module.exports = HeroComponent;
