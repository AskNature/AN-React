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

var focusStore = require('../../stores/detail/users');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/users');

// Store for user permissions
var userStore = require('../../stores/accounts');
/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    details: focusStore.get()
  };
};

/** StrategyDetail class contains a search field that filters items in
* an unordered list in real time.
*/

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
    var routeName = 'user';
    var routeNamePlural = 'users';
    var entityName = 'Users';
    var detail = this.state.details.results[0];
    var legacy_url = 'http://www.asknature.org/user/'+detail.masterid;
    var avatar = 'http://www.asknature.org/images/uploads/user/'+detail.masterid+'/avatar/lg_avatar.jpg';
    return (
        /* jshint ignore:start */
        <DefaultLayout>
          <AdminBar masterid={detail.masterid} routename={routeName} pluralroute={routeNamePlural} entityname={entityName} />
          <Hero items={detail} primarytitle={detail.first+' '+detail.last} secondarytitle={detail.name} innerimage={avatar} />
          <SubHero description={detail.special_text} editable={this.state.editable} store={focusStore} actions={focusActions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} />

            <PanelGroup defaultActiveKey='1' accordion>
              <Panel header="More" eventKey='1'>
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <Gallery items={detail} />
                    </Col>
                  </Row>

                  <Row className="show-grid">
                    {detail.friends[0] ? (
                      <Col xs={12} sm={6}>
                        <ButtonList friends items={{'name':detail.friends}} routename="user" title="Friends" />
                      </Col>) : ''
                    }
                    {detail.added_media[0] ? (
                      <Col xs={12} sm={6}>
                        <ButtonList friends items={{'name':detail.added_media}} routename="media" title={'Media by ' + detail.first} />
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
