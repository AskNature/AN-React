'use strict';

var React = require('react/addons'),

Griddle = require('griddle-react'),
_ = require('lodash'),
request = require('superagent'),

Link = require('../modules/link.jsx'),

Input = require('react-bootstrap').Input,
Button = require('react-bootstrap').Button,
Glyphicon = require('react-bootstrap').Glyphicon;

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
            i.src = 'http://www.asknature.org/images/uploads/' + this.props.rowData.media_entity + '/' + id + '/' + this.props.rowData.media;
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


var DrawerSearchComponent = React.createClass({
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
	    newProps.actions.getListPaginated(0, this.state.externalResultsPerPage, this.state.externalSortColumn, this.state.externalSortAscending, this.state.filter, 'b.strategy');
	    console.log('Griddle component will receive new props: ');
	    console.log(newProps.columns[1]);
	    that.setPage(0);
	});
    },
    setPage: function(index) {
        this.props.actions.getListPaginated(index, this.state.externalResultsPerPage, this.state.externalSortColumn, this.state.externalSortAscending, this.state.filter, 'b.strategy');
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

    render: function() {
      var cols = this.props.columns;
console.log(this.state);


      return (
        <div>
          <Input id='drawer-filter-input' type='text' placeholder='Search Strategies...' value={this.state.filter} onChange={this.setFilter} />
          <a onClick={this.resetFilterSort}>Reset</a><br />
          <div className='table-responsive'>
	           <Griddle useExternal={true}
               externalSetPage={this.setPage}
               enableSort={true}
               columns={['name']}
               externalSetPageSize={this.setPageSize}
               externalMaxPage={this.state.maxPages}
               externalChangeSort={this.changeSort}
               externalSetFilter={this.setFilter}
               externalCurrentPage={this.state.currentPage}
               results={this.state.results}
               tableClassName='table table-striped table-hover'
               externalSortColumn={this.state.externalSortColumn}
               externalSortAscending={this.state.externalSortAscending}
               useGriddleStyles={false}
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

}
});

module.exports = DrawerSearchComponent;
