'use strict';

var React = require('react'),
store = require('../../stores/strategy.js'),
actions = require('../../actions/strategy.js');

var TextArea = require('./common/textarea.jsx');

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
	error: store.getError()
    }
    );
};

var StrategyDetail = React.createClass({
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
        //if(this.state.user.role == 'admin') { this.setState({editable: true}); }
	this.setState({editable: true});
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
    	console.log(this.state.object);
        var detail = this.state.object;
	var entityName = 'Biological Strategy';
	var splitLegacyTitle = detail.name.split(': ');
	//var secondaryLink = '../living-system/'+ (detail.living_systems ? detail.living_systems[0].masterid : '');
	var secondaryLink = '';
        return (
		    !this.state.loaded ? (<div>{this.state.error ? 'Error' : 'Loading'}</div>) : (<div><AdminBar masterid={detail.masterid} routename={'strategy'} pluralroute={'strategies'} entityName={entityName} />
		    <CreatorMast img='https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg' entityname={entityName} />
		    <Hero editable={false} store={store} actions={actions} media={detail.media} primarytitle={this.state.loaded ? splitLegacyTitle[0] : '!!!!'} secondarytitle={splitLegacyTitle[1]} secondarylink={secondaryLink} masterid={this.state.masterid} />
		    <div>Slug: {this.state.masterid}</div>
		    <SubHero description={detail.summary} editable={this.state.editable} store={store} actions={actions} editBegin={this.editBegin} editFinish={this.editFinish} editCancel={this.editCancel} onDelete={this.onDelete} />
		    <Grid>
          	        <Row className='show-grid'>
            		    <Col xs={12} sm={4}>
               		        <ButtonList livingsystems items={detail.living_systems} routename='living-system' title='Living Systems'/>
              			<ButtonList conditions items={detail.conditions} title='Context' />
            		    </Col>
            		    <Col xs={6} sm={4}>
              		        <ButtonList phenomena items={detail.mechanisms} routename='phenomenon' title='Mechanisms'/>
            		    </Col>
            		    <Col xs={6} sm={4}>
                          <RelationshipList items={this.state.object.functions} editable={this.state.editable} titleField='name' onAdd={this.onRelationshipAdd.bind(null, 'functions')} onRemove={this.onRelationshipRemove.bind(null, 'functions')} field={'functions'} routeName={'phenomenon'} title={'Outcomes'} fieldName={'Outcomes'}/>
            		    </Col>
          		</Row>
         	    </Grid>
		    <PanelGroup defaultActiveKey='1' accordion>
		        <Panel header='More' eventKey='1'>
                    	    <Grid>
			        <Row>
				    <Col xs={12}>
				        <Gallery items={detail} />
				    </Col>
				</Row>
				<Row>
				    <Col xs={12} md={12}>
				         <TextArea title='Story' item={detail.brief} store={store} actions={actions} fieldName={'brief'} editable={this.state.editable} />
					 <TextArea title='Citations' item={detail.special_text} store={store} actions={actions} fieldName={'special_text'} editable={this.state.editable} />
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
                            <img src='https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png' alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
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
                            <img src='https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png' alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
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
                            <img src='https://lh6.googleusercontent.com/-tZskG15qG3k/VC3JrjTeWwI/AAAAAAAAADM/6_6W4gnzQo8/w140-h140-p/bi-logo.png' alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
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
                          <img src='https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg' alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
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
                		    {detail.sources ? (
                  		        <Col xs={12} sm={6}>
                    			    <ButtonList sources items={detail.sources} routename='source' title='Sources' />
                  			</Col>) : ''
                		    }
                		    {detail.experts ? (
                  		        <Col xs={12} sm={6}>
                    			    <ButtonList experts items={detail.experts} routename='researcher' title='Studied By' />
                  			</Col>) : ''
                		    }
              			</Row>
			    </Grid>
			</Panel>
		    </PanelGroup></div>)
        );
    }
});

module.exports = StrategyDetail;
