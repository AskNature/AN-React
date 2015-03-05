/**
* Detail Hero (component)
*/
'use strict';

var React = require('react'),

Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col;

var HeroComponent = React.createClass({
  render: function() {
    var mediaurl = '';
    // mediaurl = 'http://www.asknature.org/images/uploads/'+ this.props.items.media_entity[0] + '/' + this.props.items.media_id[0] + '/' + this.props.items.media[0];
    var heroStyle = {
      backgroundImage: 'url(' + mediaurl + ')'
    };
    return (
      /* jshint ignore:start */
      <section className="hero" style={heroStyle}>
        <div className="texture-overlay"></div>
        <Grid>
          <Row className="headline">
            {this.props.innerimage ?
              (
                <Col xs={12}>
                  <div className='media'>
                    <div className='media-left media-middle'>
                      <img src={this.props.innerimage} alt='Profile' width='100px' height='100px' className='img-circle' />
                    </div>
                    <div className='media-body'>
                      <h3 className="animated fadeInDown"> <strong>{this.props.primarytitle}</strong><br/>
                        <small>
                          {this.props.secondarytitle}
                        </small>
                      </h3>
                    </div>
                  </div>
                </Col>
              ) : (
                <Col xs={12}>
                  <h3 className="animated fadeInDown"> <strong>{this.props.primarytitle}</strong><br/>
                    <small>
                      {this.props.secondarylink ? (
                          <Link url={this.props.secondarylink}>
                            <i>{this.props.secondarytitle}</i>
                          </Link>
                        ) : (
                          <i>{this.props.secondarytitle}</i>
                        )
                      }
                    </small>
                  </h3>
                </Col>
              )
            }
          </Row>
        </Grid>
      </section>
      /* jshint ignore:end */
    );
  }
});

module.exports = HeroComponent;
