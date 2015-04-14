var React = require('react');
var _ = require('lodash');

/**
 * Restricts the options of child components based on
 * whether the user possesses a given capability.
 * @param {Object} user - The user's profile from the UserStore.
 * @param {Object} options - An object that defines the available options for given
 * capabilities (capabilities are keys)
 * @param {string} capability - The name of the capability that is required.
 * @param {Component} deniedComponent - The component to display if access is denied.
 */

var RestrictOptions = React.createClass({
    render: function() {
        if(this.props.user.status[this.props.capability]) {
	    return (this.props.component(this.props.options[this.props.capability]));
	} else {
	    return ({this.props.deniedComponent : <this.props.deniedComponent /> : "You don't have permission to access this feature."});
	}
    }
});