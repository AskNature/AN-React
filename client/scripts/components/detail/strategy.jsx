var React = require('react')
DefaultLayout = require('../layouts/default.jsx'),
store = require('../../stores/strategy.js');
actions = require('../../actions/strategy.js');

var TextArea = require('./common/textarea.jsx');

var RelationshipList = require('./common/relationshiplist.jsx');

var CreatorMast = require('./common/creatormast.jsx'),
AdminBar = require('./common/adminbar.jsx'),
Hero = require('./common/hero.jsx'),
SubHero = require('./common/subhero.jsx');

var Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var getState = function() {
    return (
    {
	object: store.get()
    }
    );
};

var StrategyDetail = React.createClass({
    mixins: [store.mixin],
    getInitialState: function() {
        return ({
	    object: store.get(),
	    editable: false
	});
    },
    componentWillMount: function() {
	actions.fetch("d1cb32be3c76489375e383e6ed53a736");
    },
    _onChange: function() {
    	this.setState(getState());
    },
    onRelationshipAdd: function(field, addedValue) {
        console.log(field + " added " + addedValue);
	actions.addRelationship(field, addedValue);
    },
    onRelationshipRemove: function(field, removedValue) {
    	console.log(field + " removed " + removedValue);
	actions.removeRelationship(field, removedValue);
    },
    toggleEditable: function() {
        this.setState({editable: !this.state.editable});
    },
    saveItem: function() {
    	actions.commit();
    },
    editBegin: function(e) {
        e.preventDefault();
        //if(this.state.user.role == 'admin') { this.setState({editable: true}); }
	this.setState({editable: true});
    },
    editCancel: function(e) {
        e.preventDefault();
        var id = window.location.pathname;
        actions.fetch(id);
        this.setState({editable: false});
    },
    editFinish: function(e) {
        e.preventDefault();
        actions.commit(); // TODO: update commit to do all fields when empty
        this.setState({editable: false});
    },
    render: function() {
    	var detail = this.state.object;
	var entityName = "Biological Strategy";
	var splitLegacyTitle = detail.name.split(': ');
	//var secondaryLink = '../living-system/'+ (detail.living_systems ? detail.living_systems[0].masterid : "");
	var secondaryLink = '';
        return (
            <DefaultLayout>
		    <AdminBar masterid={detail.masterid} routename={"strategy"} pluralroute={"strategies"} entityName={entityName} />
		    <CreatorMast img="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg" entityname={entityName} />
		    <Hero media={detail.media} primarytitle={splitLegacyTitle[0]} secondarytitle={splitLegacyTitle[1]} secondarylink={secondaryLink} />
		    <SubHero description={detail.summary} editable={this.state.editable} store={store} actions={actions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} />
		    <PanelGroup defaultActiveKey='1' accordion>
		        <Panel header="More" eventKey='1'>
                    	    <Grid>
			        <Row>
				    <Col xs={12} md={12}>
				         <TextArea title='Story' item={detail.brief} store={store} actions={actions} fieldName={"brief"} editable={this.state.editable} />
					 <TextArea title='Citations' item={detail.special_text} store={store} actions={actions} fieldName={"special_text"} editable={this.state.editable} />
				    </Col>
				</Row>
				<Row className="show-grid">
				    <Col xs={12} sm={6}>
				    </Col>
				    <Col xs={12} sm={6}>
				        <RelationshipList items={this.state.object.products} editable={this.state.editable} onAdd={this.onRelationshipAdd.bind(null, "products")} onRemove={this.onRelationshipRemove.bind(null, "products")} field={"products"} routeName={"product"} title={"Inspired Solutions"} fieldName={"Inspired Solution"}/>
				    </Col>
				</Row>
			    </Grid>
			</Panel>
		    </PanelGroup>
            </DefaultLayout>
        )
    }
});

module.exports = StrategyDetail;
