/**
* Strategy detail (component)
*/
'use strict';

var React = require('react');

var Link = require('../modules/link.jsx'),
Hero = require('./common/hero.jsx'),
AdminBar = require('./common/adminbar.jsx'),
TextArea = require('./common/textarea.jsx'),
ImageList = require('./common/imagelist.jsx'),
ButtonList = require('./common/edgelists.jsx');

var Col = require('react-bootstrap/Col'),
Well = require('react-bootstrap/Well'),
Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),
Button = require('react-bootstrap/Button'),
ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
ButtonGroup = require('react-bootstrap/ButtonGroup'),
Nav = require('react-bootstrap/Nav'),
NavItem = require('react-bootstrap/NavItem'),
Label = require('react-bootstrap/Label'),
OverlayTrigger = require('react-bootstrap/OverlayTrigger'),
Tooltip = require('react-bootstrap/Tooltip'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid'),
Glyphicon = require('react-bootstrap/Glyphicon'),
Carousel = require('react-bootstrap/Carousel'),
CarouselItem = require('react-bootstrap/CarouselItem'),
ListGroupItem = require('react-bootstrap/ListGroupItem'),
ListGroup = require('react-bootstrap/ListGroup'),
Table = require('react-bootstrap/Table'),
Input = require('react-bootstrap/Input');

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



var Gallery = React.createClass({
  render: function() {
    var detail = this.props.items;
    var masterid = detail.masterid;
    var pictures = detail.media;
    var picturenames = detail.media_name;
    return (
      <Carousel {...this.props}>
        {
          pictures.map(function(imageurl, i){
            var mediaurl;
            if(masterid) {
              mediaurl = 'http://www.asknature.org/images/uploads/strategy/'+masterid+'/'+imageurl;
            } else {
              mediaurl = 'http://biomimicry.org/wp-content/uploads/2014/07/owlanrefresh_1-e1409954986739.jpeg';
            }
            var imgStyle = {
              backgroundImage: 'url(' + mediaurl + ')'
            };
            return (
              <CarouselItem key={i}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip><strong>{picturenames[i]}</strong></Tooltip>}>
                  <div className="image-bg" style={imgStyle} />
                </OverlayTrigger>
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
    var routeName = 'strategy';
    var entityName = 'Biological Strategy';
    var detail = this.state.details.results[0];
    var legacy_url = 'http://www.asknature.org/strategy/'+detail.masterid;
    var splitLegacyTitle = detail.name.split(': ');
    var secondaryLink = '../living-system/'+ detail.living_system_id[0];
    var renderedInstance;
    function handleSelect (selectedKey) {
      renderedInstance.setProps({
        activeKey: selectedKey
      });
    }
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <Panel className="nomargin bgTexture">
          <AdminBar masterid={detail.masterid} routename={routeName} entityname={entityName} />
        </Panel>
        <Panel className="nomargin">
          <img src="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg" alt="Thumb" width="40px" height="40px" className="img-circle" />
          <span> <Link url="#"><strong>AskNature Team</strong></Link> contributed this <strong>{entityName}</strong> / 2 hours ago</span>
        </Panel>
        <Hero items={detail} primarytitle={splitLegacyTitle[0]} secondarytitle={splitLegacyTitle[1]} secondarylink={secondaryLink} />
        <Grid>
          <Row>
            <Col xs={12} sm={8}>
              <h5 className="lead">{detail.description}</h5>
            </Col>
            <Col xs={12} sm={4}>
              <Nav bsStyle="pills">
                <NavItem>
                  <Glyphicon glyph="pencil" />
                </NavItem>
                <NavItem>
                  <Glyphicon glyph="share-alt" />
                </NavItem>
                <NavItem>
                  <Glyphicon glyph="print" />
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} sm={4}>
              <ButtonList livingsystems items={{'taxon':detail.living_system_taxon, 'name':detail.living_system, 'id':detail.living_system_id}} routename="living-system" title="Living Systems"/>
              <ButtonList conditions items={{'name': detail.conditions}} title="Context" />
            </Col>
            <Col xs={6} sm={4}>
              <ButtonList mechanisms items={{'name': detail.mechanisms}} title="Mechanisms"/>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonList phenomena items={{'name':detail.outcomes,'id':detail.outcomes_id}} routename="phenomenon" title="Outcomes"/>
            </Col>
          </Row>
        </Grid>
        <PanelGroup defaultActiveKey='1' accordion>
          <Panel header="More" eventKey='1'>
            <Grid>
              <Row>
                <Col xs={12}>
                  <Gallery items={detail} />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <TextArea title='Story' item={detail.brief} />
                  <TextArea title='Citations' item={detail.special_text} />

                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12} sm={6}>

                  <h6><strong>Your Inspired Ideas</strong></h6>

                  <ul className="media-list">
                    {detail.application_1 ? (
                      <li className="media">
                        <div className="media-left">
                          <a href="#">
                            <img src="https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png" alt="Thumb" width="30px" height="30px" className="img-circle media-object" />
                          </a>
                        </div>
                        <div className="media-body">
                          <p><a href="#"><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_1}} /> <Label>Sector 1</Label></p>
                        </div>
                      </li>) : ''
                    }
                    {detail.application_2 ? (
                      <li className="media">
                        <div className="media-left">
                          <a href="#">
                            <img src="https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png" alt="Thumb" width="30px" height="30px" className="img-circle media-object" />
                          </a>
                        </div>
                        <div className="media-body">
                          <p><a href="#"><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_2}} /> <Label>Sector 2</Label> <Label>Sector 3</Label></p>
                        </div>
                      </li>) : ''
                    }
                    {detail.application_3 ? (
                      <li className="media">
                        <div className="media-left">
                          <a href="#">
                            <img src="https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png" alt="Thumb" width="30px" height="30px" className="img-circle media-object" />
                          </a>
                        </div>
                        <div className="media-body">
                          <p><a href="#"><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_3}} /> <Label>Sector 4</Label> <Label>Sector 3</Label></p>
                        </div>
                      </li>) : ''
                    }
                    <li className="media">
                      <div className="media-left">
                        <a href="#">
                          <img src="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg" alt="Thumb" width="30px" height="30px" className="img-circle media-object" />
                        </a>
                      </div>
                      <div className="media-body">
                        <form>
                          <Input type="text" className="input-sm" placeholder="Share Your Idea..." />
                        </form>
                      </div>
                    </li>
                  </ul>

                </Col>
                <Col xs={12} sm={6}>
                  <ImageList items={{'name':detail.products,'id':detail.product_masterid}} routename="product" title="Inspired Solutions"/>
                </Col>
              </Row>
              <Row className="show-grid">
                {detail.sources[0] ? (
                  <Col xs={12} sm={6}>
                    <ButtonList sources items={{'year':detail.sources_year, 'name':detail.sources, 'authors':detail.sources_authors, 'id':detail.sources_id}} routename="source" title="Sources" />
                  </Col>) : ''
                }
                {detail.experts[0] ? (
                  <Col xs={12} sm={6}>
                    <ButtonList experts items={{'name':detail.experts}} routename="researcher" title="Studied By" />
                  </Col>) : ''
                }
              </Row>
            </Grid>
          </Panel>
          <Panel header="Table View" eventKey="2">
            <Grid>
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
          </Panel>
        </PanelGroup>
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
