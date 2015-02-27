/**
* Phenomenon detail (component)
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


var DefaultLayout = require('../layouts/default.jsx');


/** Gets incoming information from the store */

var focusStore = require('../../stores/detail/phenomena');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/phenomena');

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

var DetailComponent = React.createClass({

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
        <DefaultLayout>
          <AdminBar masterid={detail.masterid} routename={routeName} pluralroute={routeNamePlural} entityname={entityName} />
          <CreatorMast img="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg" entityname={entityName} />
          <Hero items={detail} primarytitle={detail.name} secondarytitle={secondaryTitle} />
          <SubHero description='This is a placeholder for where a short description will go.' />
          <Grid>
            <Row className="show-grid">
              <Col xs={12} sm={4}>
                <ButtonList items={{'name': detail.parent}} title="Parent Phenomenon" />
                <ButtonList items={{'name': detail.children}} title="Child Phenomena" />
              </Col>
              <Col xs={12} sm={4}>

                  Listed as a <strong>Mechanism</strong> in <strong>XX</strong> items.
                    <Button block><Glyphicon glyph="search" /> <Label>XX</Label></Button>
                    <Button block>Connect your content</Button>

              </Col>
              <Col xs={12} sm={4}>

                  Listed as an <strong>Outcome</strong> in <strong>YY</strong> items.
                    <Button block><Glyphicon glyph="search" /> <Label>YY</Label></Button>
                    <Button block>Connect your content</Button>

              </Col>
            </Row>
          </Grid>
          <PanelGroup defaultActiveKey='2' accordion>
            <Panel header="More" eventKey='1'>

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
                          <td>name</td>
                          <td>{detail.name}</td>
                        </tr>
                        <tr>
                          <td>description</td>
                          <td>{detail.description}</td>
                        </tr>
                        <tr>
                          <td>short_name</td>
                          <td>{detail.short_name}</td>
                        </tr>
                        <tr>
                          <td>out_ChildOf (parent)</td>
                          <td>{detail.parent}</td>
                        </tr>
                        <tr>
                          <td>out_ChildOf.out_ChildOf (grandparent)</td>
                          <td>{detail.groupname}</td>
                        </tr>
                        <tr>
                          <td>in_ChildOf (children)</td>
                          <td><List items={detail.children} /></td>
                        </tr>
                        <tr>
                          <td>in_HasFunction</td>
                          <td><List items={detail.has_function} /></td>
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

module.exports = DetailComponent;
