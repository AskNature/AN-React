'use strict';

var React = require('react');
var Griddle = require('griddle-react');
var Link = require('../modules/link.jsx');
var Input = require('react-bootstrap').Input;

var RowLinkComponent = React.createClass({
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
        return (
          <div className='media'>
            <div className='media-left media-middle'>
              <Link url={url}>
                <img src={i.src} alt='Thumbnail' width='100px' height='auto' />
              </Link>
            </div>
          <div className='media-body'>
            <Link url={url}><strong>{this.props.data ? this.props.data : '<No Name>'}</strong></Link>
            </div>
          </div>
          );
    }
});

var ListComponent = React.createClass({
  render: function() {
    return(
      <ul>
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

var GriddleComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        return {
            'results': [{'name' : 'Loading...'}],
            'currentPage': 0,
            'maxPages': 0,
            'externalResultsPerPage': 10,
            'externalSortColumn': null,
            'externalSortAscending': true,
	           'filter': ''
        };
    },
    columnMeta: function() {
var meta, thumb_meta, list_meta;
           if( this.props.linkColumnName ) {
             meta =
              [{
      	        'columnName': this.props.linkColumnName,
      	        'customComponent': RowLinkComponent
         	    },
	            {
      	        'columnName': 'masterid',
      	        'visible': false
              }];
              if (this.props.thumb) {
                thumb_meta =
                [{
        	        'columnName': this.props.thumb[0],
        	        'visible': false
                },
                {
        	        'columnName': this.props.thumb[1],
        	        'visible': false
                },
                {
        	        'columnName': this.props.thumb[2],
        	        'visible': false
                }];
                meta = meta.concat(thumb_meta);
              }
              if (this.props.listColumns) {

                this.props.listColumns.map(function(list, i){
                    list_meta = [{
                      'columnName': list,
                      'customComponent': ListComponent
                    }];
                    meta = meta.concat(list_meta);
                });


              }
              return meta;
          }


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
      var cols = this.props.columns;

       if(this.props.thumb) {
        cols = cols.concat(this.props.thumb);
      }

      if(this.props.listColumns) {
       cols = cols.concat(this.props.listColumns);
     }
        return (
        <div>
          <Input type='text' placeholder='Filter List...' value={this.state.filter} onChange={this.setFilter} />
          <a onClick={this.resetFilterSort}>Reset</a>

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
	             columnMetadata={this.columnMeta()}
               externalSortColumn={this.state.externalSortColumn}
               externalSortAscending={this.state.externalSortAscending}
               useGriddleStyles={false}
 />
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
