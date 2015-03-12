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

var Scribe = require('./common/scribe.jsx');
var TextField = require('./common/textfield.jsx');

/** Gets incoming information from the store */

var store = require('../../stores/strategy');

/** Sends outgoing requests to an action */

var actions = require('../../actions/strategy');

// Store for user permissions
var userStore = require('../../stores/accounts');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    item: store.get(),
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

  mixins: [store.mixin, userStore.mixin],

  getInitialState: function() {
    return getState();
  },

  componentWillMount: function() {
    var id = window.location.pathname;
    actions.getItem(id);
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
      actions.fetch(id);
      this.setState({editable: false});
  },

  editFinish: function(e) {
      e.preventDefault();
      actions.commit(); // TODO: update commit to do all fields when empty
      this.setState({editable: false});
  },

  render: function() {
    var routeName = 'strategy';
    var routeNamePlural = 'strategies';
    var entityName = 'Biological Strategy';
    var detail = this.state.item;
    var splitLegacyTitle = detail.name.split(': ');
    var secondaryLink = '../living-system/'+ detail.living_system[0].masterid;
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
        <SubHero description={detail.summary} editable={this.state.editable} store={store} actions={actions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} />
        <PanelGroup defaultActiveKey='1' accordion>
          <Panel header="More" eventKey='1'>
            <Grid>
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
                        <td><TextField store={focusStore} actions={focusActions} fieldName={"summary"} initialValue={detail.summary} editable={this.state.editable} /></td>
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
