/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),

ListGroup = require('react-bootstrap').ListGroup,
ListGroupItem = require('react-bootstrap').ListGroupItem,
Glyphicon = require('react-bootstrap').Glyphicon;

var getState = function() {
    return (
        {
	    items: [
	        {id: "one", name:"One"},
	        {id:"two", name:"Twso"}
	    ]
	}
    );
};

var ImageList = React.createClass({
  getInitialState: function() {
    return getState();
  },
  
  render: function() {
    var items = this.state.items;
    var routename = this.props.routename;
    var title = this.props.title;
    function clickhandler() {
      window.setInterval(function(){scrollTo(0, 0);},200);
    }
    return (
      <div>
        <h6><strong>{title}</strong></h6>
        <ListGroup>
          {
            items.map(function(item, i){
              var link = '../'+ routename +'/'+ item.id;
              var mediaurl = 'http://www.757angelsgroup.com/show/main-profile/wiki-image/20140518072131!Placeholder.png';
              var heroStyle = {
                backgroundImage: 'url(' + mediaurl + ')'
              };
              return (
                <Link url={link}>
                  <ListGroupItem className="minihero" style={heroStyle} key={i}>
                    <h6>{item.name}</h6>
                  </ListGroupItem>
                </Link>
              );
            })
          }
          <Link url="#">
            <ListGroupItem style={{"height": "50px", "padding-top": "5px"}}>
              <h6><Glyphicon glyph="plus" /> Connect your { this.props.entityname ? (<span>{this.props.entityname}</span>) : (<span>{title}</span>)}</h6>
            </ListGroupItem>
          </Link>
        </ListGroup>
      </div>
    );
  }
});

module.exports = ImageList;
