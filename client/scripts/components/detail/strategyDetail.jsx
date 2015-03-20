'use strict';

var React = require('react'),
store = require('../../stores/generic-detail.js'),
accountStore = require('../../stores/accounts'),
actions = require('../../actions/generic-detail.js');

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

var StrategyDetail = React.createClass({
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
	var entityName = 'Biological Strategy';
	var splitLegacyTitle;
    if(this.state.loaded) {
        splitLegacyTitle = detail.name.split(': ');
    }
	//var secondaryLink = '../living-system/'+ (detail.living_systems ? detail.living_systems[0].masterid : '');
	var secondaryLink = '';
    var default_avatar = 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10383663_869350803096314_2369845013213041061_n.png?oh=2c010ce055331caa73a9506795239fd1&oe=55BDD82A&__gda__=1433772443_f5c43498047b8193dccc0a5554ba6ed1';
        return (
		    !this.state.loaded ? (<div>{this.state.error ? 'Error' : 'Loading'}</div>) : (<div><AdminBar masterid={detail.masterid} routename={'strategy'} pluralroute={'strategies'} entityName={entityName} />
		    <CreatorMast img='https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg' entityname={entityName} />
		    <Hero editable={false} store={store} actions={actions} media={detail.media} primarytitle={this.state.loaded ? splitLegacyTitle[0] : '!!!!'} secondarytitle={splitLegacyTitle[1]} secondarylink={secondaryLink} masterid={this.state.masterid} />
		    <SubHero description={detail.summary} credentials={this.state.user.role === 'admin' ? true : false} editable={this.state.editable} store={store} actions={actions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} onDelete={this.onDelete} />
		    <Grid>
          	        <Row className='show-grid'>
            		    <Col xs={12} sm={4}>
                            <RelationshipList items={this.state.object.living_systems} editable={this.state.editable} titleField='name' onAdd={this.onRelationshipAdd.bind(null, 'living_systems')} onRemove={this.onRelationshipRemove.bind(null, 'living_systems')} field={'living_systems'} routeName={'living-system'} title={'Living Systems'} fieldName={'Living Systems'}/>
                           <RelationshipList items={this.state.object.conditions} editable={this.state.editable} titleField='name' onAdd={this.onRelationshipAdd.bind(null, 'conditions')} onRemove={this.onRelationshipRemove.bind(null, 'conditions')} field={'conditions'} routeName={'condition'} title={'Context'} fieldName={'Context'}/>
            		    </Col>
            		    <Col xs={6} sm={4}>
                            <RelationshipList items={this.state.object.mechanisms} editable={this.state.editable} titleField='name' onAdd={this.onRelationshipAdd.bind(null,'mechanisms')} onRemove={this.onRelationshipRemove.bind(null, 'mechanisms')} field={'functions'} routeName={'phenomenon'} title={'Mechanisms'} fieldName={'Mechanisms'}/>
            		    </Col>
            		    <Col xs={6} sm={4}>
                          <RelationshipList items={this.state.object.functions} editable={this.state.editable} titleField='name' onAdd={this.onRelationshipAdd.bind(null, 'functions')} onRemove={this.onRelationshipRemove.bind(null, 'functions')} field={'functions'} routeName={'phenomenon'} title={'Outcomes'} fieldName={'Outcomes'}/>
            		    </Col>
          		</Row>
         	    </Grid>
                    	    <Grid>
			        <Row>
				    <Col xs={12}>
				        <Gallery items={detail} />
				    </Col>
				</Row>
				<Row>
				    <Col xs={12} md={12}>
                        {detail.brief || this.state.editable ? (
                    <TextArea title='Story' item={detail.brief} store={store} actions={actions} fieldName={'brief'} editable={this.state.editable} />
                    ) : '' }
                        {detail.special_text || this.state.editable ? (
					 <TextArea title='Citations' item={detail.special_text} store={store} actions={actions} fieldName={'special_text'} editable={this.state.editable} />
                     ) : '' }
				    </Col>
				</Row>
				<Row className='show-grid'>
				    <Col xs={12} sm={6}>
                  <h6><strong>Your Inspired Ideas</strong></h6>

                  <ul className='media-list'>
                    {detail.application_1 ? (
                      <li className='media'>
                        <div className='media-left'>
                          <a href='#'>
                            <img src={default_avatar} alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                          </a>
                        </div>
                        <div className='media-body'>
                          <p><a href='#'><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_1}} /> <Label>Sector 1</Label></p>
                        </div>
                      </li>) : ''
                    }
                    {detail.application_2 ? (
                      <li className='media'>
                        <div className='media-left'>
                          <a href='#'>
                            <img src={default_avatar} alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                          </a>
                        </div>
                        <div className='media-body'>
                          <p><a href='#'><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_2}} /> <Label>Sector 2</Label> <Label>Sector 3</Label></p>
                        </div>
                      </li>) : ''
                    }
                    {detail.application_3 ? (
                      <li className='media'>
                        <div className='media-left'>
                          <a href='#'>
                            <img src={default_avatar} alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                          </a>
                        </div>
                        <div className='media-body'>
                          <p><a href='#'><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: detail.application_3}} /> <Label>Sector 4</Label> <Label>Sector 3</Label></p>
                        </div>
                      </li>) : ''
                    }
                    <li className='media'>
                      <div className='media-left'>
                        <a href='#'>
                          <img src={default_avatar} alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                        </a>
                      </div>
                      <div className='media-body'>
                        <form>
                          <Input type='text' className='input-sm' placeholder='Share Your Idea...' />
                        </form>
                      </div>
                    </li>
                  </ul>
				    </Col>
				    <Col xs={12} sm={6}>
				        <RelationshipList items={this.state.object.products} editable={this.state.editable} titleField='headline' subtitleField='name' onAdd={this.onRelationshipAdd.bind(null, 'products')} onRemove={this.onRelationshipRemove.bind(null, 'products')} field={'products'} routeName={'product'} title={'Inspired Solutions'} fieldName={'Inspired Solution'}/>
				    </Col>
				</Row>
              			<Row className='show-grid'>

                  		        <Col xs={12} sm={6}>
                                      <RelationshipList items={this.state.object.sources} titleField='name' subtitleField='authors' onAdd={this.onRelationshipAdd.bind(null, 'sources')} onRemove={this.onRelationshipRemove.bind(null, 'sources')} field={'sources'} routeName={'source'} title={'Sources'} fieldName={'Sources'}/>
      			                 </Col>
                  		        <Col xs={12} sm={6}>
                                      <RelationshipList items={this.state.object.experts} editable={this.state.editable} titleField='name' subtitleField='institution' onAdd={this.onRelationshipAdd.bind(null, 'experts')} onRemove={this.onRelationshipRemove.bind(null, 'experts')} field={'experts'} routeName={'researcher'} title={'Researched By'} fieldName={'Researched By'}/>
                  			</Col>
              			</Row>
			    </Grid>
            {this.state.user.role == 'admin' || 'editor' ? (
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

module.exports = StrategyDetail;
