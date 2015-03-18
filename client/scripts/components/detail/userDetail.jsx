'use strict';

var React = require('react'),
store = require('../../stores/user.js'),
accountStore = require('../../stores/accounts'),
actions = require('../../actions/user.js');

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
    account: accountStore.get()
    }
    );
};

var UserDetail = React.createClass({
    mixins: [store.mixin],
    getInitialState: function() {
        return ({
	    object: store.get(),
	    editable: !this.props.masterid ? true : false,
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
        if(this.state.account.role === 'admin') { this.setState({editable: true}); }
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
	var entityName = 'User';
	var secondaryLink = '';
    var avatar = 'http://www.asknature.org/images/uploads/user/'+detail.masterid+'/avatar/lg_avatar.jpg';
        return (
		    !this.state.loaded ? (<div>{this.state.error ? 'Error' : 'Loading'}</div>) : (<div><AdminBar masterid={detail.masterid} routename={'user'} pluralroute={'users'} entityName={entityName} />
		    <Hero editable={false} store={store} actions={actions} media={detail.media} primarytitle={this.state.loaded ? detail.first+' '+detail.last : '!!!!'} secondarytitle={detail.name} masterid={this.state.masterid} innerimage={avatar} />
		    <SubHero description={detail.special_text} credentials={this.state.account.role === 'admin' ? true : false} editable={this.state.editable} store={store} actions={actions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} onDelete={this.onDelete} />
		    <Grid>
          	        <Row className='show-grid'>
            		    <Col xs={12} sm={4}>
                            <RelationshipList items={this.state.object.friends} editable={this.state.editable} titleField='name' onAdd={this.onRelationshipAdd.bind(null, 'friends')} onRemove={this.onRelationshipRemove.bind(null, 'friends')} field={'friends'} routeName={'user'} title={'Friends'} fieldName={'Friends'}/>

            		    </Col>

          		</Row>
         	    </Grid>
                    	    <Grid>
			        <Row>
				    <Col xs={12}>
				        <Gallery items={detail} />
				    </Col>
				</Row>

				<Row className='show-grid'>

				    <Col xs={12} sm={6}>
				        <RelationshipList items={this.state.object.added_media} editable={this.state.editable} titleField='name' subtitleField='filename' onAdd={this.onRelationshipAdd.bind(null, 'products')} onRemove={this.onRelationshipRemove.bind(null, 'added_media')} field={'added_media'} routeName={'media'} title={'Added Media'} fieldName={'Added Media'}/>
				    </Col>
				</Row>
			    </Grid>
            {this.state.account.role === 'admin' || 'editor' ? (
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

module.exports = UserDetail;
