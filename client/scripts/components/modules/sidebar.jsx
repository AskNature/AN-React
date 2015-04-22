'use strict';

var React = require('react/addons'),

Link = require('./link.jsx'),

FontAwesome = require('react-fontawesome'),
Nav = require('react-bootstrap').Nav,
Well = require('react-bootstrap').Well,
TabbedArea = require('react-bootstrap').TabbedArea,
TabPane = require('react-bootstrap').TabPane;

var ReactCSSTransition = React.addons.CSSTransitionGroup;

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
        'label' : 'Designed Strategies',
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
        'label' : 'Context',
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
        'slug' : '#',
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
        'label' : 'Teams',
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


var SidebarComponent = React.createClass({
    render: function() {
        var items = [];
         if (this.props.open === true) {
            items.push(
                <Nav className='drawer' key='10'>

                    <TabbedArea defaultActiveKey={0} key='20' justified>
                        <TabPane key='20' eventKey={0} tab={<FontAwesome name='search'  fixedWidth onClick={this.props.onResultClick}/>}>
                            {this.props.searchResultComponent ?  <this.props.searchResultComponent  elements={this.props.searchResultElements} itemHeight={this.props.searchResultHeight} /> : <Well>
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
                        <TabPane key='40' eventKey={2} tab={<FontAwesome name='list'  fixedWidth />}>
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
            );
        }

        return (
            /* jshint ignore:start */
            <ReactCSSTransition transitionName="drawer">
                {items}
            </ReactCSSTransition>

            /* jshint ignore:end */
        );
    }

});

module.exports = SidebarComponent;
