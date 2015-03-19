'use strict';

var React = require('react');

var TextArea = require('./common/textarea.jsx');
var DataTable = require('./common/datatable.jsx');
var RelationshipList = require('./common/relationshiplist.jsx');

var CreatorMast = require('./common/creatormast.jsx'),
AdminBar = require('./common/adminbar.jsx'),
Hero = require('./common/hero.jsx'),
SubHero = require('./common/subhero.jsx'),
ButtonList = require('./common/edgelists.jsx'),
Gallery = require('./common/gallery.jsx');

var Panel = require('react-bootstrap').Panel,
PanelGroup = require('react-bootstrap').PanelGroup,
Row = require('react-bootstrap').Row,
Label = require('react-bootstrap').Label,
Grid = require('react-bootstrap').Grid,
Col = require('react-bootstrap').Col;

/** Gets incoming information from the store */

var store = require('../../stores/phenomenon');
var userStore = require('../../stores/accounts');

/** Sends outgoing requests to an action */

var actions = require('../../actions/phenomenon');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
    return (
    {
	object: store.get(),
	loaded: store.getLoaded(),
	error: store.getError(),
    user: userStore.get()
    }
    );
};

var DetailComponent = React.createClass({
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
  componentDidMount: function() {
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
    var detail = this.state.object;
    var routeName = 'phenomenon';
    var routeNamePlural = 'phenomena';
    var entityName = 'Phenomenon';
    var secondaryTitle;
    if(detail.groupname) {
      secondaryTitle = detail.groupname + ' > ';
    }
    if(detail.parent) {
      secondaryTitle += detail.parent + ' > ';
    }
    secondaryTitle += detail.name;
    return (
        /* jshint ignore:start */
        <div>
          <AdminBar masterid={detail.masterid} routename={routeName} pluralroute={routeNamePlural} entityname={entityName} />
          <CreatorMast img="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg" entityname={entityName} />
          <Hero media={detail.media} primarytitle={detail.name} secondarytitle={secondaryTitle} />
          <SubHero description='This is a placeholder for where a short description will go.' />
          <Grid>
            <Row className="show-grid">
              <Col xs={12} sm={4}>
                <RelationshipList
                  items={this.state.object.parent}
                  editable={this.state.editable}
                  titleField='name'
                  onAdd={this.onRelationshipAdd.bind(null, 'parent')}
                  onRemove={this.onRelationshipRemove.bind(null, 'parent')}
                  field={'parent'}
                  routeName={'phenomenon'}
                  title={'Parent Phenomenon'}
                  fieldName={'Parent Phenomenon'}/>
                  <RelationshipList
                    items={this.state.object.children}
                    editable={this.state.editable}
                    titleField='name'
                    onAdd={this.onRelationshipAdd.bind(null, 'children')}
                    onRemove={this.onRelationshipRemove.bind(null, 'children')}
                    field={'children'}
                    routeName={'phenomenon'}
                    title={'Child Phenomena'}
                    fieldName={'Child Phenomena'}/>
              </Col>
              <Col xs={12} sm={4}>
                <RelationshipList
                  items={this.state.object.mechanism}
                  editable={this.state.editable}
                  titleField='name'
                  onAdd={this.onRelationshipAdd.bind(null, 'mechanism')}
                  onRemove={this.onRelationshipRemove.bind(null, 'mechanism')}
                  field={'mechanism'}
                  routeName={null}
                  title={'Listed as a Mechanism in'}
                  fieldName={'Listed as a Mechanism in'}/>

              </Col>
              <Col xs={12} sm={4}>

                <RelationshipList
                  items={this.state.object.outcome}
                  editable={this.state.editable}
                  titleField='name'
                  onAdd={this.onRelationshipAdd.bind(null, 'outcome')}
                  onRemove={this.onRelationshipRemove.bind(null, 'outcome')}
                  field={'outcome'}
                  routeName={null}
                  title={'Listed as an Outcome in'}
                  fieldName={'Listed as an Outcome in'}/>
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
  }

});

module.exports = DetailComponent;
