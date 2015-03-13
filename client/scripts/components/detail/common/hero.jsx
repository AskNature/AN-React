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
    var mediaurl = this.props.media.length > 0 ? ('http://www.asknature.org/images/uploads/'+ this.props.media[0].entity + '/' + this.props.media[0].masterid + '/' + this.props.media[0].filename) : '';
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
              <h3 className="animated fadeInDown"> {this.props.editable ? (<span><strong>Editable</strong><br/><small>Slug: {this.props.masterid}</small></span>) : (<span><strong>{this.props.primarytitle}</strong><br/><small>{this.props.secondarylink ? (
                <Link url={this.props.secondarylink}>
                  <i>{this.props.secondarytitle}</i>
                </Link>
              ) : (<i>{this.props.secondarytitle}</i>)}</small></span>)}</h3>
            </Col>
          </Row>
        </Grid>
      </section>
      /* jshint ignore:end */
    );
  }
});

module.exports = HeroComponent;
