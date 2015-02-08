/**
*   Strategy Store Spec Test
*/

/*jshint expr: true*/

'use strict';

var strategyStore = require('../../../client/scripts/stores/strategy');

describe('Strategy Store', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "Strategy Store"', function() {
        // Expect it to exist
        expect(strategyStore).to.be.ok;
    });

});
