
var React = require('react')
NoChromeLayout = require('../layouts/nochrome.jsx'),
Link = require('../modules/link.jsx'),

Button = require('react-bootstrap').Button,
Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Panel = require('react-bootstrap').Panel,
Input = require('react-bootstrap').Input;

var FormData = require('react-form-data');

var userActions = require('../../actions/users');
var routeActions = require('../../actions/routes');

var Login = React.createClass({
    mixins: [ FormData ],

    getInitialState: function() {
    	return { style: '' }
    },

    createSuccess: function() {
    	routeActions.setRoute("/settings");
    },

    createFailure: function(err) {
    	console.log(err);
	this.setState({style: 'error'});
    },

    handleSubmit: function(e) {
    	userActions.createUser(this.formData, this.createSuccess, this.createFailure);
	e.preventDefault();
    },

    render: function() {
      var title = (
        <h2>Sign up</h2>
      )
        return (
            /* jshint ignore:start */
            <NoChromeLayout>
              <div className="main-container">
                <Grid>
                  <Row className="show-grid">
                    <Col xs={12} md={6} mdOffset={3}>
                      <Panel header={title} id="login-panel">
                        <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                        <Row className="show-grid">
                          <Col xs={12}>
                          <Input name="email" type="email" placeholder="Email Address" bsStyle={this.state.style} />
                          <Input name="password" type="password" placeholder="Password" />
                          <Link className="pull-left" url="/login">Already have an account, or want to log in with an external account?</Link>
                          <Input className="pull-right" type="submit" value="Sign Up" />
                          </Col>
                          </Row>

                        </form>
                      </Panel>
                    </Col>
                  </Row>
                </Grid>
              </div>
            </NoChromeLayout>
            /* jshint ignore:end */
        );
    }
});

  module.exports = Login;
