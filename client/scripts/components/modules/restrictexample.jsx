var React = require('react');

var example = React.createClass({
    render: function() {
        <Restrict user={user} capability="EditPage" deniedComponent={component}>
	    <h1>This only appears if you have 'EditPage'</h1>
	</Restrict>
	<RestrictOptions user={user} options={{'EditPage': {'options': ['one', 'two', 'three']}, 'OtherPermission': {'options': ['one', 'two']}}}>
	    <Select props=...>
	</RestrictOptions>
    }
});