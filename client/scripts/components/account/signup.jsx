
var React = require('react')
NoChromeLayout = require('../layouts/nochrome.jsx'),
Link = require('../modules/link.jsx'),

Button = require('react-bootstrap').Button,
Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Panel = require('react-bootstrap').Panel,
Input = require('react-bootstrap').Input;


var Login = React.createClass({
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
                        <form>
                        <Row className="show-grid">
                        <Col xs={12}>
                        <Button href='/auth/google' target="_blank" bsStyle="primary">Sign up with Google</Button>
                        <hr />
                        </Col>
                        </Row>
                        <Row className="show-grid">
                          <Col xs={12}>
                          <Input type="email" placeholder="Email Address" />
                          <Input type="password" placeholder="Password" />
                          <Link className="pull-left" url="#">Already have an account?</Link>
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
