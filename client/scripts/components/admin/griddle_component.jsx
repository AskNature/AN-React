var React = require('react');
var Griddle = require('griddle-react');

var GriddleComponent = React.createClass({
    getInitialState: function() {
        return {
            "results": [{"name" : "Loading..."}],
            "currentPage": 0,
            "maxPages": 0,
            "externalResultsPerPage": 5,
            "externalSortColumn": null,
            "externalSortAscending": true
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
        this.props.actions.getListPaginated(index, this.state.externalResultsPerPage, this.state.externalSortColumn, this.state.externalSortAscending);
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
    setFilter: function(filter) {
        // TODO: set filter state
    },
    resetFilterSort: function() {
        this.changeSort(null, true);
	// TODO: reset filter state
    },
    render: function() {
        return <div>
	       <a onClick={this.resetFilterSort}>Reset</a>
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