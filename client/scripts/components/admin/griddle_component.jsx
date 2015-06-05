'use strict';

var React = require('react/addons'),

Griddle = require('griddle-react'),
_ = require('lodash'),
request = require('superagent'),

TextArea = require('../detail/common/textarea.jsx'),
Link = require('../modules/link.jsx'),

FontAwesome = require('react-fontawesome'),

Input = require('react-bootstrap').Input,
Button = require('react-bootstrap').Button;

var LinkComponent = React.createClass({
    render: function() {
      console.log(this.props.rowData);
        var url = '/'+ this.props.rowData.entityType + '/' + this.props.rowData.masterid;
          var i = new Image();
          var id;
          if(this.props.rowData.media_id) {
            id = this.props.rowData.media_id;
          } else {
            id = this.props.rowData.masterid;
          }
          if(this.props.rowData.media) {
            i.src = this.props.rowData.media_url ? this.props.rowData.media_url : 'http://www.asknature.org/images/uploads/' + this.props.rowData.media_entity + '/' + id + '/' + this.props.rowData.media;
          } else if(this.props.rowData.first) {
            i.src = 'http://www.asknature.org/images/uploads/user/'+this.props.rowData.masterid+'/avatar/lg_avatar.jpg';
          } else {
            i.src = 'http://placehold.it/100x100';
          }
          var textstyle = {
            minWidth: '200px'
          };
        return (
          <div className='media'>
            <div className='media-left media-middle'>
              <Link url={url}>
                <img src={i.src} alt='Thumbnail' width='100px' height='auto' />
              </Link>
            </div>
          <div className='media-body' style={textstyle}>
            <Link url={url}><h5>{this.props.data ? this.props.data : '<No Name>'}</h5></Link>
            </div>
          </div>
          );
    }
});

var LongTextComponent = React.createClass({
  render: function() {
    var textstyle = {
      minWidth: '300px'
    };
    return(
      <p style={textstyle}>{this.props.data}</p>
    );
  }
});

var ListComponent = React.createClass({
  render: function() {
    var textstyle = {
      minWidth: '200px'
    };
    return(
      <ul style={textstyle}>
        {
          this.props.data.map(function(item, i){
            return (
              <li key={i}>{item}</li>
            );
          })
        }
      </ul>
    );
  }
});

var RadioComponent = React.createClass({
  render: function() {
    var status = false;
    //console.log(this.props.data);
    return (
      <div>
        <Input type='checkbox' checked={this.props.data} readOnly />
      </div>
    );
  }
});

var BulkComponent = React.createClass({
  render: function() {
    var status = false;
    //console.log(this.props.data);
    if(this.props.data === 1) {status = true;}
    var masterid = this.props.rowData.masterid;
    return (
      <div>
        <Input type='checkbox' checked={status} onChange={this.props.rowData.selectCallback.bind(null, masterid, status)} />
      </div>
    );
  }
});


var DateComponent = React.createClass({
  render: function() {
    var msec = Date.parse(this.props.data);
    var d = new Date(msec);
    return(
      <span>{d.toLocaleDateString()}</span>
    );
  }
});

var StatusComponent = React.createClass({
  render: function() {
    var style = {
      minWidth: '100px'
    };
    return(
      // This will just change the status. It may make more sense to include this in the normal status select input.
      <Input style={style} type="select" defaultValue="select">
        <option value="select" key="1">select</option>
        <option value="other" key="2">...</option>
      </Input>
    );
  }
});

var DeleteComponent = React.createClass({
  deleteItem: function() {
   // Todo: this belongs in the generic-list action file:
   var r = confirm('Do you really want to delete this record? This cannot be undone.');
   if(r) {
       var that = this;
        request
     .del('/api/v2/'+this.props.rowData.entityType+'/'+this.props.rowData.masterid)
     .end(function(res) {
         alert('Deleted!');
     });
   }
  },
  render: function() {
    return(
      <Button onClick={this.deleteItem} bsStyle="danger"><FontAwesome name='trash'  fixedWidth /></Button>
    );
  }
});

var EditComponent = React.createClass({
    render: function() {
      return(<Button onClick={this.props.rowData.editCallback.bind(null, this.props.rowData.masterid, this.props.rowData.edit)}><FontAwesome name={this.props.rowData.edit ? 'check' : 'pencil'}  fixedWidth /></Button>);
    }
});

var GriddleComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        var initialSort, initialSortOrder;
        if(this.props.initialSort) {
          initialSort = this.props.initialSort[0];
          initialSortOrder = this.props.initialSort[1];
        } else {
          initialSort = null;
          initialSortOrder = true;
        }
        return {
            'results': [{'name' : 'Loading...', 'deletebutton' : 0}],
	    'selectedItems': [],
	    'editingItem': null,
            'currentPage': 0,
            'maxPages': 0,
            'externalResultsPerPage': 15,
            'externalSortColumn': initialSort,
            'externalSortAscending': initialSortOrder,
	          'filter': ''
        };
    },

    componentWillMount: function() {
      this.inputCallback = _.debounce(function (e) {
        this.setPage(0);
        }, 500);
    },

    componentDidMount: function() {
        this.props.store.addChangeListener(this._onChange); // can't use conditional mixin
        this.setPage(0);
    },
    componentWillUnmount: function() {
        this.props.store.removeChangeListener(this._onChange); // can't use conditional mixin
    },
    componentWillReceiveProps: function(newProps) {
        this.props.store.removeChangeListener(this._onChange);
	newProps.store.addChangeListener(this._onChange);
	var that = this;
	this.setState({'results': [{'name' : 'Loading...', 'deletebutton' : 0}]}, function() {
	    newProps.actions.getListPaginated(0, this.state.externalResultsPerPage, this.state.externalSortColumn, this.state.externalSortAscending, this.state.filter);
	    console.log('Griddle component will receive new props: ');
	    console.log(newProps.columns[1]);
	    that.setPage(0);
	});
    },
    setPage: function(index) {
        Pace.restart();
        this.props.actions.getListPaginated(index, this.state.externalResultsPerPage, this.state.externalSortColumn, this.state.externalSortAscending, this.state.filter);
	this.setState({'currentPage': index});
    },
    setPageSize: function(size) {
        this.setState({'externalResultsPerPage': size}, function() {
	    this.setPage(0);
	});
    },
    changeSort: function(sort, asc) {
        if(sort !== 'selected') {
	    this.setState({'externalSortColumn' : sort, 'externalSortAscending': asc}, function() {
	        this.setPage(0);
	    });
	}
    },

    setFilter: function (e) {
        e.persist();
        this.setState({'filter': event.target.value});
        this.inputCallback(e);
    },

    resetFilterSort: function() {
        this.setState({'filter': '', 'selectedItems': []}, function() {
	    this.changeSort(null, true);
	});
   },
   deleteSelectedItems: function() {
    // Todo: this belongs in the generic-list action file:
      var that = this;
     	request
    .del('/api/v2/'+this.props.slug)
    .send({delete: this.state.selectedItems})
    .end(function(res) {
        that.setPage(that.state.currentPage);
    });
   },
    render: function() {
      var cols = ['selected', 'edit'];
      var meta = [{columnName: 'selected', displayName: 'Select', visible:true, customComponent: BulkComponent, locked: true}, {columnName: 'edit', visible:false, customComponent: EditComponent, locked: true},{columnName: 'editCallback', visible: false},{columnName: 'selectCallback', visible:false}];
      var add_meta, add_cols;
      if( this.props.columns ) {
        this.props.columns.map(function(list){
          var custom = null;
          var vis = true;
          if(list.type === 'id' || list.type === 'hidden') {
            vis = false;
          } else if(list.type === 'link') {
            custom = LinkComponent;
          } else if(list.type === 'list') {
            custom = ListComponent;
          } else if(list.type === 'date') {
            custom = DateComponent;
          } else if(list.type === 'boolean') {
            custom = RadioComponent;
          }
          else if(list.type === 'longtext') {
            custom = LongTextComponent;
          }
          add_meta = [{
            'columnName': list.columnName,
            'displayName': list.displayName,
            'customComponent': custom,
            'visible': vis
          }];
          cols = cols.concat(list.columnName);
          meta = meta.concat(add_meta);
        });
      }

      if (this.props.thumb) {
        this.props.thumb.map(function(list){
          add_meta = [{
              'columnName': list,
              'visible': false
            }];
          cols = cols.concat(list);
          meta = meta.concat(add_meta);
        });
      }

      add_cols = ['status'];
      add_meta = [{columnName: 'status', displayName: 'Status', visible:true, locked:true}];
      cols = cols.concat(add_cols);
      meta = meta.concat(add_meta);

      // Only admins can delete
      if(this.props.credentials === true) {
        add_cols = ['deletebutton'];
        add_meta = [{columnName: 'deletebutton', displayName: 'Delete', visible: true, customComponent: DeleteComponent, locked:true}];
        cols = cols.concat(add_cols);
        meta = meta.concat(add_meta);
      }

      return (
        <div className='griddle-card'>
          <Input id='filter-input' type='text' placeholder='Filter List...' value={this.state.filter} onChange={this.setFilter} />
          <a onClick={this.resetFilterSort}>Reset</a><br />
	  <span>{this.state.selectedItems.length} item{this.state.selectedItems.length === 1 ? '' : 's'} selected.
    {this.props.credentials === true ? (
      <a onClick={this.deleteSelectedItems}>Delete these items.</a>
      ) : ''}</span>
          <div className='table-responsive'>
	           <Griddle useExternal={true}
               externalSetPage={this.setPage}
               enableSort={true}
               columns={cols}
               externalSetPageSize={this.setPageSize}
               externalMaxPage={this.state.maxPages}
               externalChangeSort={this.changeSort}
               externalSetFilter={this.setFilter}
               externalCurrentPage={this.state.currentPage}
               results={this.state.results}
               tableClassName='table table-striped table-hover'
	             columnMetadata={meta}
               externalSortColumn={this.state.externalSortColumn}
               externalSortAscending={this.state.externalSortAscending}
               useGriddleStyles={false}
               showSettings={true}
               sortAscendingComponent={<span> <FontAwesome name='sort-desc'  fixedWidth /></span>}
               sortDescendingComponent={<span> <FontAwesome name='sort-asc'  fixedWidth /></span>}
               nextIconComponent={<span> <FontAwesome name='chevron-right'  fixedWidth /></span>}
               previousIconComponent={<span><FontAwesome name='chevron-left'  fixedWidth /> </span>}
               noDataMessage={"No data could be found."}
 />
          </div>
	       </div>
       );
    },
    // Event handler for 'change' events coming from store mixin
    _onChange: function() {
        console.log('griddle store changed');
	var state = this.props.store.get();
	//state.results.splice(0,0,{masterid: "new", name: "new component", callback: function() { console.log("called! hah!")}});
	state.results = _.map(state.results, function(s) {
	    var c = s;
	    c.selected = (_.indexOf(this.state.selectedItems, s.masterid) === -1 ? 0 : 1);
      c.deletebutton = 0;
	    c.edit = this.state.editingItem == s.masterid;
	    var that = this;
	    c.selectCallback = function(masterid, status) {
	        console.log('selected ' + masterid + '!');
		if(status) {
		    that.setState({selectedItems: _.difference(that.state.selectedItems, [masterid])}, function() {
		        console.log(that.state.selectedItems);
			that.props.store.emitChange();
		    })
		    console.log('was checked');
		} else {
		    that.setState({selectedItems: _.union(that.state.selectedItems, [masterid])}, function() {
		        that.props.store.emitChange();
		    });
		    console.log('was not checked');
		}
	    };
	    c.editCallback = function(masterid, edit) {
	        console.log('called edit on ' + masterid);
		that.setState({editingItem: (edit ? '' : masterid)}, function() {
		    that.props.store.emitChange();
		});
	    };
	    return c;
	}, this);
	this.setState(state);
}
});

module.exports = GriddleComponent;
