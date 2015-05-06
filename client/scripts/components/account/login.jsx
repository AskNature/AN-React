'use strict';

var React = require('react'),
NoChromeLayout = require('../layouts/nochrome.jsx'),
Link = require('../modules/link.jsx'),

FontAwesome = require('react-fontawesome'),

Button = require('react-bootstrap').Button,
ButtonGroup = require('react-bootstrap').ButtonGroup,
Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Panel = require('react-bootstrap').Panel,
Modal = require('react-bootstrap').Modal,
Input = require('react-bootstrap').Input;

var FormData = require('react-form-data');

var accountActions = require('../../actions/accounts');
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
        window.history.back();

    },

    handleSubmit: function(e) {
        accountActions.loginUser(this.formData, this.loginSuccess, this.loginError);
        e.preventDefault();
    },

    render: function() {
      var title = 'Sign In';
      function handleHide() {
        window.history.back();
      }
        return (
            /* jshint ignore:start */
            <NoChromeLayout>
              <div className="main-container">

                      <Modal title={title} id="login-panel" bsStyle="primary" backdrop={false} onRequestHide={handleHide}>
                        <Grid>
                          <Row>
                            <Col xs={12} sm={8} smOffset={2}>
                        <div className='modal-body'>
                        <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>

                              <Input name="username" type="email" label="Email Address" bsStyle={this.state.style} />
                              <Input name="password" type="password" label="Password" bsStyle={this.state.style} />
                              <Link url="/forgot">Forgot password?</Link>
                                <ButtonGroup className="pull-right">
                                  <Button onClick={handleHide}>Close</Button>
                                  <Button type="submit" >Login</Button>
                              </ButtonGroup>
<br/><br/>
                              <h6>Or login with:</h6>
                              <ButtonGroup justified>
                                <Button href='/auth/google'><FontAwesome name='google-plus' size='2x' /></Button>
                                  <Button href='/auth/facebook'><FontAwesome name='facebook' size='2x' /></Button>
                                    <Button href='/auth/linkedin'><FontAwesome name='linkedin' size='2x' /></Button>
                              </ButtonGroup>
                              <hr />
                              Not a member yet? <Link url="/signup">Create an AskNature account.</Link>
                        </form>
                      </div>
                      </Col>
                    </Row>
                  </Grid>
                      </Modal>

              </div>
            </NoChromeLayout>
            /* jshint ignore:end */
        );
    }
});

  module.exports = Login;
