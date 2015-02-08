/**
*   Product Actions Spec Test
*/

/*jshint expr: true*/

'use strict';

var productActions = require('../../../client/scripts/actions/Product');

describe('Product Actions', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "Product Actions"', function() {
        // Expect it to exist
        expect(productActions).to.be.ok;
    });

});
