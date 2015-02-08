/**
*   Outcome Store Spec Test
*/

/*jshint expr: true*/

'use strict';

var outcomeStore = require('../../../client/scripts/stores/outcome');

describe('Outcome Store', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "Outcome Store"', function() {
        // Expect it to exist
        expect(outcomeStore).to.be.ok;
    });

});
