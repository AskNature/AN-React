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
        {this.props.label ? (
          <h6 style={{color: '#ccc', textTransform:'uppercase', fontWeight: '800', marginBottom: 0}}>{this.props.label}</h6>
        ) : ''}
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
// This needs to be abstracted somehow:
  classTranslator: function(classname) {
    var trans = {
      'Strategy' :
        {
          'displayName' : 'Biological Strategy',
          'route' : 'strategy'
        },
      'InspiredSolutions' :
        {
          'displayName' : 'Designed Strategy',
          'route' : 'product'
        }
    };
    var lations;
    if(classname === 'Strategy') {
      lations = trans.Strategy;
    } else if(classname === 'InspiredSolutions') {
      lations = trans.InspiredSolutions;
    }
    return lations;
  },

  render: function() {
    var item = this.props.item;
    var routeName, itemLabel;
    if(this.props.routeName) {
      routeName = this.props.routeName;
    } else if(this.props.item['@class']){
      var translations = this.classTranslator(this.props.item['@class']);
      routeName = translations.route;
      itemLabel = translations.displayName;
    }
    function clickhandler() {
      window.setInterval(function(){scrollTo(0, 0);},10000);
    }
    var link = '../' + routeName + '/' + item.masterid;
    var title = this.props.titleField;
    var subTitle= this.props.subtitleField;
    if (routeName === 'b.system')  {
      title = 'Common Name';
      subTitle = this.props.item.taxon + ': ' + this.props.item.name;
    }
    return (
        <ButtonToolbar className='relationship-button'>
          <SplitButton
            title={<MiniHero title={title} subtitle={subTitle} label={itemLabel}/>}
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
