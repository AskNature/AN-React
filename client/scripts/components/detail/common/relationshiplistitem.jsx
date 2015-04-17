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
    var thumburl;
    if(this.props.media) {
      if(this.props.thumburl) {
        thumburl = this.props.thumburl;
      } else {
        thumburl = 'http://placehold.it/100x100';
      }
    }
    return (
      <div className='minihero'>
        {this.props.media ? (
          <img src={thumburl} width='100px' height='auto' />
        ) : ''}
        {this.props.label ? (
          <h6 className='card-label'>{this.props.label}</h6>
        ) : ''}
        <h4 className='card-name'>
            {this.props.title}
          <br/>
          <small>{this.props.subtitle}</small>
        </h4>

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
          'route' : 'b.strategy'
        },
      'InspiredSolutions' :
        {
          'displayName' : 'Designed Strategy',
          'route' : 'd.strategy'
        },
      'Context' :
        {
          'displayName' : 'Context',
          'route' : 'context'
        },
        'Function' :
          {
            'displayName' : 'Function & Mechanism',
            'route' : 'fm'
          },
      'Story' :
        {
          'displayName' : 'Story',
          'route' : 'story'
        },
      'Sources' :
        {
          'displayName' : 'Reference Source',
          'route' : 'source'
        },
      'User' :
        {
          'displayName' : 'Original User',
          'route' : '1user'
        }
    };
    var lations;
    if(classname === 'Strategy') {
      lations = trans.Strategy;
    } else if(classname === 'InspiredSolutions') {
      lations = trans.InspiredSolutions;
    } else if(classname === 'Function') {
        lations = trans.Function;
    } else if(classname === 'Context') {
      lations = trans.Context;
    } else if(classname === 'Story') {
      lations = trans.Story;
    } else if(classname === 'Source') {
      lations = trans.Sources;
    } else if(classname === 'Users') {
      lations = trans.User;
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
    if (routeName === 'media') {
      subTitle = this.props.item.description;
    }
    return (
        <ButtonToolbar className='relationship-button'>
          <SplitButton
            title={<MiniHero title={title} subtitle={subTitle} label={itemLabel} media={this.props.media} thumbs={this.props.item} masterid={item.masterid}/>}
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
