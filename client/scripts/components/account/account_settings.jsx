var React = require('react');
var DefaultLayout = require('../layouts/default.jsx'),

userActions = require('../../actions/users'),
userStore = require('../../stores/accounts'),

Link = require('../modules/link.jsx'),

Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Panel = require('react-bootstrap').Panel,
Input = require('react-bootstrap').Input;

var FormData = require('react-form-data');

var getState = function() {
    return {
        user: userStore.get()
    };
};

var AccountSettings = React.createClass({

    mixins: [ FormData, userStore.mixin ],

    handleSubmit: function(e) {
        userActions.updateUser(this.formData);
	e.preventDefault();
    },

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
      userActions.fetchUser();
    },

    render: function() {
      var user = this.state.user;
      if (!user.loggedIn) return (<DefaultLayout><span>You're not logged in!</span></DefaultLayout>);
        return (
            /* jshint ignore:start */
          <DefaultLayout>
            <div className="container">
            <Grid>
                <h2>Account Settings</h2>
                <form className="form-horizontal" onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                  <Row className="show-grid">
                    <Col xs={12}>
                      <Input type="text" name="username" label="Username" defaultValue={user.username} labelClassName="col-xs-3" wrapperClassName="col-xs-9"/>
                      <Input type="text" name="firstName" label="First Name" defaultValue={user.firstName} labelClassName="col-xs-3" wrapperClassName="col-xs-9"/>
                      <Input type="text" name="lastName" label="Last Name" defaultValue={user.lastName} labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                      <Input type="email" name="email" label="Email" defaultValue={user.email} labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
		      <Input type="password" name="password" label="Password" defaultValue={user.password} labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                      <Input className="pull-right" type="submit" bsStyle="primary" value="Save" />
                    </Col>
                  </Row>
                </form>
              </Grid>
            </div>
          </DefaultLayout>
            /* jshint ignore:end */
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = AccountSettings;
