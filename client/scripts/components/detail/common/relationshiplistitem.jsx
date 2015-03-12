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
      <div style={{background: 'rgba(255,255,255,0.7)', margin: '-13px -16px', padding: '0px 15px', height: '80px', overflow:'hidden', borderTopLeftRadius:'2px', borderBottomLeftRadius:'2px'}}>
        <h6 style={{marginTop: '9px', overflow:'hidden', whiteSpace:'normal'}}><strong>{this.props.title}</strong><br/>{this.props.subtitle}</h6>

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
            title={<MiniHero title={this.props.titleField} subtitle={this.props.subtitleField} />}
            href={link}
            style={{backgroundImage: 'url(' + mediaurl + ')'}}
            pullright>
            <MenuItem eventKey="1"><Glyphicon glyph='flag' /> Flag</MenuItem>
            <MenuItem eventKey="2" onClick={this.props.onRemove.bind(null, item)}><Glyphicon glyph='remove' /> Remove</MenuItem>
          </SplitButton>
        </ButtonToolbar>
    );
  }
});

module.exports = RelationshipListItem;
