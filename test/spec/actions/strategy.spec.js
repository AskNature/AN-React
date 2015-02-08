/**
*   Strategy Actions Spec Test
*/

/*jshint expr: true*/

'use strict';

var strategyActions = require('../../../client/scripts/actions/strategy');

describe('Strategy Actions', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "Strategy Actions"', function() {
        // Expect it to exist
        expect(strategyActions).to.be.ok;
    });

});
