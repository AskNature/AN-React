/**
* Product detail (component)
*/
'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),
Hero = require('./common/hero.jsx'),
SubHero = require('./common/subhero.jsx'),
AdminBar = require('./common/adminbar.jsx'),
CreatorMast = require('./common/creatormast.jsx'),
TextArea = require('./common/textarea.jsx'),
DataTable = require('./common/datatable.jsx'),
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

var RelationshipList = require('./common/relationshiplist.jsx');

/** Gets incoming information from the store */

var store = require('../../stores/product');
var userStore = require('../../stores/accounts');

/** Sends outgoing requests to an action */

var actions = require('../../actions/product');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    object: store.get(),
    loaded: store.getLoaded(),
    error: store.getError(),
    user: userStore.get()
  };
};

var ProductDetail = React.createClass({

  mixins: [store.mixin],

  getInitialState: function() {
        return ({
            object: store.get(),
            editable: !this.props.masterid ? true : false,
            loaded: store.getLoaded(),
            masterid: this.props.masterid,
            user: userStore.get()
        });
  },

  componentDidMount: function(){
        if(this.props.masterid) {
            actions.fetch(this.props.masterid);
        } else {
            actions.create();
        }
  },
  _onChange: function() {
      this.setState(getState());
  },
  onRelationshipAdd: function(field, addedValue) {
      console.log(field + ' added ' + addedValue);
      actions.addRelationship(field, addedValue);
  },
  onRelationshipRemove: function(field, removedValue) {
      console.log(field + ' removed ' + removedValue);
      actions.removeRelationship(field, removedValue);
  },
  toggleEditable: function() {
      this.setState({editable: !this.state.editable});
  },
  editBegin: function(e) {
      e.preventDefault();
      if(this.state.user.role === 'admin') { this.setState({editable: true}); }
  },
  editCancel: function(e) {
      e.preventDefault();
      actions.fetch(this.props.masterid);
      this.setState({editable: false});
  },
  editFinish: function(e) {
      e.preventDefault();
      actions.commit();
      this.setState({editable: false});
  },
  onDelete: function() {
      var r = confirm('Do you really want to delete this record?');
      if(r) {actions.del(this.props.masterid);}
  },
  render: function() {
    var routeName = 'product';
    var routeNamePlural = 'products';
    var entityName = 'Inspired Solution';
    var detail = this.state.object;
    var descriptionTitle = '<a href="' + detail.company_website + '" target="_blank">' + detail.company + '</a>';
    return (
      /* jshint ignore:start */
        <div>
	<AdminBar masterid={detail.masterid} routename={routeName} pluralroute={routeNamePlural} entityname={entityName} />
        <CreatorMast img="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg" entityname={entityName} />
        <Hero editable={this.state.editable} store={store} actions={actions} media={detail.media} primarytitle={detail.headline} secondarytitle={detail.name} secondarylink='' masterid={this.state.masterid} primarytitlefield={"headline"} />
        <SubHero first='Concept' description={detail.company} descriptionlink={detail.company_website} editable={this.state.editable} store={store} actions={actions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} onDelete={this.onDelete}/>
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} sm={4}>
              <RelationshipList items={detail.designedsystems} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, 'designedsystems')} onRemove={this.onRelationshipRemove.bind(null, 'designedsystems')} field={'designedsystems'} routeName='design' title='Designed Systems' fieldName='Designed System' titleField={'name'} />
              <RelationshipList items={detail.conditions} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, 'conditions')} onRemove={this.onRelationshipRemove.bind(null, 'conditions')} field={'conditions'} routeName='condition' title='Context' fieldName='Context' titleField={'name'} />
            </Col>
            <Col xs={6} sm={4}>
              <RelationshipList items={detail.mechanisms} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, 'mechanisms')} onRemove={this.onRelationshipRemove.bind(null, 'mechanisms')} field={'mechanisms'} routeName='FM' title='Mechanisms' fieldName='Mechanism' titleField={'name'} />
            </Col>
            <Col xs={6} sm={4}>
              <RelationshipList items={detail.outcomes} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, 'outcomes')} onRemove={this.onRelationshipRemove.bind(null, 'outcomes')} field={'outcomes'} routeName='FM' title='Outcomes' fieldName='Outcome' titleField={'name'} />
            </Col>
            <Col xs={12} sm={8}>
              <RelationshipList items={detail.strategies} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, 'strategies')} onRemove={this.onRelationshipRemove.bind(null, 'strategies')} field={'strategies'} routeName='strategy' title='Inspired By' fieldName='Biological Strategy' titleField={'name'} />
            </Col>
          </Row>
        </Grid>
            <Grid>
              <Row>
                <Col xs={12}>
                  <Gallery items={detail} />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  {detail.special_text || this.state.editable ? (
                  <TextArea title='Summary' item={detail.special_text} store={store} actions={actions} fieldName={'special_text'} editable={this.state.editable}/>
                  ) : '' }
                  {detail.biomimicry_story || this.state.editable ? (
                  <TextArea title='Inspiration' item={detail.biomimicry_story} store={store} actions={actions} fieldName={'biomimicry_story'} editable={this.state.editable}/>
                  ) : '' }
                  {detail.how_is_it_different || this.state.editable ? (
                  <TextArea title='Market Advantage' item={detail.how_is_it_different} store={store} actions={actions} fieldName={'how_is_it_different'} editable={this.state.editable}/>
                  ) : '' }
                  {detail.challenges_solved || this.state.editable ? (
                  <TextArea title='Challenges Solved' item={detail.challenges_solved} store={store} actions={actions} fieldName={'challenges_solved'} editable={this.state.editable}/>
                    ) : '' }

                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <RelationshipList
                    items={this.state.object.sources}
                    titleField='name'
                    subtitleField='authors'
                    onAdd={this.onRelationshipAdd.bind(null, 'sources')}
                    onRemove={this.onRelationshipRemove.bind(null, 'sources')}
                    field={'sources'}
                    routeName={'source'}
                    title={'Sources'}
                    fieldName={'Sources'}/>
                  </Col>
                  <Col xs={12} sm={6}>
                    <RelationshipList
                      items={this.state.object.experts}
                      editable={this.state.editable}
                      titleField='name'
                      subtitleField='institution'
                      onAdd={this.onRelationshipAdd.bind(null, 'experts')}
                      onRemove={this.onRelationshipRemove.bind(null, 'experts')}
                      field={'experts'}
                      routeName={'researcher'}
                      title={'Researched By'}
                      fieldName={'Researched By'}/>
                    </Col>
                </Row>
            </Grid>
            {this.state.user.role == 'admin' || 'editor' ? (
                      <PanelGroup defaultActiveKey='0' accordion>
                          <Panel header='Table View' eventKey='1'>
                              <DataTable data={detail} />
                          </Panel>
                      </PanelGroup>
                  ) : '' }
	</div>
        /* jshint ignore:end */
    );
  },
  componentWillReceiveProps: function () {
    this.setState(getState());
  }
});

module.exports = ProductDetail;
