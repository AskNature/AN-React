
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

var userActions = require('../../actions/user');
var routeActions = require('../../actions/routes');

var Reset = React.createClass({
    mixins: [ FormData ],

    getInitialState: function() {
    	return { style: '' }
    },

    resetSuccess: function() {
    	console.log("reset");
	routeActions.setRoute("/login");
    },

    resetFailure: function(err) {
    	console.log(err);
	this.setState({style: 'error'});
    },

    handleSubmit: function(e) {
    	this.formData.token = window.location.pathname.split('/')[2]; // TODO: grab token from URL. there's a better way...
    	userActions.resetUser(this.formData, this.resetSuccess, this.resetFailure);
	console.log(this.formData);
	e.preventDefault();
    },

    render: function() {
      var title = (
        <h2>Reset password</h2>
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
                          <Input name="password" type="password" placeholder="New password" bsStyle={this.state.style} />
			  <Input name="confirm" type="password" placeholder="Confirm new password" bsStyle={this.state.style} />
                          <Input className="pull-right" type="submit" value="Reset password" />
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

  module.exports = Reset;
