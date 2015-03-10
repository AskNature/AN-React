'use strict';

var React = require('react'),
NoChromeLayout = require('../layouts/nochrome.jsx'),
Link = require('../modules/link.jsx'),

Button = require('react-bootstrap').Button,
ButtonGroup = require('react-bootstrap').ButtonGroup,
Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Panel = require('react-bootstrap').Panel,
Modal = require('react-bootstrap').Modal,
Input = require('react-bootstrap').Input;

var FormData = require('react-form-data');

var userActions = require('../../actions/users');
var routeActions = require('../../actions/routes');

var Login = React.createClass({
    mixins: [ FormData ],

    getInitialState: function() {
        return { style: '' };
    },

    loginError: function() {
    	this.setState({style: 'error'});
    },

    loginSuccess: function() {
    	this.setState({style: ''});
	routeActions.setRoute("/");
    },

    handleSubmit: function(e) {
    	console.log("submit handled");
        userActions.loginUser(this.formData, this.loginSuccess, this.loginError);
        e.preventDefault();
    },

    render: function() {
      var title = 'Sign In';
      function handleHide() {
        routeActions.setRoute('/');
      }
        return (
            /* jshint ignore:start */
            <NoChromeLayout>
              <div className="main-container">
                <Grid>
                  <Row className="show-grid">
                    <Col xs={12} md={6} mdOffset={3}>
                      <Modal title={title} id="login-panel" bsStyle="primary" backdrop={false} onRequestHide={handleHide}>
                        <div className='modal-body'>
                        <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                          <Row className="show-grid">
                            <Col xs={12}>
                              <Input name="username" type="email" placeholder="Email Address" bsStyle={this.state.style} />
                              <Input name="password" type="password" placeholder="Password" bsStyle={this.state.style} />
                              <Link url="/forgot">Forgot password?</Link>
                              <Input className="pull-left" type="checkbox" label="Remember Me" checked />
                                <ButtonGroup className="pull-right">
                                  <Button onClick={handleHide}>Close</Button>
                                  <Button type="submit" bsStyle="primary">Login</Button>
                              </ButtonGroup>
                            </Col>
                          </Row>
                          <Row className="show-grid">
                            <Col xs={12}>
                              <h6>Or login with:</h6>
                              <ButtonGroup justified>
                                <Button href='/auth/google'><Glyphicon glyph="social-google-plus" />Google</Button>
                                <Button href='/auth/facebook'>Facebook</Button>
                                <Button href='/auth/linkedin'>LinkedIn</Button>
                              </ButtonGroup>
                              <hr />
                              <Link url="/signup">Create AskNature Account</Link>
                            </Col>
                          </Row>
                        </form>
                      </div>
                      </Modal>
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
