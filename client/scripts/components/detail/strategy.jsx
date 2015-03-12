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
DataTable = require('./common/datatable.jsx'),

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

/** Temp vars for Scott's in-progress store and action files */

var scottStore = require('../../stores/strategy');
var scottActions = require('../../actions/strategy');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    details: focusStore.get(),
    user: userStore.get(),
    scott_object: scottStore.get()
  };
};

var StrategyDetail = React.createClass({

  mixins: [focusStore.mixin, userStore.mixin, scottStore.mixin],

  getInitialState: function() {
    return (
      {
        details: focusStore.get(),
        user: userStore.get(),
        scott_object: scottStore.get(),
      editable: false
      }
    );
  },

  componentWillMount: function() {
    var id = window.location.pathname;
    focusActions.getItem(id);
    scottActions.fetch(id);
    this.setState({editable: false});
  },

  componentDidMount: function(){

  },

  editBegin: function(e) {
      e.preventDefault();
      if(this.state.user.role != 'admin') { this.setState({editable: true}); }
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
    console.log(detail);
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <AdminBar masterid={detail.masterid} routename={routeName} pluralroute={routeNamePlural} entityname={entityName} />
        <CreatorMast userid={detail.addedby_id} displayname={detail.addedby_first+' '+detail.addedby_last} timestamp={detail.timestamp} entityname={entityName} />
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
                  <DataTable data={detail} editable={this.state.editable} store={focusStore} actions={focusActions} />
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
