'use strict';

var React = require('react/addons'),

Link = require('./link.jsx'),

FontAwesome = require('react-fontawesome'),
Nav = require('react-bootstrap').Nav,
Well = require('react-bootstrap').Well,
TabbedArea = require('react-bootstrap').TabbedArea,
TabPane = require('react-bootstrap').TabPane;

var listItems = [
    {
        'label' : 'Biological Systems',
        'slug' : 'b.system',
        'faIcon' : 'tree',
    },
    {
        'label' : 'Designed Systems',
        'slug' : 'd.system',
        'faIcon' : 'cubes'
    },
    {
        'class' : 'divider'
    },
    {
        'label' : 'Biological Strategies',
        'slug' : 'b.strategy',
        'faIcon' : 'leaf'
    },
    {
        'label' : 'Bio-inspired Strategies',
        'slug' : 'd.strategy',
        'faIcon' : 'recycle'
    },
    {
        'class' : 'divider'
    },
    {
        'label' : 'Functions & Mechanisms',
        'slug' : 'fm',
        'faIcon' : 'fire'
    },
    {
        'label' : 'Contexts',
        'slug' : 'context',
        'faIcon' : 'cloud'
    },
    {
        'label' : 'Collections',
        'slug' : 'collections',
        'faIcon' : 'bookmark'
    },
    {
        'class' : 'divider'
    },
    {
        'label' : 'Stories',
        'slug' : 'story',
        'faIcon' : 'newspaper-o'
    },
    {
        'label' : 'Sources',
        'slug' : 'sources',
        'faIcon' : 'book'
    },
    {
        'label' : 'Citations',
        'slug' : '#',
        'faIcon' : 'quote-left'
    },
    {
        'label' : 'R&D Teams',
        'slug' : 'researchers',
        'faIcon' : 'university'
    },
    {
        'class' : 'divider'
    },
    {
        'label' : 'Media',
        'slug' : 'media',
        'faIcon' : 'photo'
    },
    {
        'class' : 'divider'
    },
    {
        'label' : 'Ideas & Insights',
        'slug' : 'insights',
        'faIcon' : 'lightbulb-o'
    },
    {
        'label' : 'Comments',
        'slug' : 'comments',
        'faIcon' : 'comment'
    },
    {
        'class' : 'divider'
    },
    {
        'label' : 'Original Users',
        'slug' : '1users',
        'faIcon' : 'users'
    },
    {
        'label' : 'Updated Users',
        'slug' : 'users',
        'faIcon' : 'users'
    },
    {
        'label' : 'Sectors',
        'slug' : 'sector',
        'faIcon' : 'puzzle-piece'
    },
    {
        'class' : 'divider'
    },
    {
        'label' : 'Static Pages',
        'slug' : 'info',
        'faIcon' : 'info'
    },
    {
        'class' : 'divider'
    },
    {
        'label' : 'Advertisements',
        'slug' : 'ads',
        'faIcon' : 'bullhorn'
    },
];

var BuoyancyDemo = React.createClass({
  render: function() {
    return(
    /* jshint ignore:start */
  <div className='card-set'>
      <Well  bsSize='small' className='card card-parent' key='100'>
          <h6 className='card-label'>
              Function
          </h6>
          <h4 className='card-name'>
              Modify Buoyancy
              <br/>
          <small>

          </small>
        </h4>
      </Well>
      <Well className='card-list'>
        <Well bsSize='small' className='card card-child' key='101'>
          <h6 className='card-label'>
            Mechanism
          </h6>
          <h4 className='card-name'>
                Add/remove gas
          </h4>
        </Well>
        <Well className='card-list'>
          <Well bsSize='small' className='card card-child' key='102'>
            <h6 className='card-label'>
              Biological Strategy
            </h6>
            <h4 className='card-name'>
                  Gas-holding structure aids buoyancy
                  <br/>
                  <small>
                    Cuttlefish
                  </small>
            </h4>
          </Well>
          <Well bsSize='small' className='card card-child active' key='103'>
            <h6 className='card-label'>
              Biological Strategy
            </h6>
            <h4 className='card-name'>
                  Swim bladder helps maintain buoyancy
                  <br/>
                  <small>
                    Bone fishes
                  </small>
            </h4>
          </Well>
          <Well bsSize='small' className='card card-child' key='104'>
            <h6 className='card-label'>
              Biological Strategy
            </h6>
            <h4 className='card-name'>
                  Siphuncle controls buoyancy
                  <br/>
                  <small>
                    Nautilus
                  </small>
            </h4>
          </Well>
        </Well>
      </Well>
      <Well className='card-list'>
        <Well bsSize='small' className='card card-child' key='105'>
          <h6 className='card-label'>
            Mechanism
          </h6>
          <h4 className='card-name'>
                Add/remove wax
          </h4>
        </Well>
        <Well className='card-list'>
          <Well bsSize='small' className='card card-child' key='106'>
            <h6 className='card-label'>
              Biological Strategy
            </h6>
            <h4 className='card-name'>
                  Wax esters allow for changes in buoyancy
                  <br/>
                  <small>
                    Zooplankton
                  </small>
            </h4>
          </Well>
          <Well bsSize='small' className='card card-child' key='107'>
            <h6 className='card-label'>
              Linked Article
            </h6>
            <h4 className='card-name'>
                  Tiny Marine Crustaceans Construct Wax "Weight Belts" to stay deep.
                  <br/>
                  <small>
                    sciencemag.org
                  </small>
            </h4>
          </Well>
        </Well>
      </Well>
      <Well className='card-list'>
        <Well bsSize='small' className='card card-child' key='108'>
          <h6 className='card-label'>
            Mechanism
          </h6>
          <h4 className='card-name'>
                Change shape
          </h4>
        </Well>
        <Well className='card-list'>
          <Well bsSize='small' className='card card-child' key='109'>
            <h6 className='card-label'>
              Biological Strategy
            </h6>
            <h4 className='card-name'>
                  Shell alters buoyancy
                  <br/>
                  <small>
                    Green turtle
                  </small>
            </h4>
          </Well>
          <Well bsSize='small' className='card card-child' key='110'>
            <h6 className='card-label'>
              Collection
            </h6>
            <h4 className='card-name'>
                  Transportation
                  <br/>
                  <small>
                    Created by AskNature Team
                  </small>
            </h4>
          </Well>
          <Well bsSize='small' className='card card-child' key='111'>
            <h6 className='card-label'>
              Bio-inspired Strategy
            </h6>
            <h4 className='card-name'>
                  Wave power anchoring system
                  <br/>
                  <small>
                    BioPower Systems
                  </small>
            </h4>
          </Well>
          <Well bsSize='small' className='card card-child' key='112'>
            <h6 className='card-label'>
              R&D Team
            </h6>
            <h4 className='card-name'>
                  BioPower Systems R&D Lab
                  <br/>
                  <small>
                    New South Wales, Australia
                  </small>
            </h4>
          </Well>
        </Well>
      </Well>
  </div>
  /* jshint ignore:end */
);
  }
});

var BallastDemo = React.createClass({
  render: function() {
    return(
    /* jshint ignore:start */
  <div className='card-set'>
      <Well  bsSize='small' className='card card-parent active' key='100'>
          <h6 className='card-label'>
              Bio-inspired Strategy
          </h6>
          <h4 className='card-name'>
              Series of inflatable compartments provide buoyancy
              <br/>
          <small>
            Air Ballast Cargo Ship
          </small>
        </h4>
      </Well>
      <Well className='card-list'>
        <Well bsSize='small' className='card card-child' key='101'>
          <h6 className='card-label'>
            Biological Strategy
          </h6>
          <h4 className='card-name'>
                Swim bladder helps maintain buoyancy
                <br />
                <small>
                  Bony Fishes
                </small>
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='102'>
          <h6 className='card-label'>
            Biological Strategy
          </h6>
          <h4 className='card-name'>
                Swim bladders diffuse gas
                <br />
                <small>
                  Bony Fishes
                </small>
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='103'>
          <h6 className='card-label'>
            Designed System
          </h6>
          <h4 className='card-name'>
                Air Ballast Biomimetic Cargo Ship
                <br />
                <small>
                  Team Dedale
                </small>
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='104'>
          <h6 className='card-label'>
            Context
          </h6>
          <h4 className='card-name'>
                Aquatic
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='105'>
          <h6 className='card-label'>
            Context
          </h6>
          <h4 className='card-name'>
                Gravity
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='106'>
          <h6 className='card-label'>
            Context
          </h6>
          <h4 className='card-name'>
                Saltwater
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='107'>
          <h6 className='card-label'>
            Context
          </h6>
          <h4 className='card-name'>
                Inclement Weather
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='108'>
          <h6 className='card-label'>
            Mechanism
          </h6>
          <h4 className='card-name'>
                Expandable gas-filled compartments
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='101'>
          <h6 className='card-label'>
            Mechanism
          </h6>
          <h4 className='card-name'>
                Multiple Chambers
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='109'>
          <h6 className='card-label'>
            Function
          </h6>
          <h4 className='card-name'>
                Modify buoyancy
          </h4>
        </Well>
        <Well bsSize='small' className='card card-child' key='110'>
          <h6 className='card-label'>
            Context
          </h6>
          <h4 className='card-name'>
                Maintain stability
          </h4>
        </Well>
      </Well>
  </div>
  /* jshint ignore:end */
);
  }
});

var SidebarComponent = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <Nav className='drawer' key='10'>

                <TabbedArea defaultActiveKey={0} key='20' justified>
                    <TabPane key='20' eventKey={0} tab={<FontAwesome name='search'  fixedWidth />} onClick={this.props.onResultClick} >
                        {this.props.searchResultComponent ?  <this.props.searchResultComponent  elements={this.props.searchResultElements} itemHeight={this.props.searchResultHeight} /> : this.props.master === '284ace1157963de879fdab2a2a5709cc' ? <BuoyancyDemo /> : this.props.master === 'air-ballast-biomimetic-cargo-ship' ? <BallastDemo /> : <Well>
                            Query results & content clusters go in here
                        </Well>
                        }
                    </TabPane>
                    <TabPane key='30' eventKey={1} tab={<FontAwesome name='info'  fixedWidth />}>
                        <Well>
                            Informational Pages go in here
                        </Well>
                    </TabPane>
                    {this.props.loggedIn ? (
                    <TabPane key='40' eventKey={2} tab={<FontAwesome name='list'  fixedWidth />} onClick={this.props.onResultClick}>
                        <Nav stacked onClick={this.props.onResultClick}>
                            {
                                listItems.map(function(item,i){
                                    return (
                                        item.class ? (
                                            <li className={item.class}></li>
                                        ) : (
                                        <li eventKey={i}>
                                            <Link url={'/list/'+item.slug}>
                                                <FontAwesome
                                                    name={item.faIcon}
                                                    fixedWidth
                                                    className='pull-left' />
                                                    &nbsp; {item.label}
                                            </Link>
                                        </li>
                                    )
                                    );
                                })
                            }
                        </Nav>
                    </TabPane>
                ) : '' }
                </TabbedArea>
            </Nav>
            /* jshint ignore:end */
        );
    }

});

module.exports = SidebarComponent;
