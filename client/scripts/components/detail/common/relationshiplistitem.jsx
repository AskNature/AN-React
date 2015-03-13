/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),
routeActions = require('../../../actions/routes'),
Link = require('../../modules/link.jsx'),



Glyphicon = require('react-bootstrap').Glyphicon,
SplitButton = require('react-bootstrap').SplitButton,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
MenuItem = require('react-bootstrap').MenuItem;

var MiniHero = React.createClass({
  render: function() {
    return (
      <div className='minihero'>
        <h5 style={{marginTop: '9px', overflow:'hidden', whiteSpace:'normal'}}>
            {this.props.title}
          <br/>
          <small>{this.props.subtitle}</small>
        </h5>

      </div>
    );
  }
});


var RelationshipListItem = React.createClass({
  setFlag: function() {
    alert('Flagged!');
    console.log('Flagged');
  },

  clickHandler: function(link) {
    routeActions.setRoute(link);
  },

  render: function() {
    var item = this.props.item;
    var routeName = this.props.routeName;
    function clickhandler() {
      window.setInterval(function(){scrollTo(0, 0);},10000);
    }
    var link = '../' + routeName + '/' + item.masterid;

    return (
        <ButtonToolbar className='relationship-button'>
          <SplitButton
            title={<MiniHero title={this.props.titleField} subtitle={this.props.subtitleField} />}
            onClick={this.clickHandler.bind(null,link)}
            pullright>
            <MenuItem eventKey="1" onClick={this.setFlag}><Glyphicon glyph='flag' /> Flag</MenuItem>
            {this.props.editable ? (
              <MenuItem eventKey="2" onClick={this.props.onRemove.bind(null, item)}><Glyphicon glyph='remove' /> Remove</MenuItem>
            ) : (
              <MenuItem eventKey="2" className='disabled'><Glyphicon glyph='remove' /> Remove</MenuItem>
            ) }
          </SplitButton>
        </ButtonToolbar>
    );
  }
});

module.exports = RelationshipListItem;
