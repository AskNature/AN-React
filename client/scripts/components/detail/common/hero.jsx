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
            <Col xs={12} md={12}>
              <h3 className="animated fadeInDown"> <strong>{this.props.primarytitle}</strong><br/><small><Link url={this.props.secondarylink ? this.props.secondarylink : ''}><i>{this.props.secondarytitle}</i></Link></small></h3>
            </Col>
          </Row>
        </Grid>
      </section>
      /* jshint ignore:end */
    );
  }
});

module.exports = HeroComponent;
