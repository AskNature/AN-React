
var React = require('react')
NoChromeLayout = require('../layouts/nochrome.jsx'),
Link = require('../modules/link.jsx'),

Button = require('react-bootstrap').Button,
ButtonGroup = require('react-bootstrap').ButtonGroup,
Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Modal = require('react-bootstrap').Modal,
Input = require('react-bootstrap').Input;

var FormData = require('react-form-data');

var accountActions = require('../../actions/accounts');
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
    accountActions.createUser(this.formData, this.createSuccess, this.createFailure);
    e.preventDefault();
  },

  render: function() {
    var title = 'Sign Up';
    function handleHide() {
      window.history.back();
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
                        <Input name="email" type="email" placeholder="Email Address" bsStyle={this.state.style} />
                        <Input name="password" type="password" placeholder="Password" />
                          <ButtonGroup className="pull-right">
                            <Button onClick={handleHide}>Close</Button>
                            <Button type="submit" bsStyle="primary">Sign up</Button>
                        </ButtonGroup>
                                              </Col>
                      <Col xs={12}>
                        <h6>Or sign up with your existing account:</h6>
                        <ButtonGroup justified>
                          <Button href='/auth/google'>Google</Button>
                          <Button href='/auth/facebook'>Facebook</Button>
                          <Button href='/auth/linkedin'>LinkedIn</Button>
                        </ButtonGroup>
                        <hr />
                        <Link url="/login">Already have an account?</Link>
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
