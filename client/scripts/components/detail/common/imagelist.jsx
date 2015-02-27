/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),

Link = require('../../modules/link.jsx'),

ListGroup = require('react-bootstrap').ListGroup,
ListGroupItem = require('react-bootstrap').ListGroupItem,
Glyphicon = require('react-bootstrap').Glyphicon;

var ImageList = React.createClass({
  render: function() {
    var items = this.props.items;
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
            items.name.map(function(item, i){
              var link = '../'+ routename +'/'+ items.id[i];
              var mediaurl = 'http://www.757angelsgroup.com/show/main-profile/wiki-image/20140518072131!Placeholder.png';
              var heroStyle = {
                backgroundImage: 'url(' + mediaurl + ')'
              };
              return (
                <Link url={link}>
                  <ListGroupItem className="minihero" style={heroStyle} key={i}>
                    <h6>{item}</h6>
                  </ListGroupItem>
                </Link>
              );
            })
          }
          <Link url="#">
            <ListGroupItem>
              <h6><Glyphicon glyph="plus" /> Connect your { this.props.entityname ? (<span>{this.props.entityname}</span>) : (<span>{title}</span>)}</h6>
            </ListGroupItem>
          </Link>
        </ListGroup>
      </div>
    );
  }
});

module.exports = ImageList;
