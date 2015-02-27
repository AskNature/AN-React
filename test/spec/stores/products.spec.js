/**
*   Product Store Spec Test
*/

/*jshint expr: true*/

'use strict';

var productStore = require('../../../client/scripts/stores/admin/products');

describe('Product Store', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "Product Store"', function() {
        // Expect it to exist
        expect(productStore).to.be.ok;
    });

});
