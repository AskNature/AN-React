/**
*   Product Component Spec Test
*/

/*jshint expr: true*/

'use strict';

var React = require('react');
var ProductComponent = React.createFactory(require('../../../../client/scripts/components/admin/products.jsx'));

describe('Product  Component', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
        reactRender = ReactTestUtils.renderIntoDocument;
        this.productComponent = new ProductComponent();
    });

    it('provides the "Product Component" instance', function() {
        // Expect it to exist
        expect(this.productComponent).to.be.ok;
    });

    it('must know the answer to life, the universe, and everything', function() {
        var answer = 42;
        expect(answer).to.equal(42);
    });

});
