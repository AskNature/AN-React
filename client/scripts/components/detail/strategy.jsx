/**
* Strategy detail (component)
*/
'use strict';

var React = require('react');

var Link = require('../modules/link.jsx');
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

var AdminButtons = React.createClass({
  render: function() {
    var masterid = this.props.masterid;
    var legacy_url = 'http://www.asknature.org/strategy/'+masterid;
    return (
      /* jshint ignore:start */
      <ButtonToolbar>
        <Link url="../admin/strategies"><Button bsSize="small"><Glyphicon glyph="chevron-left" /> Biological Strategies Console</Button></Link>
        <Button bsSize="small" href={legacy_url} target="_blank" bsStyle="primary">View on legacy site</Button>
      </ButtonToolbar>
      /* jshint ignore:end */
    );
  }
});

var Hero = React.createClass({
  render: function() {
    var detail = this.props.items;
    var masterid = detail.masterid;
    var legacy_url = 'http://www.asknature.org/strategy/'+masterid;
    var featuredimageurl = detail.media[0];
    var mediaurl;
    if(masterid) {
      mediaurl = 'http://www.asknature.org/images/uploads/strategy/'+masterid+'/'+featuredimageurl;
    } else {
      mediaurl = 'http://biomimicry.org/wp-content/uploads/2014/07/owlanrefresh_1-e1409954986739.jpeg';
    }
    var heroStyle = {
      backgroundImage: 'url(' + mediaurl + ')'
    };
    return (
      /* jshint ignore:start */
      <section className="hero" style={heroStyle}>
        <div className="texture-overlay"></div>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <Label bsStyle="primary" className="animated fadeInDown">Biological Strategy</Label>
            </Col>
          </Row>
          <Row className="headline">
            <Col xs={12} md={12}>
              <h3 className="animated fadeInDown">{detail.name}</h3>
            </Col>
          </Row>
        </Grid>
      </section>
      /* jshint ignore:end */
    );
  }
});

var LivingSystemList = React.createClass({
  render: function() {
    var compound = this.props.map;
    return (

          <tbody>
        {
          compound.name.map(function(item, i){
            var link = '../living-system/'+ compound.id[i];
            return (
              <tr href="#" key={i}>

                <td>{compound.taxon[i]}: <Link url={link}><i>{item}</i></Link></td>

                </tr>
            );
          })
        }
      </tbody>
    );
  }
});

var ButtonList = React.createClass({
  render: function() {
    var items = this.props.items;
    var title = this.props.title;
    if(this.props.map) {
      return (
        <div>
        <h6><strong>{title}</strong></h6>
        <Table striped condensed hover >
        <LivingSystemList {...this.props} />
        </Table>
      </div>
    );
    } else {
    return (
      <div>
      <h6><strong>{title}</strong></h6>
      <Table striped condensed hover>

          <tbody>
        {
          items.map(function(item, i){
            return (
              <tr href="#" key={i}>
                <td>{item}</td>
                </tr>
            );
          })
        }
      </tbody>
      </Table>
    </div>
    );
  }
  }
});

var LinkList = React.createClass({
  render: function() {
    var items = this.props.items;
    var title = this.props.title;
    var masterids = this.props.masterids;
    function clickhandler() {
      window.setInterval(function(){scrollTo(0, 0);},200);
    }
    return (
      <div>
      <h6><strong>{title}</strong></h6>
      <ListGroup>

        {
          items.map(function(item, i){
            var link = '../product/'+ masterids[i];
            var mediaurl = 'http://biomimicry.org/wp-content/uploads/2014/07/owlanrefresh_1-e1409954986739.jpeg';
            var heroStyle = {
              backgroundImage: 'url(' + mediaurl + ')'
            };
            return (
              <Link url={link}>
                <ListGroupItem className="minihero" style={heroStyle} key={i}>
                  <h6>{item}</h6>
              </ListGroupItem>
            </Link>
            );
          })
        }
    </ListGroup>
    </div>
    );
  }
});

var TextArea = React.createClass({
  render: function() {
    var item = this.props.item;
    var title = this.props.title;
    if(item){
      return (
        <div>
        <h6><strong>{title}</strong></h6>
        <p dangerouslySetInnerHTML={{__html: item}} />
        </div>
      );
    } else {
      return <div />;
    }

  }
});

var Gallery = React.createClass({
  render: function() {
    var detail = this.props.items;
    var masterid = detail.masterid;
    var pictures = detail.media;
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
    var livingSystemTaxon = detail.living_system_taxon;
    var livingSystemName = detail.living_system;
    var livingSystemId = detail.living_system_id;
    var livingSystemMap = {'taxon':livingSystemTaxon, 'name':livingSystemName, 'id':livingSystemId};
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
          <AdminButtons masterid={detail.masterid} className="pull-right" />
        </Panel>
        <Panel className="nomargin">
          <img src="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg" alt="Thumb" width="40px" height="40px" className="img-circle" />
          <span> <strong>Username</strong> contributed this <strong>Biological Strategy</strong> / 2 hours ago</span>
        </Panel>
        <Hero items={detail} />
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
              <ButtonList map={livingSystemMap} items={detail.living_system} title="Living Systems"/>
              <ButtonList items={detail.conditions} title="Context"/>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonList items={detail.mechanisms} title="Mechanisms"/>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonList items={detail.outcomes} title="Outcomes"/>
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
                      <li className="media">
                        <div className="media-left">
                          <a href="#">
                            <img src="https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png" alt="Thumb" width="30px" height="30px" className="img-circle media-object" />
                          </a>
                        </div>
                        <div className="media-body">
                          <p><a href="#"><strong>AskNature Staff </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_1}} /> <Label>Sector 1</Label></p>
                        </div>
                      </li>
                      <li className="media">
                        <div className="media-left">
                          <a href="#">
                            <img src="https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png" alt="Thumb" width="30px" height="30px" className="img-circle media-object" />
                          </a>
                        </div>
                        <div className="media-body">
                          <p><a href="#"><strong>AskNature Staff </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_2}} /> <Label>Sector 2</Label> <Label>Sector 3</Label></p>
                        </div>
                      </li>
                      <li className="media">
                        <div className="media-left">
                          <a href="#">
                            <img src="https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png" alt="Thumb" width="30px" height="30px" className="img-circle media-object" />
                          </a>
                        </div>
                        <div className="media-body">
                          <p><a href="#"><strong>AskNature Staff </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_3}} /> <Label>Sector 4</Label></p>
                        </div>
                      </li>
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
                  <LinkList items={detail.products} masterids={detail.product_masterid} title="Inspired Solutions"/>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12} sm={6}>
                  <ButtonList items={detail.sources} title="Sources" />
                </Col>
                <Col xs={12} sm={6}>
                  <ButtonList items={detail.experts} title="Studied By" />
                </Col>
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
                    <td>entered_by</td>
                    <td>{detail.entered_by}</td>
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
                </tbody>
              </Table>
              <ButtonList items={detail.collectors} title="Bookmarked By" />
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
