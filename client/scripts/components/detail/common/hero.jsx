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
    var mediaurl = 'http://www.asknature.org/images/uploads/'+ this.props.items.media_entity[0] + '/' + this.props.items.media_id[0] + '/' + this.props.items.media[0];
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
                <div>
                <Col xs={3}>
                  <img src={this.props.innerimage} alt='Profile' className='img-circle img-responsive right' />
                </Col>

                <Col xs={9}>
                  <h3 className="animated fadeInDown"> <strong>{this.props.primarytitle}</strong><br/>
                    <small>
                      {this.props.secondarylink ? (
                          <Link url={this.props.secondarylink}>
                            {this.props.secondarytitle}
                          </Link>
                        ) : (
                          <span>{this.props.secondarytitle}</span>
                        )
                      }
                    </small>
                  </h3>
                </Col>
              </div>
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
