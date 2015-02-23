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

var focusStore = require('../../stores/detail/sources');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/sources');

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
    var legacy_url = 'http://www.asknature.org/referenceMaterial/'+detail.masterid;
    return (
        /* jshint ignore:start */
        <DefaultLayout>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={12}>
                  <ButtonToolbar>
                    <Link url="../admin/sources"><Button><Glyphicon glyph="chevron-left" /> Sources Console</Button></Link>

                    <Button href={legacy_url} target="_blank" bsStyle="primary">View on legacy site</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12} md={6}>
                  <h3>{detail.name}</h3>
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
                          <td>secondary_title</td>
                          <td>{detail.secondary_title}</td>
                        </tr>
                        <tr>
                          <td>authors</td>
                          <td>{detail.authors}</td>
                        </tr>
                        <tr>
                          <td>author_address</td>
                          <td>{detail.author_address}</td>
                        </tr>
                        <tr>
                          <td>publication_year</td>
                          <td>{detail.publication_year}</td>
                        </tr>
                        <tr>
                          <td>publication_date</td>
                          <td>{detail.publication_date}</td>
                        </tr>
                        <tr>
                          <td>publisher</td>
                          <td>{detail.publisher}</td>
                        </tr>
                        <tr>
                          <td>pages</td>
                          <td>{detail.pages}</td>
                        </tr>
                        <tr>
                          <td>volume</td>
                          <td>{detail.volume}</td>
                        </tr>
                        <tr>
                          <td>number</td>
                          <td>{detail.number}</td>
                        </tr>
                        <tr>
                          <td>isbn</td>
                          <td>{detail.isbn}</td>
                        </tr>
                        <tr>
                          <td>accession_number</td>
                          <td>{detail.accession_number}</td>
                        </tr>
                        <tr>
                          <td>url</td>
                          <td><a href={detail.url} target="_blank">{detail.url}</a></td>
                        </tr>
                        <tr>
                          <td>notes</td>
                          <td>{detail.notes}</td>
                        </tr>
                        <tr>
                          <td>access_date</td>
                          <td>{detail.access_date}</td>
                        </tr>
                        <tr>
                          <td>abstract_excerpt</td>
                          <td>{detail.abstract_excerpt}</td>
                        </tr>
                        <tr>
                          <td>published_language</td>
                          <td>{detail.published_language}</td>
                        </tr>
                        <tr>
                          <td>type_of_work</td>
                          <td>{detail.type_of_work}</td>
                        </tr>
                        <tr>
                          <td>status</td>
                          <td>{detail.status}</td>
                        </tr>
                        <tr>
                          <td>type</td>
                          <td>{detail.type}</td>
                        </tr>
                        <tr>
                          <td>other_information</td>
                          <td>{detail.other_information}</td>
                        </tr>
                        <tr>
                          <td>keywords</td>
                          <td><List items={detail.keywords.split(',')} /></td>
                        </tr>
                        <tr>
                          <td>in_FeaturedIn</td>
                          <td><List items={detail.featured_in} /></td>
                        </tr>
                        <tr>
                          <td>in_Bookmarked</td>
                          <td><List items={detail.collected} /></td>
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

module.exports = StrategyDetail;
