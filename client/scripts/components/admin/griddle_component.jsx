'use strict';

var React = require('react/addons'),

Griddle = require('griddle-react'),
_ = require('lodash'),
request = require('superagent'),

TextArea = require('../detail/common/textarea.jsx'),
Link = require('../modules/link.jsx'),

Input = require('react-bootstrap').Input,
Button = require('react-bootstrap').Button,
Glyphicon = require('react-bootstrap').Glyphicon;

var LinkComponent = React.createClass({
    render: function() {
        var url = '/'+ this.props.rowData.entityType + '/' + this.props.rowData.masterid;
          var i = new Image();
          if(this.props.rowData.media) {
            i.src = 'http://www.asknature.org/images/uploads/' + this.props.rowData.media_entity + '/' + this.props.rowData.media_id + '/' + this.props.rowData.media;
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
            <Link url={url}><strong>{this.props.data ? this.props.data : '<No Name>'}</strong></Link>
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
    if(this.props.data === 1) {status = true;}
    return (
      <div>
        <Input type='checkbox' checked={status} readOnly />
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

var SelectComponent = React.createClass({
  render: function() {
    var style = {
      minWidth: '100px'
    };
    return (
      <div>
        <Input style={style} type="select" label='Select' defaultValue="select">
          <option value="select">select</option>
          <option value="other">...</option>
        </Input>
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
        <option value="select">select</option>
        <option value="other">...</option>
      </Input>
    );
  }
});

var DeleteComponent = React.createClass({
  render: function() {
    return(
      <Button bsStyle="danger"><Glyphicon glyph="trash" /></Button>
    );
  }
});

var EditComponent = React.createClass({
    render: function() {
      return(<Button onClick={this.props.rowData.editCallback.bind(null, this.props.rowData.masterid, this.props.rowData.edit)}><Glyphicon glyph={this.props.rowData.edit ? 'check' : 'pencil'} /></Button>);
    }
});

var DataLoader = React.createClass({
    render: function() {
      return(
      <h3>Binary Solo</h3>
      );
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
    },
    componentDidMount: function() {
        this.props.store.addChangeListener(this._onChange); // can't use conditional mixin
        this.setPage(0);
    },
    componentWillUnmount: function() {
        this.props.store.removeChangeListener(this._onChange); // can't use conditional mixin
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
        if(sort != 'selected') {
	    this.setState({'externalSortColumn' : sort, 'externalSortAscending': asc}, function() {
	        this.setPage(0);
	    });
	}
    },
    setFilter: function(event) {
        console.log('set filter');
        this.setState({'filter': event.target.value});
	this.setPage(0);
    },
    resetFilterSort: function() {
        this.setState({'filter': '', 'selectedItems': []}, function() {
	    this.changeSort(null, true);
	});
   },
   deleteSelectedItems: function() {
    // Doesn't this belong in an action file?
    var that = this;
   	request
	.del('/api/v2/strategies')
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
      add_meta = [{columnName: 'status', displayName: 'Status', visible:true, customComponent: StatusComponent, locked:true}];
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
        <div>
          <Input
            type='text'
            placeholder='Filter List...'
            value={this.state.filter}
            onChange={this.setFilter} />
          <a onClick={this.resetFilterSort}>Reset</a>
          <br />

          <span>
            {this.state.selectedItems.length} item{this.state.selectedItems.length === 1 ? '' : 's'} selected. <a onClick={this.deleteSelectedItems}>
            Delete these items.
          </a>
        </span>
        <div className='table-responsive'>

          <Griddle
            useExternal={true}
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
            sortAscendingComponent={
              <span>
                <Glyphicon glyph="sort-by-alphabet" />
              </span>
            }
            sortDescendingComponent={
              <span>
                <Glyphicon glyph="sort-by-alphabet-alt" />
              </span>
            }
            nextIconComponent={
              <span>
                <Glyphicon glyph="chevron-right" />
              </span>
            }
            previousIconComponent={
              <span>
                <Glyphicon glyph="chevron-left" />
              </span>
            }
            noDataMessage={"No data could be found."}
            externalLoadingComponent={
              <DataLoader />
            }
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
	    console.log('test');
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
