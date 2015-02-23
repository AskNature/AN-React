/**
* Strategy detail (component)
*/
'use strict';

var React = require('react');

var Link = require('../modules/link.jsx');
var Col = require('react-bootstrap/Col'),
Well = require('react-bootstrap/Well'),
Button = require('react-bootstrap/Button'),
ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
OverlayTrigger = require('react-bootstrap/OverlayTrigger'),
Tooltip = require('react-bootstrap/Tooltip'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid'),
Glyphicon = require('react-bootstrap/Glyphicon'),
Carousel = require('react-bootstrap/Carousel'),
CarouselItem = require('react-bootstrap/CarouselItem'),
Table = require('react-bootstrap/Table');

var DefaultLayout = require('../layouts/default.jsx');


/** Gets incoming information from the store */

var focusStore = require('../../stores/detail/users');

/** Sends outgoing requests to an action */

var focusActions = require('../../actions/users');

/** getState can be called to get state updates from the store.
* initialItems = entire list that remains static
* items = dynamic filtered list
*/

var getState = function() {
  return {
    details: focusStore.get()
  };
};

var ButtonList = React.createClass({
  render: function() {
    var items = this.props.items;
    var title = this.props.title;
    return (
      <Well bsSize="small">
        <h6>{title}</h6>
        {
          items.map(function(item, i){
            return (
              <OverlayTrigger placement="top" overlay={<Tooltip>{item}</Tooltip>} key={i}>
                <Button block>{item}</Button>
              </OverlayTrigger>
            );
          })
      }
      </Well>
    );
  }
});

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
    var pictures = this.props.items.media;
    var masterid = this.props.items.masterid;
    return (
    <Carousel {...this.props}>
    {
      pictures.map(function(imageurl, i){
        var mediaurl= 'http://www.asknature.org/images/uploads/user/'+masterid+'/avatar/lg_avatar.jpg';
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
    var legacy_url = 'http://www.asknature.org/user/'+detail.masterid;
    var avatar = 'http://www.asknature.org/images/uploads/user/'+detail.masterid+'/avatar/lg_avatar.jpg';
    return (
        /* jshint ignore:start */
        <DefaultLayout>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={12}>
                  <ButtonToolbar>
                    <Link url="../admin/users"><Button><Glyphicon glyph="chevron-left" /> Users Console</Button></Link>

                    <Button href={legacy_url} target="_blank" bsStyle="primary">View on legacy site</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12} sm={6}>
                  <h3>{detail.name}</h3>
                </Col>

                <Col xs={12} sm={6}>
                  <Well bsSize="small">
                    <img className='img-responsive' src={avatar} />
                  </Well>
                </Col>
              </Row>
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
                          <td>first</td>
                          <td>{detail.first}</td>
                        </tr>
                        <tr>
                          <td>last</td>
                          <td>{detail.last}</td>
                        </tr>
                        <tr>
                          <td>email</td>
                          <td>{detail.email}</td>
                        </tr>
                        <tr>
                          <td>email_confirmed</td>
                          <td>{detail.email_confirmed}</td>
                        </tr>
                        <tr>
                          <td>flagged</td>
                          <td><List items={detail.flagged} /></td>
                        </tr>
                        <tr>
                          <td>roles</td>
                          <td><List items={detail.roles.split(',')} /></td>
                        </tr>
                        <tr>
                          <td>registration_date</td>
                          <td>{detail.registration_date}</td>
                        </tr>
                        <tr>
                          <td>timestamp</td>
                          <td>{detail.timestamp}</td>
                        </tr>

                        <tr>
                          <td>special_text</td>
                          <td>{detail.special_text}</td>
                        </tr>
                        <tr>
                          <td>activities</td>
                          <td><List items={detail.activities.split(',')} /></td>
                        </tr>
                        <tr>
                          <td>address_1</td>
                          <td>{detail.address_1}</td>
                        </tr>
                        <tr>
                          <td>address_2</td>
                          <td>{detail.address_2}</td>
                        </tr>
                        <tr>
                          <td>city</td>
                          <td>{detail.city}</td>
                        </tr>
                        <tr>
                          <td>state</td>
                          <td>{detail.state}</td>
                        </tr>

                        <tr>
                          <td>postal_code</td>
                          <td>{detail.postal_code}</td>
                        </tr>
                        <tr>
                          <td>country</td>
                          <td>{detail.country}</td>
                        </tr>
                        <tr>
                          <td>time_zone</td>
                          <td>{detail.time_zone}</td>
                        </tr>
                        <tr>
                          <td>phone</td>
                          <td>{detail.phone}</td>
                        </tr>
                        <tr>
                          <td>extension</td>
                          <td>{detail.extension}</td>
                        </tr>
                        <tr>
                          <td>tollfree</td>
                          <td>{detail.tollfree}</td>
                        </tr>
                        <tr>
                          <td>fax</td>
                          <td>{detail.fax}</td>
                        </tr>
                        <tr>
                          <td>im</td>
                          <td>{detail.im}</td>
                        </tr>
                        <tr>
                          <td>langs_spoken</td>
                          <td>{detail.langs_spoken}</td>
                        </tr>
                        <tr>
                          <td>revision</td>
                          <td>{detail.revision}</td>
                        </tr>

                        <tr>
                          <td>hide_email</td>
                          <td>{detail.hide_email}</td>
                        </tr>
                        <tr>
                          <td>send_email</td>
                          <td>{detail.send_email}</td>
                        </tr>
                        <tr>
                          <td>alert_frequency</td>
                          <td>{detail.alert_frequency}</td>
                        </tr>
                        <tr>
                          <td>last_alerted</td>
                          <td>{detail.last_alerted}</td>
                        </tr>
                        <tr>
                          <td>status</td>
                          <td>{detail.status}</td>
                        </tr>
                        <tr>
                          <td>contact_me</td>
                          <td>{detail.contact_me}</td>
                        </tr>

                        <tr>
                          <td>hide_address</td>
                          <td>{detail.hide_address}</td>
                        </tr>
                        <tr>
                          <td>hide_phone</td>
                          <td>{detail.hide_phone}</td>
                        </tr>
                        <tr>
                          <td>gender</td>
                          <td>{detail.gender}</td>
                        </tr>
                        <tr>
                          <td>custom_avatar</td>
                          <td>{detail.custom_avatar}</td>
                        </tr>
                        <tr>
                          <td>ip_address</td>
                          <td>{detail.ip_address}</td>
                        </tr>
                        <tr>
                          <td>has_media</td>
                          <td><List items={detail.has_media} /></td>
                        </tr>
                        <tr>
                          <td>added_media</td>
                          <td><List items={detail.added_media} /></td>
                        </tr>
                        <tr>
                          <td>collected</td>
                          <td><List items={detail.collected} /></td>
                        </tr>
                        <tr>
                          <td>friends</td>
                          <td><List items={detail.friends} /></td>
                        </tr>
                        <tr>
                          <td>password</td>
                          <td>{detail.password}</td>
                        </tr>
                        <tr>
                          <td>salt</td>
                          <td>{detail.salt}</td>
                        </tr>
                        <tr>
                          <td>persist</td>
                          <td>{detail.persist}</td>
                        </tr>
                        <tr>
                          <td>newpassword</td>
                          <td>{detail.newpassword}</td>
                        </tr>
                        <tr>
                          <td>email_salt</td>
                          <td>{detail.email_salt}</td>
                        </tr>
                      </tbody>
                    </Table>
                </Col>
              </Row>

            </Grid>
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
