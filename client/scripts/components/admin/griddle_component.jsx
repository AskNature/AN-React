var React = require('react');
var Griddle = require('griddle-react');
var Link = require('../modules/link.jsx');

var RowLinkComponent = React.createClass({
    render: function() {
        url = "/"+ this.props.rowData["entityType"] + "/" + this.props.rowData["masterid"];
	return <Link url={url}>{this.props.data}</Link>
    }
});

var GriddleComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        return {
            "results": [{"name" : "Loading..."}],
            "currentPage": 0,
            "maxPages": 0,
            "externalResultsPerPage": 5,
            "externalSortColumn": null,
            "externalSortAscending": true,
	    "filter": false
        };
    },
    columnMeta: function() {
	return this.props.linkColumnName ? [
	    {
	        "columnName": this.props.linkColumnName,
	        "customComponent": RowLinkComponent
       	    },
	    {
	        "columnName": "masterid",
	        "visible": false
	    }
        ] : [];
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
	this.setState({"currentPage": index});
    },
    setPageSize: function(size) {
        this.setState({"externalResultsPerPage": size}, function() {
	    this.setPage(0);
	});
    },
    changeSort: function(sort, asc) {
        this.setState({"externalSortColumn" : sort, "externalSortAscending": asc}, function() {
	    this.setPage(0);
	});
    },
    setFilter: function(event) {
        console.log("set filter");
        this.setState({"filter": event.target.value});
	this.setPage(0);
    },
    resetFilterSort: function() {
        this.setState({"filter": false}, function() {
	    this.changeSort(null, true);
	});
    },
    render: function() {
        return <div>
	       <a onClick={this.resetFilterSort}>Reset</a>
	       <input type="text" value={this.state.filter} onChange={this.setFilter} />
	       <Griddle useExternal={true}
               externalSetPage={this.setPage}
               enableSort={true}
               columns={this.props.columns}
               externalSetPageSize={this.setPageSize}
               externalMaxPage={this.state.maxPages}
               externalChangeSort={this.changeSort}
               externalSetFilter={this.setFilter}
               externalCurrentPage={this.state.currentPage}
               results={this.state.results}
               tableClassName="table"
	       columnMetadata={this.columnMeta()}
               resultsPerPage={this.state.externalResultsPerPage}
               externalSortColumn={this.state.externalSortColumn}
               externalSortAscending={this.state.externalSortAscending} />
	       </div>
    },
    // Event handler for 'change' events coming from store mixin
    _onChange: function() {
        console.log("griddle store changed");
	this.setState(this.props.store.get());
    }
});

module.exports = GriddleComponent;