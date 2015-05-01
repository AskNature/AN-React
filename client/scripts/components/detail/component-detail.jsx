'use strict';

var React = require('react'),

/** Sends outgoing requests to an action */
actions = require('../../actions/generic-detail'),

/** Gets incoming information from the store */
store = require('../../stores/generic-detail'),
accountStore = require('../../stores/accounts'),

DefaultLayout = require('../layouts/default.jsx'),
DataTable = require('./common/datatable.jsx'),

Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),

CollectionDetail = require('./detail-collection.jsx'),
ContextDetail = require('./detail-context.jsx'),
BSystemDetail = require('./detail-bsystem.jsx'),
DSystemDetail = require('./detail-dsystem.jsx'),
MediaDetail = require('./detail-media.jsx'),
FMDetail = require('./detail-fm.jsx'),
DStrategyDetail = require('./detail-dstrategy.jsx'),
ResearcherDetail = require('./detail-researcher.jsx'),
SourceDetail = require('./detail-source.jsx'),
BStrategyDetail = require('./detail-bstrategy.jsx'),
UserDetail = require('./detail-user.jsx'),
OneUserDetail = require('./detail-1user.jsx'),
StoryDetail = require('./detail-story.jsx');


var getState = function() {
  return {
    object: store.get(),
    loaded: store.getLoaded(),
    error: store.getError(),
    user: accountStore.get(),
    windowHeight: window.innerHeight
  };
};
/** The loading state and component could proably be moved to ../layouts/default.jsx */
var Loader = React.createClass({
  render: function() {
    return (
      <div className={this.props.error ? 'loader-bg error' : 'loader-bg'} style={{height: this.props.windowHeight}}>
        <div className="loader">
          <div className="sk-spinner sk-spinner-chasing-dots">
            <div className="sk-dot1"></div>
            <div className="sk-dot2"></div>
          </div>
        </div>
      </div>
    );
  }
});

var DetailComponent = React.createClass({

      mixins: [store.mixin, accountStore.mixin],

      getInitialState: function() {
          return (
            getState()
          );
      },

      handleResize: function(e) {
        this.setState({windowHeight: window.innerHeight});
      },

      componentWillMount: function(){
          var that = this;
          actions.fetch(this.props.type,this.props.masterid);
	  if(this.props.masterid === 'new'){
              setTimeout(function() {
	          actions.create(that.props.type);
	      }, 1);
	      var newState = getState();
	      newState.editable = true;
	      this.setState(newState);
          }
          window.addEventListener('resize', this.handleResize);
      },

      componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
      },

      _onChange: function() {
          this.setState(getState());
	  var isOutsideDemo = (this.state.user.status && this.state.user.status.masterid === 'demo' && !this.state.object.flag_demo) ? true : false;
	  this.setState({'masterid': store.getMasterid(), 'error':isOutsideDemo, 'loaded':!isOutsideDemo}); // TODO: replace this loaded/error with proper message
      },
      onRelationshipAdd: function(field, addedValue) {
          console.log(field + ' added ' + addedValue);
          actions.addRelationship(field, addedValue);
      },
      onRelationshipRemove: function(field, removedValue) {
          console.log(field + ' removed ' + removedValue);
          actions.removeRelationship(field, removedValue);
      },
      onRelationshipSet: function(field, newValue) {
          console.log('component-detail: ' + field + ' set to ' + newValue);
          actions.setRelationship(field, newValue);
      },
      onBooleanSet: function(e) {
        e.persist();
        console.log('component-detail: ' + e.target.id + ' set to ' + e.target.checked);
        var updatedStuff = {};
        updatedStuff[e.target.id] = e.target.checked;
        actions.update(updatedStuff);
      },
      toggleEditable: function(e) {
          e.preventDefault();
          if(this.state.editable === true) {
            actions.fetch(this.props.type, this.props.masterid);
            this.setState({editable: false});
          } else if(this.state.user.role === 'admin') {
            this.setState({editable: true});
          } else {
            alert('You don\'t have permission to edit this.');
          }
      },
      editBegin: function(e) {
          e.preventDefault();
          if(this.state.user.role !== 'admin') { this.setState({editable: true}); }
      },
      editCancel: function(e) {
          e.preventDefault();
          actions.fetch(this.props.type, this.props.masterid);
          this.setState({editable: false});
      },
      editFinish: function(e) {
          e.preventDefault();
          actions.commit();
          this.setState({editable: false});
      },
      onDelete: function() {
          var r = confirm('Do you really want to delete this record?');
          if(r) {actions.del(this.props.type, this.props.masterid);}
      },
      //This is a temporary solution until something cleaner replaces it.
      getTemplate: function() {
        var Template;
        if(this.props.type === 'b.strategy') {
          Template = BStrategyDetail;
        } else if(this.props.type === 'd.strategy') {
          Template = DStrategyDetail;
        } else if(this.props.type === 'fm') {
          Template = FMDetail;
        } else if(this.props.type === 'users') {
          Template = UserDetail;
        }  else if(this.props.type === '1users') {
            Template = OneUserDetail;
        } else if(this.props.type === 'collections') {
          Template = CollectionDetail;
        } else if(this.props.type === 'context') {
          Template = ContextDetail;
        } else if(this.props.type === 'b.system') {
          Template = BSystemDetail;
        } else if(this.props.type === 'd.system') {
          Template = DSystemDetail;
        } else if(this.props.type === 'media') {
          Template = MediaDetail;
        } else if(this.props.type === 'researchers') {
          Template = ResearcherDetail;
        } else if(this.props.type === 'sources') {
          Template = SourceDetail;
        } else if(this.props.type === 'story') {
          Template = StoryDetail;
        }
        /*if(this.state.loaded === false) {
          actions.fetch(this.props.type,this.props.masterid);
        }*/
        return Template;
      },
    render: function() {
      var Template = this.getTemplate();
      var style;
      var loader = [];
      if (!this.state.loaded) {
        style = {position: 'relative', WebkitFilter: 'blur(2px) saturate(2)', height: this.state.windowHeight - 62, overflow: 'hidden'};
        loader.push(
          <Loader windowHeight={this.state.windowHeight - 22} error={this.state.error ? true : false} />
        );
      }
        return (
            <DefaultLayout master={this.props.masterid}>
                {loader}
                <div style={style} className='detail-single'>
                <Template
                    masterid={this.props.masterid !== 'new' ? this.props.masterid : null}
                    type={this.props.type}
                    data={this.state.object}
                    loaded={this.state.loaded}
                    user={this.state.user}
                    editable={this.state.editable}
                    store={store}
                    actions={actions}
                    editBegin={this.editBegin}
                    toggleEditable={this.toggleEditable}
                    editFinish={this.editFinish}
                    editCancel={this.editCancel}
                    onDelete={this.onDelete}
                    onRelationshipAdd={this.onRelationshipAdd}
                    onRelationshipRemove={this.onRelationshipRemove}
		                onRelationshipSet={this.onRelationshipSet}
                    onBooleanSet={this.onBooleanSet} />
                  {this.state.user.role === 'admin' ? (
                    <PanelGroup defaultActiveKey='0' accordion>
                      <Panel header='Table View' eventKey='1'>
                        <DataTable data={this.state.object} editable={this.state.editable} actions={actions} store={store}/>
                      </Panel>
                    </PanelGroup>
                  ) : '' }
                </div>

           </DefaultLayout>
        );
    },
    componentWillReceiveProps: function (newProps) {
        console.log('loading new props');
	actions.initialize(newProps.type, {masterid: newProps.masterid});
        if(newProps.masterid !== 'new') {
            actions.fetch(newProps.type,newProps.masterid);
	    this.setState({editable: false, loaded: false});
        } else if(newProps.masterid === 'new'){
            actions.create(newProps.type);
            this.setState({editable: true});
        }
        //this.setState(getState());
  }
});

module.exports = DetailComponent;
