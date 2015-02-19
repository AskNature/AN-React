/**
* Strategy detail (component)
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

var focusStore = require('../../stores/detail/products');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/products');

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
        var mediaurl= 'http://www.asknature.org/images/uploads/product/'+masterid+'/'+imageurl;
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

var Detail = React.createClass({

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
    var legacy_url = 'http://www.asknature.org/product/'+detail.masterid;
    return (
        /* jshint ignore:start */
        <DefaultLayout>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={12}>
                  <ButtonToolbar>
                    <Link url="../admin/products"><Button><Glyphicon glyph="chevron-left" /> Inspired Solutions Console</Button></Link>

                    <Button href={legacy_url} target="_blank" bsStyle="primary">View on legacy site</Button>
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
                          <td>name</td>
                          <td>{detail.name}</td>
                        </tr>
                        <tr>
                          <td>headline</td>
                          <td>{detail.description}</td>
                        </tr>
                        <tr>
                          <td>InspiredBy</td>
                          <td><List items={detail.inspiredby} /></td>
                        </tr>
                        <tr>
                          <td>keywords</td>
                          <td><List items={detail.keywords.split(',')} /></td>
                        </tr>
                        <tr>
                          <td>special_text</td>
                          <td>{detail.special_text}</td>
                        </tr>
                        <tr>
                          <td>challenges_solved</td>
                          <td>{detail.challenges_solved}</td>
                        </tr>
                        <tr>
                          <td>how_is_it_different</td>
                          <td>{detail.how_is_it_different}</td>
                        </tr>
                        <tr>
                          <td>biomimicry_story</td>
                          <td>{detail.biomimicry_story}</td>
                        </tr>

                        <tr>
                          <td>company</td>
                          <td>{detail.company}</td>
                        </tr>
                        <tr>
                          <td>company_website</td>
                          <td><a href={detail.company_website} target="_blank">{detail.company_website}</a></td>
                        </tr>
                        <tr>
                          <td>phase</td>
                          <td>{detail.phase}</td>
                        </tr>
                        <tr>
                          <td>patent_name</td>
                          <td>{detail.patent_name}</td>
                        </tr>
                        <tr>
                          <td>patent_number</td>
                          <td>{detail.patent_number}</td>
                        </tr>
                        <tr>
                          <td>consumer_products</td>
                          <td>{detail.consumer_products}</td>
                        </tr>
                        <tr>
                          <td>product_type</td>
                          <td>{detail.product_type}</td>
                        </tr>
                        <tr>
                          <td>availability</td>
                          <td>{detail.availability}</td>
                        </tr>
                        <tr>
                          <td>strategy</td>
                          <td>{detail.strategy}</td>
                        </tr>

                        <tr>
                          <td>masterid</td>
                          <td>{detail.masterid}</td>
                        </tr>
                        <tr>
                          <td>status</td>
                          <td>{detail.status}</td>
                        </tr>
                        <tr>
                          <td>revision</td>
                          <td>{detail.revision}</td>
                        </tr>
                        <tr>
                          <td>timestamp</td>
                          <td>{detail.timestamp}</td>
                        </tr>
                        <tr>
                          <td>media</td>
                          <td><List items={detail.media} /></td>
                        </tr>
                        <tr>
                          <td>StudiedBy</td>
                          <td><List items={detail.researchers} /></td>
                        </tr>
                        <tr>
                          <td>FeaturedIn</td>
                          <td><List items={detail.sources} /></td>
                        </tr>
                        <tr>
                          <td>Bookmarked</td>
                          <td><List items={detail.collectors} /></td>
                        </tr>
                        <tr>
                          <td>HasFunction</td>
                          <td><List items={detail.outcomes} /></td>
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

module.exports = Detail;
