'use strict';

var React = require('react');
var Griddle = require('griddle-react');
var Link = require('../modules/link.jsx');
var Input = require('react-bootstrap').Input;
var Glyphicon = require('react-bootstrap').Glyphicon;

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
              <li>{item}</li>
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
    console.log(this.props.data);
    if(this.props.data === 1) {status = true;}

    return (
      <div>
        <Input type='checkbox' checked={status} readOnly />
      </div>
    );
  }
});

var SelectComponent = React.createClass({
  render: function() {
    return (
      <div>
        <Input type="select" label='Select' defaultValue="select">
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
            'results': [{'name' : 'Loading...'}],
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
        this.setState({'externalSortColumn' : sort, 'externalSortAscending': asc}, function() {
	    this.setPage(0);
	});
    },
    setFilter: function(event) {
        console.log('set filter');
        this.setState({'filter': event.target.value});
	this.setPage(0);
    },
    resetFilterSort: function() {
        this.setState({'filter': ''}, function() {
	    this.changeSort(null, true);
	});
    },
    render: function() {
      var cols = [];
      var meta = [];
      var add_meta;

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
      return (
        <div>
          <Input type='text' placeholder='Filter List...' value={this.state.filter} onChange={this.setFilter} />
          <a onClick={this.resetFilterSort}>Reset</a>
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
               sortAscendingComponent={<span> <Glyphicon glyph="sort-by-alphabet" /></span>}
               sortDescendingComponent={<span> <Glyphicon glyph="sort-by-alphabet-alt" /></span>}
               nextIconComponent={<span> <Glyphicon glyph="chevron-right" /></span>}
               previousIconComponent={<span><Glyphicon glyph="chevron-left" /> </span>}
               noDataMessage={"No data could be found."}
 />
          </div>
	       </div>
       );
    },
    // Event handler for 'change' events coming from store mixin
    _onChange: function() {
        console.log('griddle store changed');
	this.setState(this.props.store.get());
    }
});

module.exports = GriddleComponent;
