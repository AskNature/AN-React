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
        'slug' : 'd.system',
        'faIcon' : ''
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
        'class' : 'divider'
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
        'label' : 'Original Users',
        'slug' : '1users',
        'faIcon' : 'users'
    },
    {
        'label' : 'Users',
        'slug' : 'users',
        'faIcon' : 'users'
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
        'faIcon' : ''
    },
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
                                            item.class ? (
                                                <li className={item.class}></li>
                                            ) : (
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
                                        )
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
