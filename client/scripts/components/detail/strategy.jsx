/**
* Strategy detail (component)
*/
'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),
Hero = require('./common/hero.jsx'),
SubHero = require('./common/subhero.jsx'),
CreatorMast = require('./common/creatormast.jsx'),
AdminBar = require('./common/adminbar.jsx'),
TextArea = require('./common/textarea.jsx'),
ImageList = require('./common/imagelist.jsx'),
ButtonList = require('./common/edgelists.jsx'),
Gallery = require('./common/gallery.jsx'),

Label = require('react-bootstrap/Label'),
Col = require('react-bootstrap/Col'),
Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid'),
Table = require('react-bootstrap/Table'),
Input = require('react-bootstrap/Input');

var Scribe = require('../modules/scribe.jsx');
var TextField = require('../modules/textfield.jsx');

/** Gets incoming information from the store */

var focusStore = require('../../stores/detail/strategies');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/strategies');

// Store for user permissions
var userStore = require('../../stores/accounts');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    details: focusStore.get(),
    user: userStore.get()
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

var StrategyDetail = React.createClass({

  mixins: [focusStore.mixin, userStore.mixin],

  getInitialState: function() {
    return getState();
  },

  componentWillMount: function() {
    var id = window.location.pathname;
    focusActions.getItem(id);
    this.setState({editable: false});
  },

  componentDidMount: function(){

  },

  editBegin: function(e) {
      e.preventDefault();
      if(this.state.user.role == 'admin') { this.setState({editable: true}); }
  },

  editCancel: function(e) {
      e.preventDefault();
      var id = window.location.pathname;
      focusActions.getItem(id);
      this.setState({editable: false});
  },

  editFinish: function(e) {
      e.preventDefault();
      focusActions.saveStrategy(focusStore.get().results[0]);
      this.setState({editable: false});
  },

  render: function() {
    var routeName = 'strategy';
    var routeNamePlural = 'strategies';
    var entityName = 'Biological Strategy';
    var detail = this.state.details.results[0];
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
        <AdminBar masterid={detail.masterid} routename={routeName} pluralroute={routeNamePlural} entityname={entityName} />
        <CreatorMast img="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg" entityname={entityName} />
        <Hero items={detail} primarytitle={splitLegacyTitle[0]} secondarytitle={splitLegacyTitle[1]} secondarylink={secondaryLink} />
        <SubHero description={detail.description} editable={this.state.editable} store={focusStore} actions={focusActions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} />
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={4}>
              <ButtonList livingsystems items={{'taxon':detail.living_system_taxon, 'name':detail.living_system, 'id':detail.living_system_id}} routename="living-system" title="Living Systems"/>
              <ButtonList conditions items={{'name': detail.conditions}} title="Context" />
            </Col>
            <Col xs={6} sm={4}>
              <ButtonList phenomena items={{'name': detail.mechanisms,'id':detail.mechanisms_id}} routename="phenomenon" title="Mechanisms"/>
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
                  <TextArea title='Story' item={detail.brief} store={focusStore} actions={focusActions} fieldName={"brief"} editable={this.state.editable} />
                  <TextArea title='Citations' item={detail.special_text} store={focusStore} actions={focusActions} fieldName={"special_text"} editable={this.state.editable} />

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
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"name"} initialValue={detail.name} disableBlockMode={true} editable={this.state.editable} /></td>
                      </tr>
                      <tr>
                        <td>description</td>
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"description"} initialValue={detail.description} editable={this.state.editable} /></td>
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
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"brief"} initialValue={detail.brief} editable={this.state.editable} /></td>
                      </tr>
                      <tr>
                        <td>special_text</td>
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"special_text"} initialValue={detail.special_text} editable={this.state.editable} /></td>
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
                        <td>keywords</td>
                        <td><List items={detail.keywords.split(',')} /></td>
                      </tr>
                      <tr>
                        <td>in_InspiredBy</td>
                        <td><List items={detail.products} /></td>
                      </tr>
                      <tr>
                        <td>applications</td>
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"applications"} initialValue={detail.applications} editable={this.state.editable} /></td>
                      </tr>
                      <tr>
                        <td>application_1</td>
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"application_1"} initialValue={detail.application_1} editable={this.state.editable} /></td>
                      </tr>
                      <tr>
                        <td>application_2</td>
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"application_2"} initialValue={detail.application_2} editable={this.state.editable} /></td>
                      </tr>
                      <tr>
                        <td>application_3</td>
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"application_3"} initialValue={detail.application_3} editable={this.state.editable} /></td>
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
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"common_name"} initialValue={detail.common_name} editable={this.state.editable} /></td>
                      </tr>
                      <tr>
                        <td>scientific_name</td>
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"scientific_name"} initialValue={detail.scientific_name} editable={this.state.editable} /></td>
                      </tr>
                      <tr>
                        <td>other_names</td>
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"other_names"} initialValue={detail.other_names} editable={this.state.editable} /></td>
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
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"editor_comments"} initialValue={detail.editor_comments} editable={this.state.editable} /></td>
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
