/**
*   Sidebar Component Spec Test
*/

/*jshint expr: true*/

'use strict';

var React = require('react');
var SidebarComponent = React.createFactory(require('../../../../client/scripts/components/modules/sidebar.jsx'));

describe('Sidebar Component', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
        reactRender = ReactTestUtils.renderIntoDocument;
        this.sidebarComponent = new SidebarComponent();
    });

    it('provides the "Sidebar Component" instance', function() {
        // Expect it to exist
        expect(this.sidebarComponent).to.be.ok;
    });

});
