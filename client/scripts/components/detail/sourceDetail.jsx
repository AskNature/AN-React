'use strict';

var React = require('react'),
store = require('../../stores/detail/sources.js'),
accountStore = require('../../stores/accounts'),
actions = require('../../actions/sources.js');

var TextArea = require('./common/textarea.jsx');
var DataTable = require('./common/datatable.jsx');
var RelationshipList = require('./common/relationshiplist.jsx');

var CreatorMast = require('./common/creatormast.jsx'),
AdminBar = require('./common/adminbar.jsx'),
Hero = require('./common/hero.jsx'),
SubHero = require('./common/subhero.jsx'),
ButtonList = require('./common/edgelists.jsx'),
Gallery = require('./common/gallery.jsx');

var Panel = require('react-bootstrap').Panel,
PanelGroup = require('react-bootstrap').PanelGroup,
Row = require('react-bootstrap').Row,
Label = require('react-bootstrap').Label,
Grid = require('react-bootstrap').Grid,
Col = require('react-bootstrap').Col;

var getState = function() {
    return (
    {
	object: store.get(),
	loaded: store.getLoaded(),
	error: store.getError(),
    user: accountStore.get()
    }
    );
};

var SourceDetail = React.createClass({
    mixins: [store.mixin],
    getInitialState: function() {
        return ({
	    object: store.get(),
	    editable: this.props.masterid ? true : false,
	    loaded: store.getLoaded(),
	    masterid: this.props.masterid
	});
    },
    componentDidMount: function() {
	if(this.props.masterid) {
	    actions.fetch(this.props.masterid);
	} else {
	    actions.create();
	}
    },
    _onChange: function() {
    	this.setState(getState());
    },
    onRelationshipAdd: function(field, addedValue) {
        console.log(field + ' added ' + addedValue);
	actions.addRelationship(field, addedValue);
    },
    onRelationshipRemove: function(field, removedValue) {
    	console.log(field + ' removed ' + removedValue);
	actions.removeRelationship(field, removedValue);
    },
    toggleEditable: function() {
        this.setState({editable: !this.state.editable});
    },
    editBegin: function(e) {
        e.preventDefault();
        if(this.state.user.role === 'admin') { this.setState({editable: true}); }
    },
    editCancel: function(e) {
        e.preventDefault();
	actions.fetch(this.props.masterid);
        this.setState({editable: false});
    },
    editFinish: function(e) {
        e.preventDefault();
        actions.commit();
        this.setState({editable: false});
    },
    onDelete: function() {
        var r = confirm('Do you really want to delete this record?');
        if(r) {actions.del(this.props.masterid);}
    },
    render: function() {
        var detail = this.state.object;
	var entityName = 'Source';
	var secondaryLink = '';
    var default_avatar = 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10383663_869350803096314_2369845013213041061_n.png?oh=2c010ce055331caa73a9506795239fd1&oe=55BDD82A&__gda__=1433772443_f5c43498047b8193dccc0a5554ba6ed1';
        return (
		    !this.state.loaded ? (<div>{this.state.error ? 'Error' : 'Loading'}</div>) : (<div><AdminBar masterid={detail.masterid} routename={'source'} pluralroute={'strategies'} entityName={entityName} />
		    <CreatorMast img='https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg' entityname={entityName} />
		    <Hero editable={false} store={store} actions={actions} media={detail.media} primarytitle={detail.name} secondarytitle={detail.authors} secondarylink={secondaryLink} masterid={this.state.masterid} />
		    <SubHero description={detail.summary} credentials={this.state.user.role === 'admin' ? true : false} editable={this.state.editable} store={store} actions={actions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} onDelete={this.onDelete} />

            {this.state.user.role === 'admin' || 'editor' ? (
                <PanelGroup defaultActiveKey='0' accordion>
                    <Panel header='Table View' eventKey='1'>
                        <DataTable data={detail} />
                    </Panel>
                </PanelGroup>
            ) : '' }
        </div>
            )
        );
    }
});

module.exports = SourceDetail;
