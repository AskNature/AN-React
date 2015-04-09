var React = require('react');

/**
 * Restricts the availability of child components based on
 * whether the user possesses a given capability.
 * @param {Object} user - The user's profile from the UserStore.
 * @param {string} capability - The name of the capability that is required.
 * @param {Component} deniedComponent - The component to display if access is denied.
 */

var Restrict = React.createClass({
    render: function() {
        if(this.props.user.status[this.props.capability]) {
	    {this.props.children}
	} else {
	    {this.props.deniedComponent : this.props.deniedComponent : "You don't have permission to access this feature."}
	}
    }
});