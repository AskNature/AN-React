/**
* Strategy detail (component)
*/
'use strict';

var React = require('react');

var Link = require('../modules/link.jsx');
var Col = require('react-bootstrap/Col');
var Well = require('react-bootstrap/Well');
var Button = require('react-bootstrap/Button');
var Row = require('react-bootstrap/Row');
var Grid = require('react-bootstrap/Grid');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Carousel = require('react-bootstrap/Carousel');
var CarouselItem = require('react-bootstrap/CarouselItem');

var DefaultLayout = require('../layouts/default.jsx');


/** Gets incoming information from the store */

var focusStore = require('../../stores/strategy_detail');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/strategy');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    details: focusStore.get()
   }
}

var Functions = React.createClass({
  render: function() {
    var funcs = this.props.items.functions;
    return (
    <Well bsSize="small">
      <h6>Outcomes</h6>
      {
        funcs.map(function(func, i){
          return (
            <Button key={i} block>{func}</Button>
          )
        })
    }
    </Well>
    )

  }
});

var Gallery = React.createClass({
  render: function() {
    var pictures = this.props.items.media;
    console.log(pictures);
    var masterid = this.props.items.masterid;
    console.log(masterid);
    return (
    <Carousel {...this.props}>
    {
      pictures.map(function(imageurl, i){
        var mediaurl= "http://www.asknature.org/images/uploads/strategy/"+masterid+"/"+imageurl;
        return (
          <CarouselItem key={i}>
              <img width={1200} height={400} alt="1200x400" src={mediaurl} />
              <div className="carousel-caption" />
          </CarouselItem>
        )
      })
    }
    </Carousel>
    )

  }
});
/** StrategyDetail class contains a search field that filters items in
* an unordered list in real time.
*/

var StrategyDetail = React.createClass({

  mixins: [focusStore.mixin],

  getInitialState: function() {
    return getState();
  },

  componentWillMount: function() {
    var id = window.location.pathname;
    focusActions.getItem(id);
  },

  componentDidMount: function(){

  },

  render: function() {
    var detail = this.state.details.results[0];
    return (
        /* jshint ignore:start */
        <DefaultLayout>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={6}>
                  <Link url="../admin/strategies"><Glyphicon glyph="chevron-left" /> Strategy Console</Link>
                  <h2>{detail.name}</h2>
                  <p className="lead">{detail.summary}</p>
                  <Functions items={detail} />
                </Col>
                <Col xs={12} md={6}>
                  <Gallery items={detail} />
                </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={12} md={12}>
                    <Well>
                      <h6>The Story</h6>
                      <p dangerouslySetInnerHTML={{__html: detail.brief}} />
                    </Well>
                    <Well>
                      <h6>Citations</h6>
                      <p dangerouslySetInnerHTML={{__html: detail.special_text}} />
                    </Well>
                  </Col>
                </Row>
            </Grid>
        </DefaultLayout>
        /* jshint ignore:end */
    );
  },

  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
      this.setState(getState());
  }
});

module.exports = StrategyDetail;
