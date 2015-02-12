var React = require('react');

var userActions = require('../../actions/user');
var userStore = require('../../stores/user');

var getState = function() {
  return {
    user: userStore.get()
   }
}

var UserSpan = React.createClass({
    mixins: [userStore.mixin],
    
    getInitialState: function() {
      return {
        user: {firstName: "new user"}
      }
    },
    
    componentDidMount: function() {
      userActions.fetchUser();
    },

    render: function() {
      return (
        <p>Hi there, {this.state.user.firstName}!</p>
      );
    },
    
    _onChange: function() {
      this.setState(getState());
    }
});

module.exports = UserSpan;