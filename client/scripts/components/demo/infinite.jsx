'use strict';

var React = require('react'),
DefaultLayout = require('../layouts/default.jsx'),
Well = require('react-bootstrap').Well,
InfiniteList = require('./infinitelist.jsx');
var Scribe = require('../modules/scribe.jsx');
//var strategyDetailStore = require('../../stores/generic-detail.js');
//var strategyDetailActions = require('../../actions/generic-detail.js');
var store = require('../../stores/admin/generic-list.js');
var actions = require('../../actions/generic-collection.js');

var TopSection = require('../detail/common/topsection.jsx');
var StrategyDetail = require('../detail/detail-bstrategy.jsx');

var _ = require('lodash');
var routeActions = require('../../actions/routes');

var CustomSidebar = React.createClass({
    render: function() {
        return (
          /* jshint ignore:start */
        <div className='card-set'>
            <Well  bsSize='small' className='card card-parent' key='100'>
                <h6 className='card-label'>
                    Function
                </h6>
                <h4 className='card-name'>
                    Modify Buoyancy
                    <br/>
                <small>

                </small>
              </h4>
            </Well>
            <Well className='card-list'>
              <Well bsSize='small' className='card card-child' key='101'>
                <h6 className='card-label'>
                  Mechanism
                </h6>
                <h4 className='card-name'>
                      Add/remove gas
                </h4>
              </Well>
              <Well className='card-list'>
                <Well bsSize='small' className='card card-child' key='102'>
                  <h6 className='card-label'>
                    Biological Strategy
                  </h6>
                  <h4 className='card-name'>
                        Gas-holding structure aids buoyancy
                        <br/>
                        <small>
                          Cuttlefish
                        </small>
                  </h4>
                </Well>
                <Well bsSize='small' className='card card-child active' key='103'>
                  <h6 className='card-label'>
                    Biological Strategy
                  </h6>
                  <h4 className='card-name'>
                        Swim bladder helps maintain buoyancy
                        <br/>
                        <small>
                          Bone fishes
                        </small>
                  </h4>
                </Well>
                <Well bsSize='small' className='card card-child' key='104'>
                  <h6 className='card-label'>
                    Biological Strategy
                  </h6>
                  <h4 className='card-name'>
                        Siphuncle controls buoyancy
                        <br/>
                        <small>
                          Nautilus
                        </small>
                  </h4>
                </Well>
              </Well>
            </Well>
            <Well className='card-list'>
              <Well bsSize='small' className='card card-child' key='105'>
                <h6 className='card-label'>
                  Mechanism
                </h6>
                <h4 className='card-name'>
                      Add/remove wax
                </h4>
              </Well>
              <Well className='card-list'>
                <Well bsSize='small' className='card card-child' key='106'>
                  <h6 className='card-label'>
                    Biological Strategy
                  </h6>
                  <h4 className='card-name'>
                        Wax esters allow for changes in buoyancy
                        <br/>
                        <small>
                          Zooplankton
                        </small>
                  </h4>
                </Well>
                <Well bsSize='small' className='card card-child' key='107'>
                  <h6 className='card-label'>
                    Linked Article
                  </h6>
                  <h4 className='card-name'>
                        Tiny Marine Crustaceans Construct Wax "Weight Belts" to stay deep.
                        <br/>
                        <small>
                          sciencemag.org
                        </small>
                  </h4>
                </Well>
              </Well>
            </Well>
            <Well className='card-list'>
              <Well bsSize='small' className='card card-child' key='108'>
                <h6 className='card-label'>
                  Mechanism
                </h6>
                <h4 className='card-name'>
                      Change shape
                </h4>
              </Well>
              <Well className='card-list'>
                <Well bsSize='small' className='card card-child' key='109'>
                  <h6 className='card-label'>
                    Biological Strategy
                  </h6>
                  <h4 className='card-name'>
                        Shell alters buoyancy
                        <br/>
                        <small>
                          Green turtle
                        </small>
                  </h4>
                </Well>
                <Well bsSize='small' className='card card-child' key='110'>
                  <h6 className='card-label'>
                    Collection
                  </h6>
                  <h4 className='card-name'>
                        Transportation
                        <br/>
                        <small>
                          Created by AskNature Team
                        </small>
                  </h4>
                </Well>
                <Well bsSize='small' className='card card-child' key='111'>
                  <h6 className='card-label'>
                    Bio-inspired Strategy
                  </h6>
                  <h4 className='card-name'>
                        Wave power anchoring system
                        <br/>
                        <small>
                          BioPower Systems
                        </small>
                  </h4>
                </Well>
                <Well bsSize='small' className='card card-child' key='112'>
                  <h6 className='card-label'>
                    R&D Team
                  </h6>
                  <h4 className='card-name'>
                        BioPower Systems R&D Lab
                        <br/>
                        <small>
                          New South Wales, Australia
                        </small>
                  </h4>
                </Well>
              </Well>
            </Well>
        </div>
        /* jshint ignore:end */

    );
    }
});

var ListItem = React.createClass({
    componentDidMount: function() {
        var myHeight = this.getDOMNode().offsetHeight;
	console.log("height" + myHeight);
	this.props.heightUpdateListener(myHeight, this.props.num);
    },
    render: function() {
        return <div className="infinite-list-item" style={{"borderBottom": "1px solid #ddd", cursor: "pointer"}}>
            <StrategyDetail type="b.strategy" masterid={this.props.data.masterid} loaded={true} editable={false} user={{}} data={this.props.data}
	            editBegin={function() {}}
                    toggleEditable={function() {}}
                    editFinish={function() {}}
                    editCancel={function() {}}
                    onDelete={function() {}}
                    onRelationshipAdd={function() {}}
                    onRelationshipRemove={function() {}}
                    onRelationshipSet={function() {}} />
        </div>;
    }
});

var BigListItem = React.createClass({
    getInitialState: function() {
        return {enabled: false};
    },
    componentDidMount: function() {
        this.props.heightUpdateListener(this.getDOMNode().offsetHeight); // flexible-height list item needs to implement this on mount
    },
    toggleEnabled: function() {
        this.setState({enabled: !this.state.enabled});
    },
    render: function() {
        return <div className="infinite-list-item" style={{height: "1000px", "borderBottom": "1px solid #ddd", "font-size": "32px"}}>
	    <span style={{"font-size" : "16px", "cursor": "pointer"}}><a onClick={this.props.contractListener(this.props.num)}>Contract</a><br /><a onClick={this.toggleEnabled}>{this.state.enabled ? 'Disable' : 'Enable'}</a></span><br />
	    {this.state.enabled ? <Scribe store={store} fieldName={"name"}/> : <div>List Item extended {this.props.num}</div>}
        </div>;
    }
});


var SidebarComponent = React.createClass({
    render: function() {
        return (
        <div className='card-set'>
            <Well onClick={this.props.onClickHandler.bind(null, this.props.num)} bsSize='small' className={this.props.current === this.props.num ? 'card card-parent active' : 'card card-parent'} key={this.props.num}>
                <h6 className='card-label'>
                    Biological Strategy
                </h6>
                <h4 className='card-name'>
                    {this.props.data.name}
                    <br/>
                <small>

                </small>
              </h4>
            </Well>

        </div>
    );
    }
});

var Infinite = React.createClass({
    mixins: [store.mixin],
    getInitialState: function() {
        return { elements: [], data: [], index: 0 };
    },
    componentWillMount: function() {
        //actions.fetch('b.strategy', this.props.masterid);//'740c420618b1b9abb92630cdaff6e0dd');
	actions.getListPaginated('b.strategy', 0, 20, null, null, this.props.query);
    },

    componentWillReceiveProps: function(newProps) {
       if(this.props.query !== newProps.query) {
           console.log('new query: ' + newProps.query);
	   actions.getListPaginated('b.strategy', 0, 20, null, null, newProps.query);
       } else if(this.props.masterid !== newProps.masterid) {
           console.log("new masterid: " + newProps.masterid);
	   var index = _.findIndex(this.state.elements, function(item) {
               return item.masterid === newProps.masterid;
           }, this);
           console.log("index: " + index);
           this.setState({index: index});
       }

    },
    _onChange: function() {
        //var newElements = this.state.elements;
	var newElements = store.get();
	/*var newElements = _.map(store.get(), function(r) {
	    return <ListItem key={r.masterid} data={r} />;
	});*/
	//newElements[0] = <ListItem num={0} key={0} data={store.get()} />;
	var index = _.findIndex(newElements, function(item) {
	   //return item.props.data.masterid === this.props.masterid;
	   return item.masterid === this.props.masterid;
        }, this);
        this.setState({elements: newElements, data: store.get(), index: index === -1 ? 0 : index});
	var that = this;
	if(index === -1) {
	    setTimeout(function() { routeActions.setRoute("/infinite_demo/"+that.props.query+'/'+newElements[0].props.data.masterid);}, 300);
	}
    },
    setIndex: function(num) {
        this.setState({index: num});
    },
    render: function() {
        var i = 0;
        var that = this;
        var sidebarComponentList;
          sidebarComponentList = _.map(this.state.data, function(d) {
  	         return <SidebarComponent current={that.state.index} data={d} num={i++} onClickHandler={function(num) { that.setState({index: num});}} />;
        	});

        return (
            <DefaultLayout searchResultComponent={this.props.query === 'buoyancy' ? CustomSidebar : InfiniteList} searchResultElements={[]} searchResultHeight={100} searchQuery={this.props.query} searchQueryChange={function(t) {if(t.target.value) { routeActions.setRoute('/infinite_demo/'+t.target.value)}}}>
                    <InfiniteList query={this.props.query} itemComponent={ListItem} extendedItemComponent={BigListItem} elements={this.state.elements} itemHeight={2500} selectedItem={this.state.index} scrollCallback={function(num) {that.setState({index: num}); console.log("blah" + num)}} routeOnScroll={true} ListItem={ListItem} />
            </DefaultLayout>
            /* jshint ignore:end */

        );
    }
});

module.exports = Infinite;
