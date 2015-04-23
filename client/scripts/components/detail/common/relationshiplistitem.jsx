/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),
routeActions = require('../../../actions/routes'),
Link = require('../../modules/link.jsx'),

FontAwesome = require('react-fontawesome'),


Glyphicon = require('react-bootstrap').Glyphicon,
Button = require('react-bootstrap').Button,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
DropdownButton = require('react-bootstrap').DropdownButton,
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
      <div className={this.props.showOverlay ? 'focused minihero' : 'minihero'}>
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
        <div className='overlay'>
          <h6>{this.props.title}</h6>
          <Nav justified activeKey={0} bsStyle='pills' bsSize='large'>
            <NavItem
              eventKey={1}
              onClick={this.props.link}>
              <FontAwesome name='search' size='lg' fixedWidth />
            </NavItem>
            <NavItem eventKey={2}>
              <FontAwesome name='link' size='lg' fixedWidth />
            </NavItem>
            <DropdownButton eventKey={3} title={<FontAwesome name='ellipsis-v' size='lg' fixedWidth />} navItem={true} noCaret pullRight>
              <MenuItem eventKey='3.1' className='disabled'>Added by Username 2 weeks ago</MenuItem>
              <MenuItem eventKey='3.2'><FontAwesome name='flag' fixedWidth /> Report</MenuItem>
              {this.props.editable ? (
                <MenuItem eventKey='3.4' onClick={this.props.remove}><FontAwesome name='trash' fixedWidth /> Remove</MenuItem>
              ) : ''}
            </DropdownButton>

          </Nav>
        </div>
      </div>
    );
  }
});


var RelationshipListItem = React.createClass({

  getInitialState: function() {
    return {
      showOptions: false
    };
  },

  clickHandler: function(link) {
    routeActions.setRoute(link);
  },

  toggleOptions: function() {
    if(this.state.showOptions) {
      this.setState({showOptions: false});
    } else {
      this.setState({showOptions: true});
    }
  },
  showOptions: function() {
    if(!this.state.showOptions) {
      this.setState({showOptions: true});
    }
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
          <Button
            block
            onClick={this.showOptions}
            onMouseEnter={this.toggleOptions} onMouseLeave={this.toggleOptions}
            pullright >
            <MiniHero
              title={title}
              subtitle={subTitle}
              label={itemLabel}
              media={this.props.media}
              thumbs={this.props.item} link={this.clickHandler.bind(null,link)} masterid={item.masterid}
              showOverlay={this.state.showOptions}
              remove={this.props.onRemove.bind(null,item)}
              editable={this.props.editable} />
          </Button>
        </ButtonToolbar>
    );
  }
});

module.exports = RelationshipListItem;
