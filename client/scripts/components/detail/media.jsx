/**
* Media detail (component)
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

var focusStore = require('../../stores/detail/media');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/media');

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
    var legacy_url = 'http://www.asknature.org/media/image/'+detail.id;
    var image_url = 'http://www.asknature.org/images/uploads/'+detail.entity+'/'+detail.masterid+'/'+detail.filename;
    return (
        /* jshint ignore:start */
        <DefaultLayout>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={12}>
                  <ButtonToolbar>
                    <Link url="../admin/media"><Button><Glyphicon glyph="chevron-left" /> Media Console</Button></Link>

                    <Button href={legacy_url} target="_blank" bsStyle="primary">View on legacy site</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12} sm={6}>
                  <h3>{detail.name}</h3>
                </Col>

                <Col xs={12} sm={6}>
                  <Well bsSize="small">
                    <img className='img-responsive' src={image_url} />
                  </Well>
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
                          <td>filename</td>
                          <td>{detail.filename}</td>
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
                          <td>keywords</td>
                          <td><List items={detail.keywords.split(',')} /></td>
                        </tr>
                        <tr>
                          <td>in_HasMedia</td>
                          <td><List items={detail.has_media} /></td>
                        </tr>
                        <tr>
                          <td>in_AddedMedia</td>
                          <td><List items={detail.added_media} /></td>
                        </tr>
                        <tr>
                          <td>entity</td>
                          <td>{detail.entity}</td>
                        </tr>
                        <tr>
                          <td>masterid</td>
                          <td>{detail.masterid}</td>
                        </tr>
                        <tr>
                          <td>mime_type</td>
                          <td>{detail.mime_type}</td>
                        </tr>
                        <tr>
                          <td>file_type_id</td>
                          <td>{detail.file_type_id}</td>
                        </tr>
                        <tr>
                          <td>license_id</td>
                          <td>{detail.license_id}</td>
                        </tr>
                        <tr>
                          <td>author</td>
                          <td>{detail.author}</td>
                        </tr>
                        <tr>
                          <td>author_url</td>
                          <td><a href={detail.author_url} target="_blank">{detail.author_url}</a></td>
                        </tr>
                        <tr>
                          <td>source</td>
                          <td>{detail.source}</td>
                        </tr>
                        <tr>
                          <td>source_url</td>
                          <td><a href={detail.source_url} target="_blank">{detail.source_url}</a></td>
                        </tr>
                        <tr>
                          <td>timestamp</td>
                          <td>{detail.timestamp}</td>
                        </tr>
                        <tr>
                          <td>deleted</td>
                          <td>{detail.deleted}</td>
                        </tr>
                        <tr>
                          <td>featured</td>
                          <td>{detail.featured}</td>
                        </tr>
                        <tr>
                          <td>popup</td>
                          <td>{detail.popup}</td>
                        </tr>
                        <tr>
                          <td>sort_order</td>
                          <td>{detail.sort_order}</td>
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
