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

var focusStore = require('../../stores/detail/strategies');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/strategies');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    details: focusStore.get()
  };
};

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
    var legacy_url = 'http://www.asknature.org/strategy/'+detail.masterid;
    return (
        /* jshint ignore:start */
        <DefaultLayout>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={12}>
                  <ButtonToolbar>
                    <Link url="../admin/strategies"><Button><Glyphicon glyph="chevron-left" /> Strategy Console</Button></Link>

                    <Button href={legacy_url} target="_blank" bsStyle="primary">View on legacy site</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12} md={6}>
                  <h3>{detail.name}</h3>
                  <p className="lead">{detail.description}</p>
                  <ButtonList items={detail.living_system} title="Living Systems"/>
                  <ButtonList items={detail.created_by} title="Created by"/>
                </Col>

                <Col xs={12} md={6}>
                  <Well bsSize="small">
                    <Gallery items={detail} />
                  </Well>
                </Col>
              </Row>
              <Row className="show-grid">
                  <Col xs={12} md={4}>
                      <ButtonList items={detail.conditions} title="Challenges"/>
                  </Col>
                  <Col xs={6} md={4}>
                      <ButtonList items={detail.mechanisms} title="Mechanisms"/>
                  </Col>
                  <Col xs={6} md={4}>
                    <ButtonList items={detail.outcomes} title="Outcomes"/>
                  </Col>
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
                  <Row className="show-grid">
                    <Col xs={12} md={6}>
                      <Well>
                        <h6>Application Ideas</h6>
                        <p dangerouslySetInnerHTML={{__html: detail.applications}} />
                          <ul>
                            <li dangerouslySetInnerHTML={{__html: detail.application_1}} />
                            <li dangerouslySetInnerHTML={{__html: detail.application_2}} />
                            <li dangerouslySetInnerHTML={{__html: detail.application_3}} />
                          </ul>
                        <h6>Application Sectors</h6>
                        <p dangerouslySetInnerHTML={{__html: detail.applications_sector}} />
                      </Well>
                    </Col>
                    <Col xs={12} md={6}>
                      <ButtonList items={detail.products} title="Inspired Solutions"/>
                    </Col>
                  </Row>
                  <Row className="show-grid">
                    <Col xs={12} md={6}>
                      <ButtonList items={detail.sources} title="Sources" />
                      <ButtonList items={detail.experts} title="Studied By" />
                    </Col>
                    <Col xs={12} md={6}>
                      <ButtonList items={detail.keywords.split(',')} title="Keywords -- Note: currently stored as a comma-delineated list" />
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
                              <td>description</td>
                              <td>{detail.description}</td>
                            </tr>
                            <tr>
                              <td>created_by</td>
                              <td>{detail.created_by}</td>
                            </tr>
                            <tr>
                              <td>entered_by</td>
                              <td>{detail.entered_by}</td>
                            </tr>
                            <tr>
                              <td>brief</td>
                              <td>{detail.brief}</td>
                            </tr>
                            <tr>
                              <td>special_text</td>
                              <td>{detail.special_text}</td>
                            </tr>
                            <tr>
                              <td>out_HasLivingSystem</td>
                              <td><List items={detail.living_system} /></td>
                            </tr>
                            <tr>
                              <td>out_HasFunction</td>
                              <td><List items={detail.outcomes} /></td>
                            </tr>
                            <tr>
                              <td>out_HasMechanism</td>
                              <td><List items={detail.mechanisms} /></td>
                            </tr>
                            <tr>
                              <td>out_HasConditions</td>
                              <td><List items={detail.conditions} /></td>
                            </tr>
                            <tr>
                              <td>in_InspiredBy</td>
                              <td><List items={detail.products} /></td>
                            </tr>
                            <tr>
                              <td>applications</td>
                              <td>{detail.applications}</td>
                            </tr>
                            <tr>
                              <td>application_1</td>
                              <td>{detail.application_1}</td>
                            </tr>
                            <tr>
                              <td>application_2</td>
                              <td>{detail.application_2}</td>
                            </tr>
                            <tr>
                              <td>application_3</td>
                              <td>{detail.application_3}</td>
                            </tr>
                            <tr>
                              <td>out_HasMedia</td>
                              <td><List items={detail.media} /></td>
                            </tr>
                            <tr>
                              <td>out_FeaturedIn</td>
                              <td><List items={detail.sources} /></td>
                            </tr>
                            <tr>
                              <td>in_StudiedBy</td>
                              <td><List items={detail.experts} /></td>
                            </tr>
                            <tr>
                              <td>in_Bookmarked</td>
                              <td><List items={detail.collectors} /></td>
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
                              <td>timestamp</td>
                              <td>{detail.timestamp}</td>
                            </tr>
                            <tr>
                              <td>date_entered</td>
                              <td>{detail.date_entered}</td>
                            </tr>
                            <tr>
                              <td>common_name</td>
                              <td>{detail.common_name}</td>
                            </tr>
                            <tr>
                              <td>scientific_name</td>
                              <td>{detail.scientific_name}</td>
                            </tr>
                            <tr>
                              <td>other_names</td>
                              <td>{detail.other_names}</td>
                            </tr>
                            <tr>
                              <td>additional_taxa</td>
                              <td>{detail.additional_taxa}</td>
                            </tr>
                            <tr>
                              <td>additional_functions</td>
                              <td>{detail.additional_functions}</td>
                            </tr>
                            <tr>
                              <td>additional_reference</td>
                              <td>{detail.additional_reference}</td>
                            </tr>
                            <tr>
                              <td>source</td>
                              <td>{detail.source}</td>
                            </tr>
                            <tr>
                              <td>source_citation</td>
                              <td>{detail.source_citation}</td>
                            </tr>
                            <tr>
                              <td>pages_of_excerpt</td>
                              <td>{detail.pages_of_excerpt}</td>
                            </tr>
                            <tr>
                              <td>image_file_name</td>
                              <td>{detail.image_file_name}</td>
                            </tr>
                            <tr>
                              <td>video_url</td>
                              <td><a href={detail.video_url} target="_blank">{detail.video_url}</a></td>
                            </tr>
                            <tr>
                              <td>pdf_file_name</td>
                              <td>{detail.pdf_file_name}</td>
                            </tr>
                            <tr>
                              <td>editor_comments</td>
                              <td>{detail.editor_comments}</td>
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
