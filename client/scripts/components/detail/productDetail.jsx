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
    error: store.getError()
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

var ProductDetail = React.createClass({

  mixins: [store.mixin],

  getInitialState: function() {
        return ({
            object: store.get(),
            editable: !this.props.masterid ? true : false,
            loaded: store.getLoaded(),
            masterid: this.props.masterid
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
      console.log(field + " added " + addedValue);
      actions.addRelationship(field, addedValue);
  },
  onRelationshipRemove: function(field, removedValue) {
      console.log(field + " removed " + removedValue);
      actions.removeRelationship(field, removedValue);
  },
  toggleEditable: function() {
      this.setState({editable: !this.state.editable});
  },
  editBegin: function(e) {
      e.preventDefault();
      //if(this.state.user.role == 'admin') { this.setState({editable: true}); }
      this.setState({editable: true});
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
      var r = confirm("Do you really want to delete this record?");
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
        <Hero editable={this.state.editable} media={detail.media} primarytitle={detail.description} secondarytitle={detail.name} secondarylink='' masterid={this.state.masterid} />
        <SubHero first='Concept' description={detail.company} descriptionlink={detail.company_website} editable={this.state.editable} store={store} actions={actions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} onDelete={this.onDelete}/>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={4}>
              <ButtonList items={detail.designedsystems} title="Designed Systems" />
              <ButtonList conditions items={detail.conditions} title="Context" />
            </Col>
            <Col xs={6} sm={4}>
              <ButtonList mechanisms items={detail.mechanisms} title="Mechanisms"/>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonList phenomena items={detail.outcomes} routename="phenomenon" title="Outcomes"/>
            </Col>
            <Col xs={12} sm={8}>
              <RelationshipList items={detail.strategies} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, "strategies")} onRemove={this.onRelationshipRemove.bind(null, "strategies")} field={"strategies"} routename="strategy" title="Inspired By" fieldName="Biological Strategy" />
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

                  <TextArea title='Summary' item={detail.special_text} />
                  <TextArea title='Inspiration' item={detail.biomimicry_story} />
                  <TextArea title='Market Advantage' item={detail.how_is_it_different} />
                  <TextArea title='Challenges Solved' item={detail.challenges_solved} />
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
                          <td>{detail.name}</td>
                        </tr>
                        <tr>
                          <td>headline</td>
                          <td>{detail.description}</td>
                        </tr>
                        <tr>
                          <td>InspiredBy</td>
                          <td><List items={detail.strategies} /></td>
                        </tr>
                        <tr>
                          <td>keywords</td>
                          <td><List items={detail.keywords.split(',')} /></td>
                        </tr>
                        <tr>
                          <td>special_text</td>
                          <td>{detail.special_text}</td>
                        </tr>
                        <tr>
                          <td>challenges_solved</td>
                          <td>{detail.challenges_solved}</td>
                        </tr>
                        <tr>
                          <td>how_is_it_different</td>
                          <td>{detail.how_is_it_different}</td>
                        </tr>
                        <tr>
                          <td>biomimicry_story</td>
                          <td>{detail.biomimicry_story}</td>
                        </tr>

                        <tr>
                          <td>company</td>
                          <td>{detail.company}</td>
                        </tr>
                        <tr>
                          <td>company_website</td>
                          <td><a href={detail.company_website} target="_blank">{detail.company_website}</a></td>
                        </tr>
                        <tr>
                          <td>phase</td>
                          <td>{detail.phase}</td>
                        </tr>
                        <tr>
                          <td>patent_name</td>
                          <td>{detail.patent_name}</td>
                        </tr>
                        <tr>
                          <td>patent_number</td>
                          <td>{detail.patent_number}</td>
                        </tr>
                        <tr>
                          <td>consumer_products</td>
                          <td>{detail.consumer_products}</td>
                        </tr>
                        <tr>
                          <td>product_type</td>
                          <td>{detail.product_type}</td>
                        </tr>
                        <tr>
                          <td>availability</td>
                          <td>{detail.availability}</td>
                        </tr>
                        <tr>
                          <td>strategy</td>
                          <td>{detail.strategy}</td>
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
                          <td>revision</td>
                          <td>{detail.revision}</td>
                        </tr>
                        <tr>
                          <td>timestamp</td>
                          <td>{detail.timestamp}</td>
                        </tr>
                        <tr>
                          <td>media</td>
                          <td><List items={detail.media} /></td>
                        </tr>
                        <tr>
                          <td>StudiedBy</td>
                          <td><List items={detail.researchers} /></td>
                        </tr>
                        <tr>
                          <td>FeaturedIn</td>
                          <td><List items={detail.sources} /></td>
                        </tr>
                        <tr>
                          <td>Bookmarked</td>
                          <td><List items={detail.collectors} /></td>
                        </tr>
                        <tr>
                          <td>HasFunction</td>
                          <td><List items={detail.outcomes} /></td>
                        </tr>
                      </tbody>
                    </Table>
                </Col>
              </Row>
            </Grid>
          </Panel>
        </PanelGroup>
	</div>
        /* jshint ignore:end */
    );
  },
  componentWillReceiveProps: function () {
    this.setState(getState());
  }
});

module.exports = ProductDetail;
