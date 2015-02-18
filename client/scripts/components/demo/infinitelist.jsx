var React = require('react');
var Infinite = require('react-infinite-extended');

var ListItem = React.createClass({
    render: function() {
        return <div className="infinite-list-item" style={{height: "100px", "border-bottom": "1px solid #ddd", cursor: "pointer"}} onClick={this.props.extendListener(this.props.num)}>
        List Item {this.props.num}
        </div>;
    }
});

var BigListItem = React.createClass({
    componentDidMount: function() {
        console.log(this.getDOMNode().offsetHeight);
        this.props.heightUpdateListener(this.getDOMNode().offsetHeight);
    },
    render: function() {
	return <div className="infinite-list-item" style={{height: "300px", "border-bottom": "1px solid #ddd", cursor: "pointer", "font-size": "32px"}} onClick={this.props.contractListener(this.props.num)}>
	List Item extended {this.props.num}
	</div>;
    }
});

var InfiniteList = React.createClass({
    getInitialState: function() {
        return {
            elements: this.buildElements(0, 20),
            isInfiniteLoading: false,
            extendedHeight: 0,
            extendedBlock: undefined,
            extendedIndex: undefined
        }
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

    heightUpdateListener: function(height) {
        this.setState({extendedHeight: height-100});
    },
 
    buildElements: function(start, end) {
        var elements = [];
        for (var i = start; i < end; i++) {
            elements.push(<ListItem num={i} key={i} extendListener={this.extendListener} />)
        }
        return elements;
    },
 
    handleInfiniteLoad: function() {
        var that = this;
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
        }, 2500);
    },
 
    elementInfiniteLoad: function() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    },

    extend: function(num) {
        this.contract(this.state.extendedIndex);
        this.state.elements[num] = <BigListItem num={num} key={num} contractListener={this.contractListener} heightUpdateListener={this.heightUpdateListener} />;
        this.setState({extendedBlock: Math.floor((num*100)/125), extendedIndex: num});
    },

    contract: function(num) {
        if(num != undefined) {
            this.state.elements[num] = <ListItem num={num} key={num} extendListener={this.extendListener} />;
            this.setState({extendedHeight: 0, extendedBlock: undefined, extendedIndex: undefined});
        }
    },
 
    render: function() {
        return <div><Infinite elementHeight={100}
                         containerHeight={window.innerHeight - 74}
                         infiniteLoadBeginBottomOffset={400}
                         onInfiniteLoad={this.handleInfiniteLoad}
                         extendedHeight={this.state.extendedHeight}
                         extendedBlock={this.state.extendedBlock}
                         extendedIndex={this.state.extendedIndex}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         preloadBatchSize={125}
                         >
            {this.state.elements}
        </Infinite></div>;
    }
});

module.exports = InfiniteList;
