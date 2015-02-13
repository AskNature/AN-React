var React = require('react');
var DefaultLayout = require('../layouts/default.jsx'),

userActions = require('../../actions/user'),
userStore = require('../../stores/user'),

Link = require('../modules/link.jsx'),

Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Panel = require('react-bootstrap').Panel,
Input = require('react-bootstrap').Input;

var getState = function() {
    return {
        user: userStore.get()
    };
};

var AccountSettings = React.createClass({

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
      userActions.fetchUser();
    },

    render: function() {
      var user = this.state.user;
        return (
            /* jshint ignore:start */
          <DefaultLayout>
            <Grid>
                <h2>Account Settings</h2>
                <form className="form-horizontal">
                  <Row className="show-grid">
                    <Col xs={12}>
                      <Input type="text" label="Username" defaultValue={user.username} labelClassName="col-xs-3" wrapperClassName="col-xs-9"/>
                      <Input type="text" label="First Name" defaultValue={user.firstName} labelClassName="col-xs-3" wrapperClassName="col-xs-9"/>
                      <Input type="text" label="Last Name" defaultValue={user.lastName} labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                      <Input type="email" label="Email" defaultValue={user.email} labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                      <Input className="pull-right" type="submit" bsStyle="primary" value="Save" />
                    </Col>
                  </Row>
                </form>
              </Grid>
          </DefaultLayout>
            /* jshint ignore:end */
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = AccountSettings;
