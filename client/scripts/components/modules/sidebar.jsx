'use strict';

var React = require('react/addons'),

Link = require('./link.jsx'),

FontAwesome = require('react-fontawesome'),
Nav = require('react-bootstrap').Nav,
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
        'slug' : '#',
        'faIcon' : ''
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
        'label' : 'Functions & Mechanisms',
        'slug' : 'phenomena',
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
        'label' : 'Stories',
        'slug' : '#',
        'faIcon' : ''
    },
    {
        'label' : 'Sources',
        'slug' : 'sources',
        'faIcon' : 'book'
    },
    {
        'label' : 'Citations',
        'slug' : '#',
        'faIcon' : ''
    },
    {
        'label' : 'Teams',
        'slug' : 'researchers',
        'faIcon' : 'university'
    },
    {
        'label' : 'Media',
        'slug' : 'media',
        'faIcon' : 'photo'
    },
    {
        'label' : 'Original Users',
        'slug' : '1users',
        'faIcon' : 'users'
    },
    {
        'label' : 'Users',
        'slug' : 'users',
        'faIcon' : 'users'
    }
];

var SidebarComponent = React.createClass({
    render: function() {
        var items = [];
        if (this.props.open) {
            items.push(
                <Nav className='drawer' key='10'>
                    <TabbedArea defaultActiveKey={1} key='20' justified>
                        <TabPane key='30' eventKey={0} tab={<FontAwesome name='search' size='lg' fixedWidth />}>
                            Search results go here.
                        </TabPane>
                        <TabPane key='40' eventKey={1} tab={<FontAwesome name='list' size='lg' fixedWidth />}>
                            <Nav stacked>
                                {
                                    listItems.map(function(item,i){
                                        return (
                                            <li eventKey={i}>
                                                <Link url={'/list/'+item.slug}>
                                                    <FontAwesome
                                                        name={item.faIcon}
                                                        size='lg'
                                                        fixedWidth
                                                        className='pull-left' />
                                                        &nbsp; {item.label}
                                                </Link>
                                            </li>
                                        );
                                    })
                                }
                            </Nav>
                        </TabPane>
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

module.exports =SidebarComponent;
