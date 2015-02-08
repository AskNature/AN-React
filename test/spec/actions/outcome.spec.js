/**
*   Outcome Actions Spec Test
*/

/*jshint expr: true*/

'use strict';

var outcomeActions = require('../../../client/scripts/actions/outcome');

describe('Outcome Actions', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "Outcome Actions"', function() {
        // Expect it to exist
        expect(outcomeActions).to.be.ok;
    });

});
