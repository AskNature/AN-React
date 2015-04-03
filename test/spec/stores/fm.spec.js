/**
*   FM Store Spec Test
*/

/*jshint expr: true*/

'use strict';

var fmStore = require('../../../client/scripts/stores/admin/fm');

describe('FM Store', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
    });

    it('provides the "FM Store"', function() {
        // Expect it to exist
        expect(fmStore).to.be.ok;
    });

});
