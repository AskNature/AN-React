/**
*   Outcometable Component Spec Test
*/

/*jshint expr: true*/

'use strict';

var React = require('react');
var OutcometableComponent = React.createFactory(require('../../../../client/scripts/components/modules/outcometable.jsx'));

describe('Outcometable Component', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
        reactRender = ReactTestUtils.renderIntoDocument;
        this.outcometableComponent = new OutcometableComponent();
    });

    it('provides the "Outcometable Component" instance', function() {
        // Expect it to exist
        expect(this.outcometableComponent).to.be.ok;
    });

});
