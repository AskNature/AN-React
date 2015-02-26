/**
* Phenomenon detail (component)
*/
'use strict';

var React = require('react');

var Link = require('../modules/link.jsx');
var Col = require('react-bootstrap/Col'),
Well = require('react-bootstrap/Well'),
Button = require('react-bootstrap/Button'),
ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
OverlayTrigger = require('react-bootstrap/OverlayTrigger'),
Tooltip = require('react-bootstrap/Tooltip'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid'),
Glyphicon = require('react-bootstrap/Glyphicon'),
Carousel = require('react-bootstrap/Carousel'),
CarouselItem = require('react-bootstrap/CarouselItem'),
Table = require('react-bootstrap/Table');

var DefaultLayout = require('../layouts/default.jsx');


/** Gets incoming information from the store */

var focusStore = require('../../stores/detail/phenomena');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/phenomena');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    details: focusStore.get()
  };
};

var ButtonList = React.createClass({
  render: function() {
    var items = this.props.items;
    var title = this.props.title;
    return (
      <Well bsSize="small">
        <h6>{title}</h6>
        {
          items.map(function(item, i){
            return (
              <OverlayTrigger placement="top" overlay={<Tooltip>{item}</Tooltip>} key={i}>
                <Button block>{item}</Button>
              </OverlayTrigger>
            );
          })
      }
      </Well>
    );
  }
});

var List = React.createClass({
  render: function() {
    var items = this.props.items;
    return (
      <ul>
        {
          items.map(function(item, i){
            return (
                <li key={i}>{item}</li>
            );
          })
        }
      </ul>
    );
  }
});

var Gallery = React.createClass({
  render: function() {
    var pictures = this.props.items.media;
    var masterid = this.props.items.masterid;
    return (
    <Carousel {...this.props}>
    {
      pictures.map(function(imageurl, i){
        var mediaurl= 'http://www.asknature.org/images/uploads/strategy/'+masterid+'/'+imageurl;
        console.log('Looking for image: '+mediaurl);
        return (
          <CarouselItem key={i}>
              <img alt="Image" src={mediaurl} />
              <div className="carousel-caption" />
          </CarouselItem>
        );
      })
    }
    </Carousel>
  );

  }
});
/** StrategyDetail class contains a search field that filters items in
* an unordered list in real time.
*/

var DetailComponent = React.createClass({

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
                <Col xs={12} md={12}>
                  <ButtonToolbar>
                    <Link url="../admin/phenomena"><Button><Glyphicon glyph="chevron-left" /> Phenomena Console</Button></Link>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12} md={12}>
                  <h3>{detail.name}</h3>
                  <p className="lead">{detail.description}</p>
                </Col>

              </Row>
              <Row className="show-grid">
                <Col xs={12} md={12}>
                    <h6>Legacy Data</h6>
                    <p>This information is all due for eventual deletion, but may be helpful during short-term migration.</p>
                    <Table striped responsive condensed hover>
                      <thead>
                        <tr>
                          <th>Field Name</th>
                          <th>Field Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>masterid</td>
                          <td>{detail.masterid}</td>
                        </tr>
                        <tr>
                          <td>name</td>
                          <td>{detail.name}</td>
                        </tr>
                        <tr>
                          <td>description</td>
                          <td>{detail.description}</td>
                        </tr>
                        <tr>
                          <td>short_name</td>
                          <td>{detail.short_name}</td>
                        </tr>
                        <tr>
                          <td>out_ChildOf (parent)</td>
                          <td>{detail.parent}</td>
                        </tr>
                        <tr>
                          <td>out_ChildOf.out_ChildOf (grandparent)</td>
                          <td>{detail.groupid}</td>
                        </tr>
                        <tr>
                          <td>in_ChildOf (children)</td>
                          <td><List items={detail.children} /></td>
                        </tr>
                        <tr>
                          <td>in_HasFunction</td>
                          <td><List items={detail.has_function} /></td>
                        </tr>

                      </tbody>
                    </Table>
                </Col>
              </Row>

            </Grid>
        </DefaultLayout>
        /* jshint ignore:end */
    );
  },
  componentWillReceiveProps: function () {
    this.setState(getState());
  },

  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
      this.setState(getState());
  }
});

module.exports = DetailComponent;
