/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),
Link = require('../modules/link.jsx'),
ListGroupItem = require('react-bootstrap').ListGroupItem;

var RelationshipListItem = React.createClass({
  render: function() {
    var item = this.props.item;
    var routeName = this.props.routeName;
    function clickhandler() {
      window.setInterval(function(){scrollTo(0, 0);},200);
    }
    var link = '../' + routeName + '/' + item.masterid;
    var mediaurl = 'http://www.757angelsgroup.com/show/main-profile/wiki-image/20140518072131!Placeholder.png';
    var heroStyle = {
        backgroundImage: 'url(' + mediaurl + ')'
    };
    return (
        <Link url={link}>
            <ListGroupItem className="minihero" style={heroStyle}>
                <h6>{item.name}</h6>
            </ListGroupItem>
        </Link>
    );
  }
});

module.exports = RelationshipListItem;
