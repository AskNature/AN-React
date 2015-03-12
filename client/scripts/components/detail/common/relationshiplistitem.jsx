/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),
Link = require('../../modules/link.jsx'),

Glyphicon = require('react-bootstrap').Glyphicon,
SplitButton = require('react-bootstrap').SplitButton,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
MenuItem = require('react-bootstrap').MenuItem;

var MiniHero = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.title}
      </div>
    );
  }
});


var RelationshipListItem = React.createClass({
  render: function() {
    var item = this.props.item;
    var routeName = this.props.routeName;
    function clickhandler() {
      window.setInterval(function(){scrollTo(0, 0);},10000);
    }
    var link = '../' + routeName + '/' + item.masterid;
    var mediaurl = 'http://www.757angelsgroup.com/show/main-profile/wiki-image/20140518072131!Placeholder.png';
    return (
        <ButtonToolbar className='relationship-button'>
          <SplitButton
            title={<MiniHero title={item.name} />}
            href={link}
            style={{backgroundImage: 'url(' + mediaurl + ')'}}
            pullright>
            <MenuItem eventKey="1">Flag</MenuItem>
            <MenuItem eventKey="2" onClick={this.props.onRemove.bind(null, item)}><Glyphicon glyph='remove' />Remove</MenuItem>
          </SplitButton>
        </ButtonToolbar>
    );
  }
});

module.exports = RelationshipListItem;
