/**
*   Phenomena Actions Spec Test
*/

/*jshint expr: true*/

'use strict';

var phenomenaActions = require('../../../client/scripts/actions/phenomena');

describe('Phenomena Actions', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "Phenomena Actions"', function() {
        // Expect it to exist
        expect(phenomenaActions).to.be.ok;
    });

});
