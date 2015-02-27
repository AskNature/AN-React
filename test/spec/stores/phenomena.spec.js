/**
*   Phenomena Store Spec Test
*/

/*jshint expr: true*/

'use strict';

var phenomenaStore = require('../../../client/scripts/stores/admin/phenomena');

describe('Phenomena Store', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "Phenomena Store"', function() {
        // Expect it to exist
        expect(phenomenaStore).to.be.ok;
    });

});
