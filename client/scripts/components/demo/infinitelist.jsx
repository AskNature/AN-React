'use strict';

var React = require('react');
var Infinite = require('react-infinite-extended');
var routeActions = require('../../actions/routes');

var _ = require('lodash');

var InfiniteList = React.createClass({
    getInitialState: function() {
        return {
            elements: this.props.elements,
            isInfiniteLoading: false,
            extendedHeight: 0,
            extendedBlock: undefined,
            extendedIndex: undefined,
            containerHeight: window.innerHeight - 70
        }
    },

    handleResize: function(e) {
        this.setState({containerHeight: window.innerHeight - 70});
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
	this.extend(0);
    },

    componentDidUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    componentWillReceiveProps: function(newProps) {
        var that = this;
	var i = 0;
        var newElements = _.map(newProps.elements, function(r) {
	    return <that.props.itemComponent key={r.masterid} data={r} heightUpdateListener={that.heightUpdateListener} num={i++} />;
	});
        this.setState({elements: newElements});
    },

    extendListener: function(num) {
        var that = this;
        return function() {
            console.log("extended " + num);
            that.extend(num);
        };
    },

    contractListener: function(num) {
        var that = this;
        return function() {
            console.log("contracted " + num);
            that.contract(num);
        };
    },

    heightUpdateListener: function(height, num) {
        console.log('heightupdatelistener' + height);
        if(num === this.state.extendedIndex) {
	    this.setState({extendedHeight: height-this.props.itemHeight});
	}
    },

    buildElements: function(start, end) {
        var elements = [];
        for (var i = start; i < end; i++) {
            elements.push(<this.props.itemComponent num={i} key={i} extendListener={this.extendListener} data={{name: i, media:[]}} />)
        }
        return elements;
    },

    handleInfiniteLoad: function() {
/*        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 1000);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 2500);*/
    },

    elementInfiniteLoad: function() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    },

    extend: function(num) {
        this.contract(this.state.extendedIndex);
        //this.state.elements[num] = <this.props.extendedItemComponent num={num} key={num} contractListener={this.contractListener} heightUpdateListener={this.heightUpdateListener} />;
        this.setState({extendedBlock: Math.floor((num*this.props.itemHeight)/125), extendedIndex: num});
    },

    contract: function(num) {
        if(num != undefined) {
            this.state.elements[num] = <this.props.itemComponent num={num} key={num} extendListener={this.extendListener} />;
            this.setState({extendedHeight: 0, extendedBlock: undefined, extendedIndex: undefined});
        }
    },

    scrollCallback: function(num) {
        console.log(num);
	console.log(this.state.elements[num].props.data.masterid);
	if(this.props.routeOnScroll) { routeActions.setRoute('/infinite_demo/'+this.props.query+'/'+this.state.elements[num].props.data.masterid);}
	if (this.props.scrollCallback) { this.props.scrollCallback(num) }
    },

    render: function() {
        return <div><Infinite elementHeight={this.props.itemHeight}
                         containerHeight={this.state.containerHeight}
                         infiniteLoadBeginBottomOffset={400}
                         onInfiniteLoad={this.handleInfiniteLoad}
                         extendedHeight={this.state.extendedHeight}
                         extendedBlock={this.state.extendedBlock}
                         extendedIndex={this.state.extendedIndex}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         preloadBatchSize={20}
			 className="infinite-list"
			 scrollNumberCallback={this.scrollCallback}
			 selectedItem={this.props.selectedItem}
                         >
            {this.state.elements}
        </Infinite></div>;
    }
});

module.exports = InfiniteList;
